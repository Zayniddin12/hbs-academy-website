<template>
  <div>
    <CTitle :title="$t('saved')" />

    <div class="p-5 bg-white mt-4 rounded-2xl flex flex-col gap-4">
      <CSaved
        v-for="(lesson, index) in list"
        :key="index"
        v-bind="{ lesson }"
        @click-bookmark="getList"
      />

      <div v-if="paginationData?.total > list?.length" class="flex-center">
        <CButton
          variant="secondary"
          icon="icon-chevron -rotate-90 font-bold"
          :text="$t('load_more')"
          @click="load"
          :loading="buttonLoading"
        />
      </div>
      <CNoSaved v-if="!list?.length && !loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import CSaved from "@/modules/Dashboard/components/CSaved.vue";
import { saved } from "@/modules/Dashboard/data";
import CNoSaved from "@/modules/Courses/components/CNoSaved.vue";
import { reactive, ref } from "vue";
import ApiService from "@/services/ApiService";
import CButton from "@/components/Common/CButton.vue";

const paginationData = reactive({
  limit: 5,
  page: 1,
  total: 0,
});
const list = ref([]);
const loading = ref(true);
const buttonLoading = ref(false);

function getList(merge?: boolean) {
  ApiService.query("/study/saved_lessons/", {
    params: {
      page: paginationData?.page,
      page_size: paginationData?.limit,
    },
  })
    .then((res: any) => {
      paginationData.total = res?.data?.count;
      if (merge) {
        res?.data?.results.forEach((item: any) => {
          list.value.push(item);
        });
      } else {
        list.value = res?.data?.results;
      }
    })
    .finally(() => {
      loading.value = false;
      buttonLoading.value = false;
    });
}

getList();

function load() {
  buttonLoading.value = true;
  paginationData.page++;
  getList(true);
}
</script>
