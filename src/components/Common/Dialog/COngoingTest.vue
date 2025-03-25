<template>
  <CDialog
    v-bind="{ show }"
    @close="$emit('close')"
    body-class="!max-w-[344px]"
  >
    <template #header><div></div></template>
    <div>
      <img src="/images/svg/test.svg" alt="test" class="mx-auto" />
      <p class="text-base text-dark leading-normal font-semibold text-center">
        {{ $t("maybe_continue_test") }}
      </p>
      <p class="mt-2 text-center text-xs text-dark">
        {{ $t("maybe_continue_test_text") }}
      </p>
      <div class="flex-y-center gap-4 mt-7">
        <CButton
          class="w-full"
          variant="secondary"
          :text="$t('cancel')"
          @click="$emit('close')"
        />
        <CButton
          class="w-full"
          :text="$t('continue')"
          @click="$emit('submit')"
        />
      </div>
    </div>
  </CDialog>
</template>

<script setup lang="ts">
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CButton from "@/components/Common/CButton.vue";

interface Props {
  show?: boolean;
}

defineProps<Props>();
</script>
