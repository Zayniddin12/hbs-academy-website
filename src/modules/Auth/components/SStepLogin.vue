<template>
  <div class="w-[335px]">
    <p class="text-3xl leading-130 font-semibold text-dark text-center">
      {{ $t("enter_system") }}
    </p>

    <div class="mt-8">
      <div class="flex flex-col gap-5">
        <FGroup :label="$t('phone_number')">
          <FInputPhone
            :placeholder="$t('enter_phone_number')"
            v-model.trim="form.values.phone"
            :error="form.$v.value.phone.$error"
            :loading="loading"
            @blur="form.$v.value.phone.$touch"
            @trigger="onTrig"
            @reset-validation="form.$v.value.$reset"
            @enter="submit"
          />
        </FGroup>
        <CollapseTransition>
          <div v-if="step === 2" class="flex flex-col gap-5">
            <FGroup :label="$t('password')">
              <FInput
                :type="typePassword ? 'password' : 'text'"
                :placeholder="$t('enter_password')"
                v-model="formPassword.values.password"
                :error="formPassword.$v.value.password.$error || responseError"
                class="flex-center"
              >
                <template #suffix>
                  <button @click="typePassword = !typePassword">
                    <Transition name="fade" mode="out-in">
                      <i
                        v-if="typePassword"
                        class="icon-eye-closed block text-[#5A6168] text-xl hover:text-primary transition-300"
                      />
                      <i
                        v-else
                        class="icon-eye block text-[#5A6168] text-xl hover:text-primary transition-300"
                      />
                    </Transition>
                  </button>
                </template>
              </FInput>
            </FGroup>
            <FCheckbox
              v-model="formPassword.values.checkbox"
              :checked="formPassword.values.checkbox"
              @change="formPassword.values.checkbox = $event"
              :label="$t('remember_me')"
            />
          </div>
        </CollapseTransition>
      </div>
      <div>
        <vue-recaptcha
          :key="step"
          class="my-8 mx-auto"
          ref="recaptcha"
          :sitekey="siteKey"
          @verify="verifyMethod"
          @expired="expiredMethod"
        />
        <SButton
          class="w-full"
          :text="step === 1 ? $t('continue') : $t('enter')"
          @click="submit"
          v-bind="{ loading }"
          :disabled="!captchaToken"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SButton from "@/components/Common/CButton.vue";
import { ref, unref, watch } from "vue";
import { VueRecaptcha } from "vue-recaptcha";
import { useI18n } from "vue-i18n";
import { useCustomToast } from "@/composables/useCustomToast";
import { TForm, useForm } from "@/composables/useForm";
import FInputPhone from "@/components/Form/Input/FInputPhone.vue";
import FGroup from "@/components/Form/FGroup.vue";
import FInput from "@/components/Form/Input/FInput.vue";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import FCheckbox from "@/components/Form/Checkbox/FCheckbox.vue";
import { required, requiredIf } from "@vuelidate/validators";
import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { generateUniqueKey } from "@/utils";
import { useHandleError } from "@/composables/useErrorHandling";
import { useRouter } from "vue-router";

interface Props {
  form: TForm<any>;
}
const props = defineProps<Props>();
const emit = defineEmits(["submit", "register", "on-block"]);

const { form } = unref(props);

const siteKey = import.meta.env.VITE_APP_SITE_KEY;
const { t } = useI18n();
const { showToast } = useCustomToast();
const { handleError } = useHandleError();
const storeAuth = useAuthStore();
const router = useRouter();

const phoneInvalid = ref(false);
const captchaToken = ref();
const responseError = ref(false);
const loading = ref(false);
const step = ref(1);
const typePassword = ref(true);

function verifyMethod(response: any) {
  captchaToken.value = response;
}
function expiredMethod() {
  captchaToken.value = null;
}

function submit() {
  if (captchaToken?.value) {
    if (step.value === 1) {
      checkPhone();
    } else {
      toConfirm();
    }
  } else {
    showToast(t("check_captcha"), "error");
  }
}

function toConfirm() {
  formPassword.$v.value.$touch();
  if (!formPassword.$v.value.$invalid) {
    loading.value = true;
    form.values.password = formPassword.values.password;

    ApiService.post("/account/StudentFinishLogin/", {
      phone_number: form.values.phone?.replaceAll(" ", ""),
      password: formPassword.values.password,
    })
      .then(async (response: any) => {
        await storeAuth.setTokens(response?.data);
        await storeAuth.getUser().then(() => {
          router.push({ name: "Courses" });
        });
      })
      .catch((error) => {
        responseError.value = true;
        handleError(error);
      })
      .finally(() => (loading.value = false));

    // ApiService.post("/account/StudentEntryLogin/", {
    //   phone_number: form.values.phone?.replaceAll(" ", ""),
    //   password: formPassword.values.password,
    // })
    //   .then(() => {
    //     emit("submit");
    //   })
    //   .catch(({ response }) => {
    //     responseError.value = true;
    //     handleError(response);
    //   })
  }
}

function checkPhone() {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    loading.value = true;
    ApiService.post("/account/CheckPhoneNumber/", {
      phone_number: form.values.phone?.replaceAll(" ", ""),
    })
      .then((res: any) => {
        if (res?.data?.phone_number) {
          step.value = 2;
          formPassword.$v.value.$reset();
          captchaToken.value = "";
        } else {
          showToast(t("already_registered_as_admin"), "error");
        }
      })
      .catch(({ response }) => {
        emit("register");
        handleError(response);
      })
      .finally(() => (loading.value = false));
  }
}

const formPassword = useForm(
  {
    password: "",
    checkbox: false,
  },
  {
    password: {
      requiredIf: requiredIf(() => step.value === 2),
    },
  }
);

const onTrig = (newValue: boolean) => {
  phoneInvalid.value = newValue;
};
watch(
  () => formPassword.values.password,
  () => {
    if (responseError.value) {
      responseError.value = false;
    }
  }
);
watch(
  () => form.values.phone,
  () => {
    if (step.value === 2) {
      step.value = 1;
    }
  }
);
</script>
