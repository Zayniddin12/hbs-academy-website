import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { pinia } from "@/main";
// import ApiService from '@/services/ApiService'
// import { useDictionaryStore } from '@/stores/dictionary'

export async function authorizeMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore(pinia);

  if (authStore.user == null) {
    await authStore.getTokens();

    try {
      await authStore.getUser();
    } catch {
      return next();
    }
  }

  return next();
}

export async function authorizedOnlyMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore(pinia);

  if (authStore.user == null) {
    await authStore.getTokens();

    try {
      await authStore.getUser();
      // return next({ name: 'Home' })
    } catch {
      clearLocalStorage();
      return next({ name: "PAuth" });
    }
  }

  return next();
}

export async function guestOnlyMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore(pinia);

  await authStore.getTokens();

  if (authStore.user == null && authStore.accessToken) {
    await authStore.getUser();
    try {
      return next({ name: "Courses" });
    } catch {
      return next({ name: "Login" });
    }
  } else if (!authStore.accessToken) {
    return next();
  }

  return next();
}

export const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
