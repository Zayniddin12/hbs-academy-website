<template>
  <div
    class="relative flex items-stretch p-3 rounded-lg border border-dark/10 hover:bg-white-100 transition-300"
  >
    <div
      class="border-r-2 border-r-dark/10 pl-5 py-1 pr-10 inline-flex items-center justify-center flex-col"
    >
      <p class="font-medium text-base leading-[16px]">
        {{ dayjs(event?.event?.datetime).format("MMM") }}
      </p>
      <p class="text-[42px] !leading-[42px] font-medium text-center text-green">
        {{ new Date(event?.event?.datetime).getDate() }}
      </p>
    </div>
    <div class="inline-flex items-start justify-between flex-col pl-4">
      <h3 class="text-lg font-medium">{{ event?.event?.title }}</h3>
      <p class="text-base">{{ event?.event?.description }}</p>
      <div class="inline-flex items-start justify-start gap-4 mt-2">
        <CBadge
          color="gray"
          icon-name="icon-time"
          class="!p-0 !text-xs"
          :status="
            dayjs(event?.event?.datetime).format('hh') +
            ':' +
            dayjs(event?.event?.datetime).format('mm')
          "
        />
        <EventStatus :status="event?.event?.status" v-if="event" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import CBadge from "@/components/Common/CBadge.vue";
import EventStatus from "@/modules/Dashboard/components/Events/EventStatus.vue";

interface Props {
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

<style scoped></style>
