<template>
  <div
    :class="[
      'transition-200 h-10 inline-flex items-center justify-start relative bg-white-100 rounded-lg border border-transparent overflow-hidden w-full py-[11px] px-3 ',
      error ? '!border-red' : 'focus-within:border-primary',
    ]"
  >
    <span :class="[prefixClass]">
      <slot name="prefix" />
    </span>
    <input
      :value="modelValue"
      v-bind="{ type, minlength, maxlength, max, min, disabled, placeholder }"
      :readonly="!autocomplete"
      :class="[
        inputClass,
        'font-normal text-sm leading-130 text-dark placeholder:text-gray bg-transparent flex-grow outline-none',
      ]"
      class="w-full"
      ref="kInput"
      @input="handleInput"
      @blur="emit('blur')"
      @focus="emit('focus')"
    />

    <span :class="[suffixClass]">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TClassName } from "@/types/common";

export interface Props {
  type?: string;
  placeholder?: string;
  modelValue?: number | string;
  disabled?: boolean;
  error?: boolean;
  maxlength?: number;
  minlength?: number;
  max?: number;
  min?: number;
  inputClass?: TClassName;
  prefixClass?: TClassName;
  suffixClass?: TClassName;
  autocomplete?: boolean;
}

interface Emits {
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "update:modelValue", value: Props["modelValue"]): void;
}
const emit = defineEmits<Emits>();

const handleInput = (e: { target: HTMLInputElement }) => {
  emit("update:modelValue", e.target.value);
};

const kInput = ref();
defineExpose({ kInput });

withDefaults(defineProps<Props>(), {
  type: "text",
  maxlength: undefined,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: true,
});
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
