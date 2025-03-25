<template>
  <CDialog v-bind="{ show }" body-class="max-w-[344px]" @close="$emit('close')">
    <template #header><div></div></template>
    <div class="text-center">
      <CRoundedIcon color="red" icon="icon-log-out" />
      <p class="text-base leading-130 font-semibold mt-5 mb-2">
        {{ $t("wanna_leave") }}
      </p>
      <p class="text-xs leading-normal text-dark">
        {{ $t("wanna_leave_text") }}
      </p>

      <div class="flex-y-center gap-4 mt-4">
        <CButton
          class="w-full"
          variant="secondary"
          :text="$t('cancel')"
          @click="$emit('close')"
        />
        <CButton
          class="w-full"
          variant="danger-secondary"
          :text="$t('continue')"
          @click="submit"
        />
      </div>
    </div>
  </CDialog>
</template>

<script setup lang="ts">
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CRoundedIcon from "@/components/Common/CRoundedIcon.vue";
import CButton from "@/components/Common/CButton.vue";
import { clearLocalStorage } from "@/middleware/middlewares";
import { useRouter } from "vue-router";

interface Props {
  show?: boolean;
}

defineProps<Props>();
const router = useRouter();

function submit() {
  clearLocalStorage();
  router.go(0);
}
</script>
