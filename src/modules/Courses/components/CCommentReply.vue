<template>
  <div class="flex gap-2 py-3">
    <CAvatar class="!w-8 !h-8" :image="comment?.user?.avatar" />
    <div>
      <div class="flex-y-center gap-1">
        <p class="text-sm leading-130 text-dark font-semibold">
          {{ comment?.user?.name }}
        </p>
        <p class="text-xs leading-130 font-medium text-gray">
          {{ dayjs(comment?.created_at).format("DD.MM.YYYY, HH:mm") }}
        </p>
      </div>
      <p class="mt-1 text-2xs leading-130 font-normal text-dark">
        {{ comment?.body }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CAvatar from "@/components/CAvatar.vue";
import dayjs from "dayjs";

interface Props {
  comment: {
    id: number;
    user: {
      id: number;
      name: string;
      avatar: string;
      is_verified: boolean;
    };
    created_at: string;
    body: string;
  };
}

defineProps<Props>();
</script>

<style scoped></style>
