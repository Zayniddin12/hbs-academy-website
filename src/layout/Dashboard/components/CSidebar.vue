<template>
  <div class="flex flex-col gap-4 justify-between h-[calc(100vh-150px)]">
    <div class="flex flex-col">
      <RouterLink
        v-for="(routeItem, index) in routes"
        :key="index"
        :to="routeItem?.route"
        class="flex-y-center gap-3 px-4 py-[14px] rounded-xl border border-transparent transition-300 hover:bg-white hover:border-secondary group relative"
      >
        <i
          :class="routeItem?.icon"
          class="text-2xl text-gray-100 group-hover:text-primary transition-300"
        />
        <p
          class="text-base leading-130 font-medium text-gray-100 group-hover:text-dark transition-300"
        >
          {{ routeItem.title }}
        </p>
        <div
          v-if="index !== routes.length - 1"
          class="w-[calc(100%-52px)] absolute h-px bottom-0 right-0 bg-secondary transition-300 group-hover:opacity-0"
        />
      </RouterLink>
    </div>

    <div>
      <RouterLink
        class="text-xs leading-normal text-gray transition-300 hover:text-primary underline"
        to="/pages/privacy-policy"
      >
        {{ $t("privacy_policy") }}
      </RouterLink>
      <p class="text-xs leading-normal text-gray mt-2.5">
        {{ $t("version") }} {{ version }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  routes: {
    title: string;
    route: string;
    icon: string;
    name: string;
  }[];
}

defineProps<Props>();

const version = computed(() => import.meta.env.VITE_APP_VERSION);
</script>

<style scoped>
.router-link-exact-active {
  background: #fff;
  border-color: #edf1f5;
}

.router-link-exact-active p {
  color: #080a15;
}

.router-link-exact-active i {
  color: #16cc53;
}
</style>
