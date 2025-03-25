<template>
  <RouterLink
    :to="{ name: 'Profile' }"
    class="flex-y-center gap-3 bg-white-100 rounded-full p-2 pr-4 hover:bg-green-200 transition-300"
  >
    <CAvatar class="!w-9 !h-9" :image="user?.avatar" size="sm" />
    <div>
      <p class="font-bold text-base leading-130 text-dark">
        {{ user?.full_name }}
      </p>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import CAvatar from "@/components/CAvatar.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

defineComponent({
  name: "HeaderProfile",
});

interface Props {
  user?: {
    id: string;
    full_name: string;
    phone_number: string;
    avatar: string;
    email: string;
    region: number;
    gender: string;
  };
  profileItems?: {
    title: string;
    class?: string;
    icon?: string;
    event?: string;
  }[];
}
defineProps<Props>();

const router = useRouter();
const { t } = useI18n();

interface IDropdownItem {
  label: string;
  styles?: string;
  action: () => void;
}
</script>
