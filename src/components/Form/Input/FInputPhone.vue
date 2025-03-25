<template>
  <div class="phone-input relative" ref="inputWrapper">
    <i
      class="icon-globe transition-200 text-2xl h-6 text-gray-100 absolute-y left-2 flex-center"
      :class="valid ? 'opacity-0' : 'opacity-100'"
    />

    <VueTelInput
      ref="phoneInput"
      v-model="phone"
      :input-options="{ placeholder, maxlength: 20 }"
      :disabled="readonly"
      :autoDefaultCountry="false"
      valid-characters-only
      :class="{
        invalid: !valid,
        '!border-red !bg-[#FEF7F7]': invalidError || error,
      }"
      @validate="handleValidatedPhone"
      @keydown.enter="$emit('enter')"
    />

    <!--    <Transition name="fade">-->
    <!--      <CSpinner-->
    <!--        v-if="loading"-->
    <!--        class="right-0 absolute w-min inline-block scale-[0.4] ml-[calc(100%-20px)] top-2"-->
    <!--      />-->
    <!--    </Transition>-->
  </div>
</template>

<script lang="ts" setup>
import "@/assets/styles/vue-tel-input.css";

import { useEventListener } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { VueTelInput } from "vue-tel-input";

// const CSpinner = defineAsyncComponent(
//   () => import("@/components/Common/CSpinner.vue")
// );
interface Props {
  error?: boolean;
  modelValue?: string;
  placeholder?: string;
  loading?: boolean;
  readonly?: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (event: "update:modelValue", value: string): void;
  (event: "trigger", value: boolean): void;
  (event: "blur", value: string): void;
  (event: "reset-validation"): void;
  (event: "enter"): void;
}
const emit = defineEmits<Emits>();

const valid = ref(false);
const invalidError = ref(false);
const phone = ref("");

const phoneInput = ref<HTMLElement>();
const inputWrapper = ref<HTMLElement>();

useEventListener(phoneInput, "keydown", (e: KeyboardEvent) => {
  if (e.key === "Backspace" && phone.value === "+") {
    e.preventDefault();
  }
});

watch(
  () => phone.value,
  (value) => {
    emit("update:modelValue", value);
  }
);

watch(
  () => props.modelValue,
  () => {
    phone.value = props.modelValue ?? "";
  },
  { immediate: true }
);

const onFocus = () => {
  if (phone.value?.length === 0) {
    emit("update:modelValue", "+");
  }
};

const onBlur = () => {
  if (phone.value?.length === 1) {
    phone.value = "";
    setTimeout(() => {
      emit("reset-validation");
    }, 10);
  }

  // On change tab validation touch method fires immediately. So we need to wait
  setTimeout(() => emit("blur", phone.value), 500);
};

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault();

  const pastedText = e.clipboardData?.getData("text/plain") ?? "";

  const hasDefaultPlus = phone.value.startsWith("+");
  const hasPastedPlus = pastedText?.startsWith("+");

  if (hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText;
  } else if (hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`;
  } else if (!hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText;
  } else if (!hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`;
  }
};

onMounted(() => {
  const phoneInput = inputWrapper.value?.querySelector(
    ".phone-input input"
  ) as HTMLInputElement;
  phoneInput.setAttribute("placeholder", props.placeholder ?? "");

  phoneInput.onblur = onBlur;
  phoneInput.onfocus = onFocus;
  phoneInput.onpaste = onPaste;

  // phoneInput.focus();

  if (props.modelValue) {
    phone.value = props.modelValue;
  }
});

interface IValidateOptions {
  country: {
    dialCode: string;
    iso2: string;
    name: string;
  };
  countryCode: string | undefined;
  formatted: string | "";
  valid: boolean | undefined;
  countryCallingCode?: string;
  nationalNumber?: string;
  number?: string;
}

function handleValidatedPhone(options: IValidateOptions) {
  valid.value = !!options?.countryCode ?? false;
  invalidError.value =
    !options.valid &&
    !!options?.countryCode &&
    options.formatted.length > String(options.number)?.length;
  emit("trigger", invalidError.value);
}
</script>

<style>
.phone-input .vue-tel-input {
  @apply rounded-lg overflow-hidden bg-white-100 border border-transparent focus-within:border-primary transition-all duration-200;
}

.phone-input .vti__dropdown {
  @apply pointer-events-none transition-all duration-300;
}

.phone-input .invalid .vti__dropdown {
  @apply invisible opacity-0;
}

.phone-input input {
  @apply py-[10.5px] pl-0 bg-transparent text-sm text-dark;
}

.phone-input input::placeholder {
  @apply text-sm text-gray;
}

.phone-input .vti__dropdown-list {
  @apply hidden;
}

.phone-input .vti__dropdown .vti__dropdown-arrow {
  @apply hidden;
}
</style>
