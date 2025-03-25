<template>
  <div>
    <CTableHeader
      :search="filter.search"
      :title="title"
      :subtitle="subtitle"
      @search="handleTableSearch"
    >
      <template #afterSearch>
        <div class="flex-center space-x-5">
          <FDatePicker v-model="filter.date" range class="min-w-[244px]" />
          <CButton :text="$t('add')" class="!px-4" />
        </div>
      </template>
      <template #beforeSearch>
        <slot name="beforeSearch" />
      </template>
    </CTableHeader>
    <CTable
      :type="type"
      :total="data?.length"
      :data="data"
      :head="head"
      :current-page="currentPage"
      :loading="loading"
      :limit="limit"
    >
    </CTable>
    <Transition name="dropdown" mode="out-in">
      <CTableFooter
        v-if="!loading"
        :total="total"
        :items-per-page="itemsPerPage"
        :limit="limit"
        :current-page="currentPage"
        @items-per-page="handleLimitChange"
        @page-change="handlePageChange"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CTable from "@/components/Common/Table/CTable.vue";
import CTableHeader from "@/components/Common/Table/CTableHeader.vue";
import CTableFooter from "@/components/Common/Table/CTableFooter.vue";
import { ITableHead } from "@/types/components/table";
import CButton from "@/components/Common/CButton.vue";
import FDatePicker from "@/components/Form/Date/FDatePicker.vue";

import { reactive } from "vue";

interface Props {
  title?: string;
  subtitle?: string;

  type?: "filled" | "transparent";

  loading?: boolean;

  head: ITableHead[];
  data: Record<string, any>[];

  total?: number;
  limit: number;
  currentPage: number;
  itemsPerPage: number;
}
withDefaults(defineProps<Props>(), {
  type: "transparent",
});
const emit = defineEmits<{
  (e: "search", value: string): void;
  (e: "itemsPerPage", value: number): void;
  (e: "pageChange", value: number): void;
}>();

const filter = reactive({
  status: "all" as "true" | "false",
  search: "",
  date: undefined as string | undefined,
  limit: 10,
  page: 1,
});

function handleClearFilter() {
  filter.date = undefined as string | undefined;
}
function handleTableSearch(q: string) {
  filter.search = q;
}

function handlePageChange(page: number) {
  filter.page = page;
}

function handleLimitChange(limit: number) {
  filter.limit = limit;
  filter.page = 1;
}
</script>

<style scoped></style>
