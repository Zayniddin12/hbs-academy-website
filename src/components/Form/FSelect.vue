<template>
  <div class="relative" ref="select">
    <!--  SELECTED OPTION  -->
    <div
      class="transition-200 px-3 py-[9px] bg-gray/[0.04] transition-all duration-300 border border-transparent cursor-pointer flex items-center justify-between rounded-lg"
      tabindex="1"
      :class="[
        selectedOptionStyles,
        error ? '!border-red' : '',
        { 'focus-within:border-gray-100': disabled },
      ]"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <p
          tabindex="1"
          v-if="!value"
          class="font-medium text-dark select-none text-sm leading-140"
          :class="{ '!text-gray': disabled }"
        >
          {{ placeholder ?? $t("select_country") }}
        </p>
        <p
          v-else
          class="font-medium select-none text-sm text-dark leading-140"
          tabindex="1"
          :class="[{ '!text-gray': disabled }, selectedStyles]"
        >
          {{ value[labelKey] || value }}
        </p>

        <slot name="chevron">
          <span
            class="icon-chevron flex-center h-5 transition-200 text-lg text-gray-700 inline-block shrink-0 -rotate-90"
            :class="{ '!rotate-90': showOptions }"
          >
          </span>
        </slot>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition name="fade">
      <ul
        v-if="showOptions && !disabled"
        :key="showOptions"
        class="absolute top-full w-full bg-white border border-white-100 z-10 translate-y-3 overflow-hidden max-h-[300px] overflow-y-scroll text-white rounded-md shadow-select"
      >
        <slot name="options">
          <li
            v-for="(option, idx) in options"
            :key="idx"
            class="transition-300 cursor-pointer hover:bg-white-100/[0.24]"
            @click="onSelect(option)"
          >
            <p
              class="flex-y-center space-x-1.5 p-3"
              :class="{
                'border-b border-white-100': idx !== options.length - 1,
              }"
            >
              <slot name="option" :option="option" :index="idx">
                <span
                  class="text-dark text-2xs"
                  :class="{ 'font-medium': isActive(option) }"
                >
                  {{ option[labelKey] }}
                </span>
                <i
                  v-if="isActive(option)"
                  class="icon-tick text-base text-blue-100"
                ></i>
              </slot>
            </p>
          </li>
        </slot>
        <li ref="target" class="py-2" v-if="infiniteScroll"></li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useIntersectionObserver } from "@vueuse/core";
import { ref, watch } from "vue";
import { TClassName } from "@/types/common";
type TOption = string | number | { [key: string]: string | number };

export interface Props {
  modelValue?: TOption;
  options: TOption[];
  labelKey: string;
  valueKey: string;
  placeholder?: string;
  selectedOptionStyles?: TClassName;
  selectedStyles?: TClassName;
  dark?: boolean;
  error?: boolean;
  disabled?: boolean;
  infiniteScroll?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
});
const emit = defineEmits<{
  (e: "on-toggle", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
  (e: "load"): void;
  (e: "on-select", value: TOption): void;
}>();
const showOptions = ref(false);
const target = ref(null);
function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue;
  emit("on-toggle", showOptions.value);
}

function findOption(option: TOption) {
  return props.options.find(
    (o) => o === option || o[props.valueKey] === option
  );
}

const value = ref(props.modelValue || findOption(props.modelValue));
function onSelect(option: TOption) {
  value.value = option;
  toggleSelect(false);
  emit("update:modelValue", option);
  emit("on-select", option);
}

const select = ref();
onClickOutside(select, () => toggleSelect(false));

function isActive(option: TOption) {
  return (
    option === value.value ||
    option[props.valueKey as keyof typeof option] === value.value ||
    (typeof value.value === "object" &&
      option[props.valueKey as keyof typeof option] ===
        value.value[props.valueKey])
  );
}

watch(
  () => props.modelValue,
  (newValue) => {
    // value.value = findOption(newValue);
    value.value = newValue;
  },
  { immediate: true }
);
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      emit("load");
    }
  },
  { threshold: 0.5 }
);
</script>

<style scoped>
.shadow-select {
  box-shadow: 0 4px 24px 0 rgba(8, 10, 21, 0.15);
}
</style>
