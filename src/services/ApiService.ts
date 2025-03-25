import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { App } from "vue";
import VueAxios from "vue-axios";

import JwtService from "@/services/JwtService";
// import router from '@/router'
import router from "@/router";
import { useHandleError } from "@/composables/useErrorHandling";

const { handleError } = useHandleError();

class ApiService {
  public static vueInstance: App;
  public static setDeviceIdHeader(deviceIdHeader: string): void {
    ApiService.vueInstance.axios.defaults.headers.common["Device-Id"] =
      deviceIdHeader;
  }

  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    // eslint-disable-next-line
    // @ts-ignore
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_BASE_URL;
    // console.log('env', ApiService.vueInstance.axios.defaults.baseURL)
    this.handleResponseError(ApiService.vueInstance.axios);
  }

  public static refreshToken(axios: AxiosInstance) {
    return new Promise((resolve, reject) => {
      const refresh = JwtService.getRefresh();
      if (!refresh) {
        JwtService.destroyAccess();
        return router.push({ name: "PAuth" });
      }

      const headersWithoutAuth = { ...axios.defaults.headers };
      headersWithoutAuth.post["Content-Type"] = "application/json";
      delete headersWithoutAuth.common.Authorization;
      axios
        .post(
          import.meta.env.VITE_APP_BASE_URL + "/account/TokenRefresh/",
          {
            refresh: refresh,
          },
          {
            headers: { ...headersWithoutAuth.post },
          }
        )
        .then((res) => {
          console.log("res", res);
          if (res?.data?.access) {
            JwtService.saveToken(res?.data.access);
            resolve(res?.data.access);
            ApiService.setHeader();
          } else {
            handleError({
              response: {
                status: 401,
                data: [],
              },
            });
          }
        })
        .catch(async (error) => {
          console.log("error refresh", error);
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");
          JwtService.destroyAccess();
          JwtService.destroyRefresh();
          this.unsetHeader();
          await router.push({ name: "PAuth" });
          reject(error);
        });
    });
  }

  public static handleResponseError(axios: AxiosInstance) {
    let originalRequest: AxiosRequestConfig | null = null;

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const errorResponse = error?.response;
        originalRequest = error?.config;
        // if (errorResponse?.status === 403 || errorResponse?.status === 401) {
        //   if (originalRequest) {
        //     const newToken = await this.refreshToken(ApiService.vueInstance.axios)
        //     if (newToken && originalRequest?.headers) {
        //       originalRequest.headers.Authorization = `Bearer ${newToken}`
        //       return ApiService.vueInstance.axios(originalRequest)
        //     }
        //   }
        // }

        if (errorResponse?.status === 401) {
          const isRefresh = originalRequest?.url?.includes(
            "account/TokenRefresh/"
          );
          if (isRefresh) {
            JwtService.destroyAccess();
            JwtService.destroyRefresh();
            await router.push({ name: "PAuth" });
            return;
          }
          if (originalRequest) {
            const newToken = await this.refreshToken(
              ApiService.vueInstance.axios
            );
            if (newToken && originalRequest?.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return ApiService.vueInstance.axios(originalRequest);
            } else {
              return Promise.reject(error);
            }
          }
        }

        // if (errorResponse?.status === 404) {
        //   await router.replace({ name: "404" });
        // }

        return Promise.reject(errorResponse);
      }
    );
  }

  public static setHeader(): void {
    if (JwtService.getToken()) {
      ApiService.vueInstance.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${JwtService.getToken()}`;
    }
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
    ApiService.vueInstance.axios.defaults.headers.common["Accept-Language"] =
      localStorage.getItem("locale") || "en";
  }

  public static unsetHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = ``;
  }

  public static query<T>(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  public static get<R = any>(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  public static post<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.post(`${resource}`, data, params);
  }

  public static update<T = any, R = any>(
    resource: string,
    slug: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(
      `${resource}/${slug}`,
      data,
      params
    );
  }

  public static put<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(`${resource}`, data, params);
  }

  public static patch<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.patch(`${resource}`, data, params);
  }

  public static delete<T = any>(
    resource: string,
    params?: T
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${resource}`, { params });
  }
}

export default ApiService;
