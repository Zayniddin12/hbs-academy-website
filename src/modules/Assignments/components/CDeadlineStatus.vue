<template>
  <div
    class="flex-y-center gap-1 px-3 py-2 bg-white-100 rounded-lg max-w-[343px] mt-5"
    :class="[
      { '!bg-green-200': isSubmitted },
      { '!bg-red/10': calculateDeadline(deadline) <= 0 && !isSubmitted },
    ]"
  >
    <template v-if="calculateDeadline(deadline) > 0 && !isSubmitted">
      <i class="icon-info text-base text-primary" />
      <i18n-t
        keypath="until_deadline"
        tag="p"
        class="text-xs leading-normal text-dark font-semibold"
      >
        <template #day>
          <span class="text-primary">{{ calculateDeadline(deadline) }}</span>
        </template>
      </i18n-t>
    </template>
    <template v-if="isSubmitted">
      <i class="icon-tick-stroke text-base text-primary" />
      <i18n-t
        keypath="submitted_text"
        tag="p"
        class="text-xs leading-normal text-primary font-semibold"
      >
        <template #date>
          <span class="text-dark">
            {{ dayjs(new Date(date)).format("DD.MM.YYYY, HH:mm") }}
          </span>
        </template>
      </i18n-t>
    </template>
    <template v-if="calculateDeadline(deadline) <= 0 && !isSubmitted">
      <i class="icon-close-stroke text-base text-red" />
      <p class="text-xs leading-normal text-red font-semibold">
        {{ $t("submitted_text_failed") }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { calculateDeadline } from "@/utils";

interface Props {
  deadline?: string;
  day?: number;
  isSubmitted?: boolean;
  date?: string;
}

const props = defineProps<Props>();

console.log(props.end_date);
</script>
