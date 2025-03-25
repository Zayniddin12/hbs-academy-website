<template>
  <div class="grid grid-cols-9">
    <div
      class="relative flex col-span-5 items-center flex-col justify-between py-12"
    >
      <div>
        <img src="/images/svg/logo.svg" alt="logo" />
      </div>
      <slot />

      <div class="text-center flex flex-col gap-3">
        <RouterLink
          to="/pages/privacy-policy"
          target="_blank"
          class="text-xs font-normal text-blue-100 leading-normal"
        >
          {{ $t("privacy_policy") }}
        </RouterLink>
        <p class="text-xs leading-normal text-blue-100">
          {{ $t("version") }} {{ CONFIG.APP_VERSION }}
        </p>
      </div>
    </div>
    <div
      class="col-span-4 w-full min-h-screen bg-green bg-image relative flex flex-col items-center justify-between"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { CONFIG } from "@/config";
</script>

<style scoped>
.bg-image {
  background-image: url("/images/svg/bg_png.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
