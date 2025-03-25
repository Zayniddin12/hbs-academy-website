<template>
  <RouterLink
    :to="{ name: 'AssignmentSingle', params: { id: card?.id } }"
    class="p-3 flex-y-center gap-2 relative transition-300 group"
    :class="{ 'bg-[#F3FCF6]': active, 'hover:bg-white-100': !active}"
  >
    <CShowPoint
      :type="checkStatus(card?.submitted, card?.end_date, card?.ball)"
      :point="card?.submitted ? card?.ball : card?.details?.ball"
    />
    <div class="flex flex-col justify-between h-full gap-2">
      <p
        class="text-xs leading-130 font-semibold tex-dark line-clamp-2 group-hover:text-primary transition-300"
      >
        {{ card?.details?.title }}
      </p>
      <CDeadlineDate :date="card?.end_date" />
    </div>

    <div
      class="absolute w-[calc(100%-84px)] h-px bottom-0 right-0 bg-secondary"
    />
  </RouterLink>
</template>

<script setup lang="ts">
import CShowPoint from "@/modules/Assignments/components/CShowPoint.vue";
import CDeadlineDate from "@/modules/Assignments/components/CDeadlineDate.vue";
import { IAssignment } from "@/types/common";

interface Props {
  card: IAssignment;
  active: boolean;
}

defineProps<Props>();

function checkStatus(submitted: boolean, end_date: string, ball?: number) {
  const now = new Date().getTime();
  const deadline = new Date(end_date).getTime();
  if (submitted && ball !== null) return "completed";
  if (now > deadline) return "expired";
  return "active";
}
</script>
