<template>
  <div>
    <div class="p-6 bg-white rounded-xl">
      <p class="text-base leading-normal font-medium text-gray mb-4">
        {{ $t("question") }} {{ current }}/{{ count }}
      </p>
      <Transition name="fade" mode="out-in">
        <div :key="current">
          <slot />
        </div>
      </Transition>

      <div class="flex-center-between gap-10 mt-8">
        <CButton
          class="min-w-[240px] h-11 flex-center"
          variant="secondary"
          :text="$t('back')"
          icon="icon-arrow text-xl"
          icon-position="left"
          @click="$emit('back')"
          :disabled="current === 1 && !isSubmitted"
        />
        <CButton
          class="min-w-[240px] h-11 flex-center"
          :text="current !== count ? $t('next') : $t('finish')"
          icon="icon-arrow text-xl rotate-180"
          @click="$emit('next')"
          v-bind="{ loading }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from "@/components/Common/CButton.vue";
interface Props {
  count?: number;
  current?: number;
  loading?: boolean;
  isSubmitted?: boolean;
}

defineProps<Props>();
</script>
