<template>
  <div>
    <div class="bg-white-100 min-h-screen flex relative">
      <div class="w-full h-full">
        <CHeader />
        <slot />
      </div>
    </div>
    <COngoingTest
      :show="showModal"
      @close="showModal = false"
      @submit="submitTest"
    />
  </div>
</template>
<script lang="ts" setup>
import CHeader from "@/layout/Dashboard/components/CHeader.vue";
import ApiService from "@/services/ApiService";
import COngoingTest from "@/components/Common/Dialog/COngoingTest.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useConnectionWS } from "@/composables/useWebsocket";

const router = useRouter();
const route = useRoute();
const test = ref();
const showModal = ref(false);

function getTest() {
  ApiService.get("assignment/GetOngoingTest").then((res) => {
    if (res?.data?.id && route.name !== "Test") {
      showModal.value = true;
    }
    test.value = res.data;
  });
}

getTest();

function submitTest() {
  showModal.value = false;
  router.push({
    name: "Test",
    params: { id: test.value.id },
  });
}

useConnectionWS();
</script>
