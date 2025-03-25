<template>
  <FInput
    v-model="value"
    :placeholder="placeholder"
    :type="isPassword ? 'password' : 'text'"
    v-bind="{ error }"
  >
    <template #suffix>
      <CEyeToggle
        :type-password="!isPassword"
        class="translate-y-0.5 block cursor-pointer"
        @click="$emit('toggle')"
      />
    </template>
  </FInput>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import FInput from "@/components/Form/Input/FInput.vue";
import CEyeToggle from "@/components/Form/Input/CEyeToggle.vue";

interface Props {
  error?: boolean;
  placeholder: string;
  isPassword?: boolean;
}
const props = defineProps<Props>();
interface Emits {
  (e: "update:modelValue", v: string): void;
}
const emit = defineEmits<Emits>();

const value = ref<string>("");
const type = ref(props.isPassword ? "password" : "text");

watch(
  () => value.value,
  (v) => {
    value.value = value.value.replace(/\s+/g, "");
    emit("update:modelValue", v);
  }
);
</script>
