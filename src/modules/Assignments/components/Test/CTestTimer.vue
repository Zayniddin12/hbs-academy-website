<template>
  <div
    class="py-3 px-4 border border-[#C8CFD6] border-dashed rounded-lg bg-white-100 flex-center-between gap-4"
  >
    <div class="flex-y-center gap-1">
      <i class="icon-time text-primary text-xl" />
      <p class="text-xs leading-130 font-medium text-gray">
        {{ $t("left_time") }}
      </p>
    </div>

    <p
      class="text-[28px] text-primary leading-130 font-semibold"
      :class="[
        {
          'text-yellow': !timeValues?.hours && timeValues?.minutes < 15,
        },
        {
          '!text-red': !timeValues?.hours && timeValues?.minutes < 1,
        },
      ]"
    >
      {{ time }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Props {
  defaultTime?: number;
  isSubmitted: boolean;
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();
const time = ref("00:00:00");

const timeValues = ref();

function countdown(hours: number, minutes: number, seconds: number) {
  const targetTime =
    new Date().getTime() + hours * 3600000 + minutes * 60000 + seconds * 1000;

  let text = "";

  const interval = setInterval(function () {
    const currentTime = new Date().getTime();
    const timeRemaining = targetTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(interval);
      text = "Countdown is over!";
      if (!props.isSubmitted) {
        router.push({
          name: "AssignmentSingle",
          params: { id: route.params.id },
        });
      }
    } else {
      const remainingHours = Math.floor(timeRemaining / 3600000);
      const remainingMinutes = Math.floor((timeRemaining % 3600000) / 60000);
      const remainingSeconds = Math.floor((timeRemaining % 60000) / 1000);

      timeValues.value = {
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      };
      2;
      time.value = `${
        remainingHours < 10 ? `0${remainingHours}` : remainingHours
      }:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}:${
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
      }`;
    }
  }, 1000);

  return text;
}

watch(
  () => props.defaultTime,
  () => {
    countdown(0, 0, props.defaultTime || 0);
  }
);

// watch(
//   () => time.value,
//   (val) => {
//     console.log(val);
//   }
// );
</script>
