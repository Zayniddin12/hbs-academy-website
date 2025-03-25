<template>
  <div v-if="data" class="bg-white flex items-center justify-between w-full rounded-xl shadow-primary p-3 mb-4">
    <div>
      <div class="flex gap-1 items-center mb-2">
        <div class="p-1 w-7 h-7 shrink-0 bg-yellow rounded-lg">
          <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M12.0004 11.9999L12.0004 16.7999M12.0004 8.44209V8.3999M2.40039 11.9999C2.40039 6.69797 6.69846 2.3999 12.0004 2.3999C17.3023 2.3999 21.6004 6.69797 21.6004 11.9999C21.6004 17.3018 17.3023 21.5999 12.0004 21.5999C6.69846 21.5999 2.40039 17.3018 2.40039 11.9999Z"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </div>

        <p class="text-dark text-sm font-semibold leading-6">
          {{ $t("task_off") }}
        </p>
      </div>
      <div class="flex gap-3 items-center justify-between">
        <p class="text-sm font-normal text-dark leading-130">
         {{ data?.assignment?.title }}
          <br/>
          <span>
            {{ data?.reject_reason }}
            <span class="font-semibold">
              {{ dayjs(data?.end_date).format("DD.MM.YYYY") }}
            </span>
          </span>
        </p>
      </div>
    </div>

    <CButton
        @click.stop="$router.push(`/assignments/${data?.id}`)"
      icon="icon-chevron rotate-180"
      :text="$t('go_to_assignment')"
      variant="yellow"
      main-class="whitespace-nowrap"
    />
  </div>
</template>

<script lang="ts" setup>
import CButton from "@/components/Common/CButton.vue";
import dayjs from "dayjs";
interface Props {
  data: {
    link?: string;
    title?: string;
    date?: string;
  }

}

defineProps<Props>();
</script>
<style scoped>
.shadow-primary {
  box-shadow: 0 2px 4px 0 #0000000A;
}
</style>
