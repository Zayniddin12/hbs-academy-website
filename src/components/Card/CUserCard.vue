<template>
  <div class="flex-y-center gap-3">
    <CAvatar :image="card?.image" avatar-class="!w-8 !h-8 before:border" />
      <p class="font-medium text-dark text-sm leading-130 mb-0.5">{{card?.full_name}}</p>
  </div>
</template>

<script setup lang="ts">


import CAvatar from "@/components/CAvatar.vue";

interface ICard {
  id?: number
 full_name: string
  image: string
}

interface Props {
  card: ICard
}

defineProps<Props>()

</script>
