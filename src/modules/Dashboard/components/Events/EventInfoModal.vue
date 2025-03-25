<template>
  <CDialog
    v-bind="{ show }"
    body-class="!max-w-[344px] min-w-[344px]"
    @close="$emit('close')"
  >
    <template #header><div></div></template>
    <div class="text-center">
      <CRoundedIcon color="green" icon="icon-calendar-course" />
      <p class="text-base leading-130 font-semibold mt-5 mb-2">
        {{ event?.event?.title }}
      </p>
      <p class="text-xs leading-normal text-dark">
        {{ event?.event?.description }}
      </p>
      <div class="flex-y-center justify-between gap-4 mt-4">
        <CDeadlineDate without-deadline :date="event?.event?.datetime" />
        <EventStatus :status="event?.event?.status" v-if="event" />
      </div>

      <div class="flex-y-center gap-4 mt-4">
        <CButton
          class="w-full"
          variant="secondary"
          :text="$t('close')"
          @click="$emit('close')"
        />
      </div>
    </div>
  </CDialog>
</template>

<script setup lang="ts">
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CRoundedIcon from "@/components/Common/CRoundedIcon.vue";
import CButton from "@/components/Common/CButton.vue";
import CDeadlineDate from "@/modules/Assignments/components/CDeadlineDate.vue";
import EventStatus from "@/modules/Dashboard/components/Events/EventStatus.vue";

interface Props {
  show?: boolean;
  event: {
    id: number;
    event: {
      title: string;
      description: string;
      course: {
        id: number;
        title: string;
        photo: string;
      };
      flow: {
        name: string;
      };
      status: "pending" | "canceled" | "completed" | "on_going";
      datetime: string;
    };
  };
}

defineProps<Props>();
</script>
