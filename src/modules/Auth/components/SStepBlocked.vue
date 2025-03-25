<template>
  <div class="flex-center flex-col">
    <img src="/images/svg/block.svg" alt="" />
    <h3 class="text-[28px] text-dark font-medium mt-8 text-center">
      {{ $t("too_many_requests") }}
    </h3>
    <p class="text-gray text-sm mt-4 text-center">
      {{ $t("too_many_requests_subtitle", { minute: blockedTime }) }}
    </p>
    <a
      href="tel:+998998886765"
      class="block text-dark-100 text-base font-medium leading-130 bg-[#F7F9FA] py-1.5 px-3 rounded-[40px] mt-10 flex-y-center"
    >
      <i class="icon-phone text-xl text-dark-100 mr-2"></i> +998 99 888 67 65</a
    >
    <p class="text-gray-700 text-xs mt-2">{{ $t("support_phone") }}</p>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { convertSecondsToHMS } from "@/utils";

const store = useAuthStore();

const blockedTime = computed(
  () => convertSecondsToHMS(store.blockedTime).minutes
);
</script>
