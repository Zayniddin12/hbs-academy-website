<template>
  <div
    class="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] gap-4 rounded-2xl bg-white border border-gray-200/50 pl-6 py-4 items-center min-h-[72px]"
    :class="{
      'green-linear !border-white': place === 1,
      '!border-green': item?.is_me,
    }"
  >
    <div class="relative z-[1]">
      <img
        v-if="place === 1"
        src="/images/places/first.png"
        alt="first"
        class="w-8 h-10"
      />
      <img
        v-if="place === 2"
        src="/images/places/second.png"
        alt="second"
        class="w-[52px] h-10"
      />
      <img
        v-if="place === 3"
        src="/images/places/third.png"
        alt="third"
        class="w-10 h-10"
      />
      <p
        v-if="place > 3"
        class="text-sm !leading-130 font-medium text-blue-900"
      >
        {{ place }}
      </p>
    </div>
    <div class="relative z-[1]">
      <div class="flex-y-center gap-2">
        <div class="w-9 h-9 rounded-full relative overflow-hidden shrink-0">
          <img
            v-if="item?.student?.avatar"
            :src="item?.student?.avatar"
            alt="student"
            class="w-full h-full object-cover"
          />
          <img
            v-else
            src="/images/default-avatar.png"
            alt="student"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <p
            class="text-blue-900 text-xs !leading-130 font-medium"
            :class="{ '!text-white': place === 1 }"
          >
            {{ item?.student?.full_name }} {{ item?.student?.last_name }}
          </p>
          <p
            class="mt-0.5 text-[#818B88] text-xs !leading-130"
            :class="{ '!text-white': place === 1 }"
          >
            {{ formatPhoneNumber(item?.student?.phone_number) }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <p
        class="text-sm !leading-130 font-medium text-blue-900 relative z-[1]"
        :class="{ '!text-white': place === 1 }"
      >
        {{ item?.total_ball }}
      </p>
    </div>
    <div>
      <p
        class="text-sm !leading-130 font-medium text-blue-900 relative z-[1]"
        :class="{ '!text-white': place === 1 }"
      >
        {{ item?.assignments_count?.completed }}/{{
          item?.assignments_count?.all
        }}
      </p>
    </div>
    <div>
      <p
        class="text-sm !leading-130 font-medium text-blue-900 relative z-[1]"
        :class="{ '!text-white': place === 1 }"
      >
        {{ item?.lessons_count?.completed }}/{{ item?.lessons_count?.all }}
      </p>
    </div>
    <div>
      <p
        class="text-sm !leading-130 font-medium text-blue-900 relative z-[1]"
        :class="{ '!text-white': place === 1 }"
      >
        {{ item?.modules_count }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPhoneNumber } from "@/utils";

interface Props {
  place: number;
  item: any;
}

defineProps<Props>();
</script>

<style scoped>
.green-linear {
  background: linear-gradient(152deg, #16cc53 -9.48%, #042d1c 109.8%);
  box-shadow: 0px 79px 169px 0px rgba(8, 10, 21, 0.07),
    0px 32.972px 59.255px 0px rgba(8, 10, 21, 0.07),
    0px 22.523px 38.674px 0px rgba(8, 10, 21, 0.07),
    0px 15.008px 30.773px 0px rgba(8, 10, 21, 0.06),
    0px 7.726px 21.239px 0px rgba(8, 10, 21, 0.04);
}
</style>
