import { useCustomToast } from "@/composables/useCustomToast";

export const useHandleError = () => {
  const { showToast } = useCustomToast();

  function handleError(error: any) {
    if (error?.response?.status === 401) {
      showToast("Refresh token expired, please login again", "error");
    }
    if (error?.response?.status === 500) {
      showToast("Server error", "error");
    }
    if (error?.data?.length) {
      showToast(error?.data[0]?.error?.message, "error");
    }
  }

  return { handleError };
};
