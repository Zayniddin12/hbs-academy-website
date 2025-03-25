<template>
  <CDialog
    v-bind="{ show }"
    body-class="!max-w-[344px] min-w-[344px]"
    @close="$emit('close')"
  >
    <template #header><div></div></template>
    <div class="text-center">
      <CRoundedIcon color="green" icon="icon-flager" />
      <p class="text-base leading-130 font-semibold mt-5 mb-2">
        {{ $t("finish_the_test") }}
      </p>
      <p class="text-xs leading-normal text-dark">
        {{ $t("are_you_sure_to_finish") }}
      </p>

      <div class="flex-y-center gap-4 mt-4">
        <CButton
          class="w-full"
          variant="secondary"
          :text="$t('cancel')"
          @click="$emit('close')"
        />
        <CButton
          :loading="finishing"
          :transition="false"
          variant="primary-secondary"
          class="w-full"
          :text="$t('finish')"
          @click="$emit('finish')"
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
  finishing?: boolean;
}

defineProps<Props>();
const router = useRouter();

function submit() {
  clearLocalStorage();
  router.go(0);
}
</script>
