<template>
  <div>
    <button class="flex-y-center gap-2 group" @click="$emit('back')">
      <i
        class="icon-chevron text-2xl block text-dark transition group-hover:-translate-x-1"
      />
      <span class="text-2xl leading-130 font-semibold text-dark">
        {{ $t("enter_code") }}
      </span>
    </button>
    <p class="text-sm leading-130 font-normal text-blue-100 mt-4">
      {{ $t("we_sent_code") }}
    </p>
    <button
      class="flex-y-center px-2 py-1.5 gap-2.5 rounded bg-white-100 group mt-2"
    >
      <span class="text-sm leading-130 font-normal text-gray-100">
        {{ formatPhoneNumber(phone) }}
      </span>
      <i
        class="icon-pen-edit text-gray text-base transition-300 group-hover:text-dark"
      />
    </button>

    <div class="my-8">
      <SFormGroup :label="$t('confirm_code')">
        <COtp
          v-model="form.values.code"
          :error="form.$v.value.code?.$error || otpError"
        />
      </SFormGroup>
      <div class="flex-center mt-5">
        <CResend v-bind="{ time }" @resend="resendCode" />
      </div>
    </div>
    <SButton
      class="w-full"
      :text="$t('confirm')"
      @click="submit"
      v-bind="{ disabled }"
    />
  </div>
</template>

<script setup lang="ts">
import { formatPhoneNumber } from "@/utils";
import SFormGroup from "@/components/Form/FGroup.vue";
import COtp from "@/components/Form/FOtp.vue";
import { ref, watch } from "vue";
import { useForm } from "@/composables/useForm";
import { minLength, required } from "@vuelidate/validators";
import SButton from "@/components/Common/CButton.vue";
import { useCustomToast } from "@/composables/useCustomToast";
import { useI18n } from "vue-i18n";
import CResend from "@/modules/Auth/components/CResend.vue";

interface Props {
  phone?: string;
  time?: number;
  error?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits(["submit", "back", "resend", "on-otp-change"]);

const { showToast } = useCustomToast();

const { t } = useI18n();

const disabled = ref(true);
const otpError = ref(false);

const form = useForm(
  {
    code: "",
  },
  {
    code: { required, minLength: minLength(6) },
  }
);
watch(
  () => form.values.code,
  () => {
    otpError.value = false;
    emit("on-otp-change");
    form.$v.value.$reset();
    if (form.values.code?.length === 6) submit();
  }
);
watch(
  () => props.error,
  () => (otpError.value = props.error),
  {
    immediate: true,
  }
);
function submit() {
  form.$v.value.$touch();

  if (!form.$v.value.$invalid) {
    emit("submit", form.values.code);
  } else {
    otpError.value = true;
    showToast(t("fill_code"), "error");
  }
}

function resendCode() {
  form.values.code = "";
  form.$v.value.$reset();
  emit("resend");
}

watch(
  () => form.values.code,
  (val: string) => {
    disabled.value = val?.length !== 6;
  }
);
</script>
