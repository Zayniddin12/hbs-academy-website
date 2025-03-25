<template>
  <div
    class="relative bg-white-100 w-full min-h-[calc(100vh-76px)] flex-center overflow-hidden"
  >
    <img
      src="/images/svg/error-outline.svg"
      class="absolute-x top-[-20%] w-full max-w-[821px] h-full"
      alt="logo-outline"
    />
    <div class="text-center absolute-x z-50">
      <img src="/images/svg/404.svg" alt="404" class="mb-[60px]" />
      <p class="text-[32px] font-bold leading-normal text-dark uppercase">
        {{ $t("not_found") }}
      </p>
      <p class="text-xl leading-normal text-dark/60 mt-2">
        {{ $t("not_found_text") }}
      </p>

      <RouterLink to="/" class="absolute-x z-50">
        <CButton
          class="mt-8 min-w-[210px]"
          icon="icon-home"
          icon-position="left"
          :text="$t('go_to_home')"
        />
      </RouterLink>
    </div>
    <div
      class="w-screen h-[426px] rounded-full bg-primary blur-[235px] absolute bottom-[-30%]"
    />
  </div>
</template>

<script setup lang="ts">
import CButton from "@/components/Common/CButton.vue";
</script>
