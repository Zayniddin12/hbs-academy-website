<template>
  <header class="w-full bg-white py-4 px-6 z-50 sticky top-0 header-shadow">
    <div class="flex items-center justify-between w-full container">
      <div class="flex-y-center gap-8">
        <RouterLink to="/" class="shrink-0">
          <img src="/images/svg/logo.svg" alt="logo" />
        </RouterLink>
        <CLanguageSwitcher />
      </div>
      <nav class="flex w-full h-full items-center gap-6 justify-end">
        <slot name="before-links" />

        <slot name="after-links"></slot>
        <button
          v-if="false"
          class="w-12 h-12 rounded-full bg-white-100 group hover:bg-green-200 transition-300 cursor-pointer"
        >
          <i
            class="icon-bell text-gray text-[32px] group-hover:text-green transition-300"
          />
        </button>
        <CProfileDropdown
          v-if="user?.id"
          :profile-items="profileItems"
          :user="user"
        />
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import CProfileDropdown from "@/layout/Dashboard/components/CProfileDropdown.vue";
import { useI18n } from "vue-i18n";
import CLanguageSwitcher from "@/components/CLanguageSwitcher.vue";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const { t } = useI18n();
interface Props {
  links?: {
    title: string;
    to: string;
  }[];
  activeRoute?: string;
}

defineProps<Props>();

const user = computed(() => useAuthStore().user);

const profileItems = [
  {
    title: t("help"),
    event: "on-profile",
  },
];
</script>

<style scoped>
.header-shadow {
  box-shadow: 0 -4px 58px #0000000f !important;
}
</style>
