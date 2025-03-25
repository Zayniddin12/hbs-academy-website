<template>
  <div>
    <CTitle :title="$t('events')" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import CTitle from "@/components/Common/CTitle.vue";

const loading = ref(true);
const single = ref({});
const route = useRoute();

function getEventSingle() {
  loading.value = true;
  ApiService.get(`/study/Events/${route.params.id}`)
    .then((res: any) => {
      single.value = res?.data;
    })
    .finally(() => (loading.value = false));
}

onMounted(() => {
  getEventSingle();
});
</script>

<style scoped></style>
