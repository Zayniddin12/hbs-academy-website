<template>
  <CDialog
    v-bind="{ show }"
    @close="$emit('close')"
    :title="$t('enter_code')"
    body-class="max-w-[375px]"
  >
    <Transition name="fade" mode="out-in">
      <div :key="step">
        <CPasswordConfirm
          v-if="step === 1"
          :form="formOtp"
          v-bind="{ value }"
          @resend="$emit('resend')"
          @next="step = 2"
        />
        <CPassword
          v-if="step === 2"
          :form="formPassword"
          @submit="submit"
          v-bind="{ loading }"
        />
      </div>
    </Transition>
  </CDialog>
</template>

<script setup lang="ts">
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CPasswordConfirm from "@/modules/Profile/components/steps/CPasswordConfirm.vue";
import { TForm } from "@/composables/useForm";
import { ref, unref } from "vue";
import CPassword from "@/modules/Profile/components/steps/CPassword.vue";
import ApiService from "@/services/ApiService";

interface Props {
  value: {
    sid: string;
    phone: string;
    secret: string;
    time: number;
  };
  show: boolean;
  formOtp: TForm<any>;
  formPassword: TForm<any>;
}

const props = defineProps<Props>();
const { formOtp, formPassword } = unref(props);
const emit = defineEmits(["close"]);
const step = ref(1);
const loading = ref(false);

function submit() {
  loading.value = true;
  const data = {
    phone_number: props.value.phone,
    new_password: formPassword?.values?.new_password,
    verification: {
      sid: props.value.sid,
      client_secret: props.value.secret,
    },
  };
  ApiService.post("/account/ResetPasswordWithOTP/", data)
    .then(() => {
      emit("close");
    })
    .finally(() => (loading.value = false));
}
</script>
