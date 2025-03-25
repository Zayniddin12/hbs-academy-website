<template>
  <div>
    <RouterView v-if="width > 1023" v-slot="{ Component }">
      <div :key="detectLayout">
        <component :is="detectLayout">
          <Component :is="Component" />
        </component>
      </div>
    </RouterView>
    <div v-else-if="width > 600">
      <CTablet />
    </div>
    <div v-else>
      <CMobile />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import LDefault from "@/layout/Dashboard/LDefault.vue";
import LError from "@/layout/Error/LError.vue";
import LAuth from "@/layout/Auth/LAuth.vue";
import { useWindowSize } from "@vueuse/core";
import CTablet from "@/components/CTablet.vue";
import CMobile from "@/components/CMobile.vue";
// Setup

const { width } = useWindowSize();

const route = useRoute();
const layouts: { [key: string]: string } = {
  default: LDefault,
  error: LError,
  auth: LAuth,
};

const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});
</script>
