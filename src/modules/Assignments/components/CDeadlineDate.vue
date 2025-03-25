<template>
  <div
    class="flex-y-center gap-1 py-1 px-2 rounded-full w-max"
    :class="classDeadlineDate"
  >
    <i class="icon-calendar-time" />
    <p class="text-xs leading-120">
      {{ dayjs(date).format("DD.MM.YYYY, HH:mm") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import { calculateDeadline } from "@/utils";

interface Props {
  date: Date;
  withoutDeadline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  withoutDeadline: false,
});

// write function can calculate remaining day and return due to props.date write

// function remainingDay(date: Date) {
//   const now = dayjs();
//   const deadline = dayjs(date);
//   return deadline.diff(now, "day");
// }

const classDeadlineDate = computed(() => {
  if (props?.withoutDeadline) {
    return "bg-green-200 text-green";
  } else {
    const remaining = calculateDeadline(props.date);
    if (remaining > 2) return "bg-green-200 text-green";
    if (remaining > 0) return "bg-yellow-200/10 text-yellow";
    if (remaining <= 0) return "bg-red-200/10 text-red";
    return "bg-gray-200 text-gray";
  }
});
</script>
