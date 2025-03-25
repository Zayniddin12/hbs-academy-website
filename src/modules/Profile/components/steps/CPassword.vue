<template>
  <div>
    <div class="grid gap-4 mb-8">
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
    <CButton
      :text="$t('confirm')"
      class="w-full"
      @click="submit"
      v-bind="{ loading }"
    />
  </div>
</template>

<script setup lang="ts">
import { TForm } from "@/composables/useForm";
import { unref, computed, ref } from "vue";
import FInputPassword from "@/components/Form/Input/FInputPassword.vue";
import FGroup from "@/components/Form/FGroup.vue";
import CButton from "@/components/Common/CButton.vue";

interface Props {
  form: TForm<any>;
  loading?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["submit"]);
const { form } = unref(props);

const isNewPassword = ref(true);

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
    emit("submit");
  }
}
</script>
