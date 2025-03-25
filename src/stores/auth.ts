import { defineStore } from "pinia";
// import { api, apiToken } from '@/api'
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import { ref } from "vue";
// import JwtService from "@/services/JwtService";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const user = ref<any>(null);
  const blockedTime = ref<number>(0);
  const requestOTP = async (deviceId: string, phone: string) => {
    return new Promise((resolve, reject) => {
      ApiService.post("/verification/request-otp/", {
        type: "phone",
        address: phone,
        purpose: "login",
        client_secret: deviceId,
      })
        .then(async ({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  function setTokens({ access, refresh }: { access: string; refresh: string }) {
    JwtService.saveToken(access);
    JwtService.saveRefresh(refresh);
    ApiService.setHeader();
  }

  function getUser() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
    }
    return ApiService.get("/account/StudentDetail").then((res) => {
      user.value = res.data;
    });
  }

  const getTokens = async () => {
    accessToken.value = await localStorage.getItem("access_token");
    refreshToken.value = await localStorage.getItem("refresh_token");
  };

  return {
    user,
    accessToken,
    refreshToken,
    blockedTime,
    requestOTP,
    setTokens,
    getUser,
    getTokens,
  };
});
