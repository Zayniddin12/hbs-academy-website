<template>
  <div>
    <CTitle :title="$t('change_password')" />

    <div class="w-full bg-white rounded-2xl p-5 mt-4">
      <div class="grid grid-cols-2 gap-4">
        <FGroup :label="$t('old_password')">
          <FInputPassword
            v-model="form.values.password"
            :placeholder="$t('enter_old_password')"
            :error="form.$v.value.password.$error"
            :is-password="isPasswordOld"
            @toggle="isPasswordOld = !isPasswordOld"
          />
          <div>
            <button
              class="text-sm leading-130 font-medium text-left text-primary hover:text-dark transition-300"
              @click="openModal"
            >
              {{ $t("forgot_password") }}
            </button>
          </div>
        </FGroup>
      </div>
      <div class="my-4 w-full bg-white-100 h-px" />
      <div class="grid grid-cols-2 gap-4">
        <FGroup :label="$t('new_password')">
          <FInputPassword
            v-model="form.values.new_password"
            :placeholder="$t('enter_new_password')"
            :error="form.$v.value.new_password.$error"
            :is-password="isNewPassword"
            @toggle="isNewPassword = !isNewPassword"
          />
          <div class="flex-y-center gap-2">
            <div
              class="w-full h-1 rounded-full bg-secondary"
              :class="{
                '!bg-primary':
                  (index === 0 &&
                    isStrongPassword === 'bad' &&
                    form.values.new_password?.length) ||
                  (index === 0 &&
                    isStrongPassword === 'average' &&
                    form.values.new_password?.length) ||
                  (index === 1 &&
                    isStrongPassword === 'average' &&
                    form.values.new_password?.length) ||
                  (isStrongPassword === 'strong' &&
                    form.values.new_password?.length),
              }"
              v-for="(i, index) in 3"
              :key="i"
            />
          </div>
          <div class="text-xs text-gray">
            <p
              :class="{ 'text-green': form.values?.new_password?.length >= 8 }"
            >
              {{ t("minimum_8_character") }}
            </p>
            <p
              :class="{
                'text-green':
                  form.values?.new_password?.match(/[A-Z]/g)?.length,
              }"
            >
              {{ t("minimum_1_uppercase_letter") }}
            </p>
            <p
              :class="{
                'text-green': form.values?.new_password?.match(/[a-z]/g),
              }"
            >
              {{ t("minimum_1_lowercase_letter") }}
            </p>
            <p
              :class="{
                'text-green': form.values?.new_password?.match(/[0-9]/g),
              }"
            >
              {{ t("minimum_1_digit") }}
            </p>
            <p
              :class="{
                'text-green': form.values?.new_password?.match(/[!@#$%^&*]/g),
              }"
            >
              {{ t("minimum_1_special_character") }}
            </p>
          </div>
        </FGroup>
        <FGroup :label="$t('confirm_password')">
          <FInputPassword
            v-model="form.values.confirm_password"
            :placeholder="$t('enter_new_password')"
            :error="form.$v.value.confirm_password.$error"
            :is-password="isNewPassword"
            @toggle="isNewPassword = !isNewPassword"
          />
        </FGroup>
      </div>
      <div class="mt-6 flex justify-end">
        <div class="flex-y-center gap-3">
          <CButton
            variant="secondary"
            :text="$t('cancel')"
            @click="$emit('back')"
          />
          <CButton
            :text="$t('confirm')"
            @click="submit"
            v-bind="{ loading }"
            :disabled="
              !isActiveSubmit ||
              form.values?.new_password?.length < 8 ||
              !form.values?.new_password?.match(/[A-Z]/g) ||
              !form.values?.new_password?.match(/[a-z]/g) ||
              !form.values?.new_password?.match(/[0-9]/g) ||
              !form.values?.new_password?.match(/[!@#$%^&*]/g) ||
              Boolean(form.values.new_password !== form.values.confirm_password)
            "
          />
          />
        </div>
      </div>
    </div>
  </div>
  <CForgotPasswordModal
    :show="showModal"
    :value="dataValue"
    @resend="openModal"
    @close="showModal = false"
    :form-otp="formOtp"
    :form-password="formPassword"
  />
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import FInputPassword from "@/components/Form/Input/FInputPassword.vue";
import { computed, ref, watch } from "vue";
import { useForm } from "@/composables/useForm";
import FGroup from "@/components/Form/FGroup.vue";
import CButton from "@/components/Common/CButton.vue";
import { required } from "@vuelidate/validators";
import ApiService from "@/services/ApiService";
import { useI18n } from "vue-i18n";
import { useCustomToast } from "@/composables/useCustomToast";
import CForgotPasswordModal from "@/modules/Profile/components/CForgotPasswordModal.vue";
import { useAuthStore } from "@/stores/auth";
import { generateUniqueKey } from "@/utils";
import { useHandleError } from "@/composables/useErrorHandling";

const { t } = useI18n();
const { showToast } = useCustomToast();
const { handleError } = useHandleError();
const emit = defineEmits(["back"]);

const isPasswordOld = ref(true);
const isNewPassword = ref(true);
const loading = ref(false);
const user = computed(() => useAuthStore()?.user);
const showModal = ref(false);
const dataValue = ref({
  secret: generateUniqueKey(),
  sid: "",
  phone: user?.value.phone_number,
  time: 0,
});

const form = useForm(
  {
    password: "",
    new_password: "",
    confirm_password: "",
  },
  {
    password: {
      required,
    },
    new_password: {
      required,
    },
    confirm_password: {
      required,
      sameAs: (val: string) => val === form.values.new_password,
    },
  }
);

const formOtp = useForm(
  {
    code: "",
    time: "",
  },
  {
    code: {
      required,
    },
  }
);

const formPassword = useForm(
  {
    new_password: "",
    confirm_password: "",
  },
  {
    new_password: {
      required,
    },
    confirm_password: {
      required,
      sameAs: (val: string) => val === formPassword.values.new_password,
    },
  }
);

const isStrongPassword = computed(() =>
  checkPasswordStrength(form.values.new_password)
);

function checkPasswordStrength(password: any) {
  // Define criteria for password strength
  const minLength = 8; // Minimum length
  const minUpperCase = 1; // Minimum uppercase letters
  const minLowerCase = 1; // Minimum lowercase letters
  const minDigits = 1; // Minimum digits
  const minSpecialChars = 1; // Minimum special characters (e.g., !@#$%^&*)

  // Check the length
  if (password.length < minLength) {
    return "bad";
  }

  // Check for uppercase letters
  if (
    password.match(/[A-Z]/g) &&
    password.match(/[A-Z]/g).length >= minUpperCase
  ) {
    // Check for lowercase letters
    if (
      password.match(/[a-z]/g) &&
      password.match(/[a-z]/g).length >= minLowerCase
    ) {
      // Check for digits
      if (
        password.match(/[0-9]/g) &&
        password.match(/[0-9]/g).length >= minDigits
      ) {
        // Check for special characters
        if (
          password.match(/[!@#$%^&*]/g) &&
          password.match(/[!@#$%^&*]/g).length >= minSpecialChars
        ) {
          return "strong";
        }
        return "average";
      }
    }
  }

  return "bad";
}

function submit() {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    loading.value = true;
    ApiService.post("/account/StudentResetPassword/", {
      old_password: form.values.password,
      new_password: form.values.new_password,
    })
      .then(() => {
        showToast(t("change_password_success"), "success");
        emit("back");
      })
      .catch(({ response }) => {
        handleError(response);
      })
      .finally(() => (loading.value = false));
  }
}

function openModal() {
  const data = {
    type: "phone",
    address: user?.value.phone_number,
    purpose: "reset_password",
    client_secret: dataValue?.value?.secret,
  };
  ApiService.post("/verification/request-otp/", data).then((res: any) => {
    dataValue.value.sid = res?.data?.sid;
    dataValue.value.time = res?.data?.wait;
    showModal.value = true;
  });
}

const isActiveSubmit = ref(false);
watch(
  () => form.values,
  (val) => {
    isActiveSubmit.value = !!(
      val?.new_password &&
      val?.password &&
      val?.confirm_password
    );
  },
  { deep: true }
);
</script>
