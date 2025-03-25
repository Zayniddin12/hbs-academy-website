<template>
  <header class="flex justify-between mb-6">
    <div>
      <h2 class="text-xl leading-23 font-medium text-dark-100">
        {{ title }}
      </h2>
      <p class="text-xs leading-14 font-normal text-gray-200 mt-1.5">
        {{ subtitle }}
      </p>
    </div>
    <div class="flex-y-center gap-5">
      <div class="shrink-0">
        <slot name="beforeSearch" />
      </div>
      <Input
        v-model="search"
        v-if="!noSearch"
        prefix-class="pr-2.5"
        :placeholder="$t(searchPlaceholder)"
        @update:modelValue="$emit('search', $event)"
      >
        <template #prefix>
          <span class="icon-search text-gray text-xl"></span>
        </template>
        <template #suffix>
          <button
            :class="{ '!opacity-100 !visible': search?.length }"
            class="w-5 h-5 flex-center bg-gray/[16%] rounded-full p-1 transition-200 group hover:bg-red opacity-0 invisible"
            @click="clearSearch"
          >
            <span
              class="icon-xmark text-gray text-[10px] transition-200 group-hover:text-white"
            />
          </button>
        </template>
      </Input>
      <div class="flex-shrink-0">
        <slot name="afterSearch" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Input from "@/components/Form/Input/FInput.vue";

import { ref, watch } from "vue";

interface Props {
  searchPlaceholder?: string;
  search?: string;
  title?: string;
  subtitle?: string;
  noSearch?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: "search",
});
const emit = defineEmits(["search"]);

const search = ref();

function clearSearch() {
  search.value = "";
}

watch(
  () => search.value,
  () => {
    emit("search", search.value);
  }
);

watch(
  () => props?.search,
  () => {
    search.value = props?.search;
  },
  { immediate: true }
);
</script>

<style scoped></style>
