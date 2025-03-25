<template>
  <div class="w-full flex-center-between gap-5 py-6">
    <CommonPageLimitChange
      v-model:itemsPerPage="itemsCountInTable"
      v-if="total > 5"
    />
    <CommonPagination
      v-if="totalPages > 1"
      pagination-buttons
      v-bind="{ total, currentPage, limit }"
      @input="$emit('page-change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import CommonPagination from "@/components/Common/Table/CPagination.vue";
import CommonPageLimitChange from "@/components/Common/Table/CPageLimitChange.vue";
import { computed, ref, WritableComputedRef } from "vue";

interface Props {
  total?: number;
  limit: number;
  currentPage: number;
  itemsPerPage: number;
}
const props = defineProps<Props>();
const emit = defineEmits(["itemsPerPage"]);

const totalPages = computed(() => {
  if (props.total < props.limit) {
    return 1;
  } else {
    return props.total / props.limit;
  }
});
const inputItemsPerPage = ref(10);

const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.itemsPerPage;
  },
  set(value: number): void {
    inputItemsPerPage.value = value;
    emit("itemsPerPage", value);
  },
});
</script>

<style scoped></style>
