<template>
  <div
    class="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] gap-4 rounded-[10px] border border-gray/[16%] pl-6"
  >
    <div v-for="(item, index) in head" :key="index" class="py-[14px]">
      <p class="text-xs leading-130 text-[#051A13] font-semibold">
        {{ item.name }}
      </p>
    </div>
  </div>

  <div class="mt-2">
    <div v-if="!loading" class="w-full flex flex-col gap-2">
      <CTableItem
        v-for="(item, index) in list"
        :key="index"
        :place="item?.position"
        :item="item"
      />
    </div>
    <div v-else class="w-full flex flex-col gap-2">
      <CPreloader
        v-for="i in 10"
        :key="i"
        class="w-full h-[72px]"
        height="72px"
        border-radius="16px"
        loading
      />
    </div>

    <div v-if="params?.total > params?.limit" class="mt-6 flex justify-end">
      <CPagination
        :total="params.total"
        :limit="params?.limit"
        :current-page="params?.current_page"
        pagination-buttons
        @change="changePage"
        @input="changePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import CTableItem from "@/components/Table/CTableItem.vue";
import CPagination from "@/components/Common/Table/CPagination.vue";
import CPreloader from "@/components/CPreloader.vue";
import { ref } from "vue";
import ApiService from "@/services/ApiService";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const loading = ref(true);
const route = useRoute();

const params = ref({
  total: 0,
  limit: 10,
  current_page: route.query.page ? Number(route.query.page) : 1,
});

const list = ref([]);

function getList() {
  loading.value = true;
  ApiService.query(`/study/Course/${route.params?.id}/Standings/`, {
    params: {
      page_size: params.value.limit,
      page: params.value.current_page,
    },
  })
    .then((res: any) => {
      params.value.total = res?.data?.count;
      list.value = res?.data?.results;
    })
    .finally(() => {
      loading.value = false;
    });
}

getList();

function changePage(page: number) {
  router.push({ query: { page: page } });
  if (page !== params.value.total) {
    params.value.current_page = page;
    getList();
  }
}

const head = [
  {
    name: "№",
    value: "id",
  },
  {
    name: t("student"),
    value: "student",
  },
  {
    name: t("ball"),
    value: "ball",
  },
  {
    name: t("assignments_count", { count: 1 }),
    value: "assignments_count",
  },
  {
    name: t("lesson"),
    value: "lesson",
  },
  {
    name: t("module"),
    value: "module",
  },
];
</script>

<style scoped></style>
