<template>
  <div class="p-4 pt-9 green-linear rounded-2xl relative overflow-hidden">
    <img src="/images/outline-logo.svg" alt="outline" class="absolute-center" />
    <div class="relative z-[1]">
      <div
        class="p-3 bg-white/[12%] backdrop-blur-[7px] border border-white/[12%] rounded-xl relative"
      >
        <div class="flex items-center gap-1">
          <p
            class="text-[32px] font-bold leading-130 text-white -translate-y-1"
          >
            {{ rating?.total_ball }}
          </p>
          <p class="text-sm leading-130 text-white/50">
            {{ $t("your_rating") }}
          </p>
        </div>
        <p class="text-white/50 text-sm leading-130">
          {{ $t("your_place") }}:
          <span class="text-base text-white font-semibold">{{
            rating?.position_in_flow
          }}</span>
        </p>
        <img
          src="/images/star.png"
          alt="star"
          class="max-w-[100px] absolute-y right-6"
        />
      </div>

      <RouterLink
        :to="{ name: 'CourseSingleRating' }"
        class="w-full mt-8 block"
      >
        <CButton class="w-full" :text="$t('see_rating')" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from "@/components/Common/CButton.vue";

interface Props {
  rating: {
    position_in_flow: number;
    total_ball: number;
  };
}

defineProps<Props>();
</script>

<style scoped>
.green-linear {
  background: linear-gradient(151deg, #16cc53 -28.58%, #042d1c 54.02%);
  box-shadow: 0 2px 32px 0 rgba(8, 10, 21, 0.15);
}
</style>
