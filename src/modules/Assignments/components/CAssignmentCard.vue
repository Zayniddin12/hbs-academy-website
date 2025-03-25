<template>
  <RouterLink
    :to="{ name: 'AssignmentSingle', params: { id: card?.id ?? 1 } }"
    class="border border-secondary rounded-2xl relative overflow-hidden hover:bg-white-100 hover:border-gray-200 transition-300 group"
  >
    <div
      class="py-3 px-4 bg-white-100 flex-center-between gap-16 group-hover:bg-secondary transition-300"
      :class="{ '!bg-white': loading }"
    >
      <CPreloader v-bind="{ loading }" width="340px" height="18px">
        <div class="flex-y-center gap-2 mb-2">
          <span class="text-sm font-medium text-gray-100">{{
            card?.flow?.name
          }}</span>
          <span class="block relative w-px h-4 bg-dark/20" />
          <span class="text-sm font-medium text-gray-100">{{
            card?.module?.title
          }}</span>
        </div>
        <p class="text-base leading-130 font-semibold text-dark">
          {{ card?.details?.title }}
        </p>
      </CPreloader>
      <i v-if="!loading" class="icon-chevron text-2xl text-gray rotate-180" />
    </div>
    <div class="p-3 flex gap-4">
      <CPreloader v-bind="{ loading }" width="64px" height="64px">
        <CShowPoint
          :type="checkStatus(card?.submitted, card?.end_date, card?.ball)"
          :point="card?.submitted ? card?.ball : card?.details?.ball"
        />
      </CPreloader>

      <div class="flex items-end justify-between w-full gap-3">
        <div class="w-full flex flex-col justify-between gap-1 h-full">
          <div>
            <CPreloader v-bind="{ loading }" width="240px" height="15px">
              <p
                class="text-sm leading-130 font-semibold text-dark line-clamp-2"
              >
                {{ card.details?.description }}
              </p>
            </CPreloader>
            <CPreloader
              v-bind="{ loading }"
              width="240px"
              height="15px"
              preloader-class="mt-0.5"
            />
          </div>
          <CPreloader
            v-bind="{ loading }"
            width="100px"
            height="15px"
            border-radius="16px"
          >
            <div class="w-full flex-y-center justify-between">
              <CDeadlineDate :date="card?.end_date" />
            </div>
          </CPreloader>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import CDeadlineDate from "@/modules/Assignments/components/CDeadlineDate.vue";
import CShowPoint from "@/modules/Assignments/components/CShowPoint.vue";
import CPreloader from "@/components/CPreloader.vue";
import { IAssignment } from "@/types/common";

interface Props {
  card: IAssignment;
  loading?: boolean;
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
