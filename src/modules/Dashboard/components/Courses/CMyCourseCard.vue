<template>
  <RouterLink
    :to="
      loading ? '#' : { name: 'CourseSingle', params: { id: card?.id ?? 1 } }
    "
    class="p-5 rounded-2xl group block relative transition-all duration-700 cursor-pointer"
    :class="loading ? 'bg-white' : 'my-course-card'"
  >
    <CArrowIcon class="absolute -top-2 -right-3" />
    <div class="flex gap-5 relative">
      <CPreloader v-bind="{ loading }" width="240px" height="120px">
        <div
          class="icon-arrow absolute top-0 right-0 rotate-180 text-white text-2xl opacity-0 group-hover:opacity-100 transition-300"
        ></div>
        <div
          class="border border-white/20 rounded-xl relative overflow-hidden w-[197px] h-[120px] shrink-0"
        >
          <img
            :src="card?.details?.photo"
            alt="course-image"
            class="w-full h-full object-cover"
          />
        </div>
      </CPreloader>
      <div class="w-full">
        <CPreloader v-bind="{ loading }" width="440px" height="15px">
          <p class="text-xl leading-130 text-white font-bold h-[52px] block">
            {{ card?.details?.title }}
          </p>
        </CPreloader>
        <div class="mt-4 w-full">
          <CPreloader v-bind="{ loading }" width="240px" height="15px">
            <div
              class="w-full rounded-full h-3 bg-green-100 relative overflow-hidden"
            >
              <div
                class="h-3 rounded-full bg-green"
                :style="{ width: `${card?.finished_modules_percentage}%` }"
              />
            </div>
          </CPreloader>
          <CPreloader
            v-bind="{ loading }"
            width="40px"
            height="15px"
            class="mt-2"
          >
            <div class="flex-center-between mt-2">
              <p class="text-xs leading-130 text-white">
                <span class="font-bold"
                  >{{ card?.finished_modules_percentage }}%</span
                >
                {{ $t("finished") }}
              </p>
              <p class="text-xs leading-130 text-white font-medium">
                {{ card?.finished_modules_count }} /
                {{ card?.modules_count }}
              </p>
            </div>
          </CPreloader>
        </div>
      </div>
    </div>
    <div class="flex-center-between gap-3 mt-4">
      <div
        v-for="(item, i) in cards"
        :key="i"
        class="w-full p-3 bg-white/[12%] backdrop-blur-[7px] border border-white/[12%] rounded-xl"
      >
        <CPreloader v-bind="{ loading }" width="140px" height="15px">
          <div class="flex-y-center gap-1.5 mb-1.5">
            <i :class="item?.icon" class="text-2xl text-white" />
            <p class="text-xs leading-130 text-white/[64%]">
              {{ item?.title }}
            </p>
          </div>
        </CPreloader>
        <CPreloader
          v-bind="{ loading }"
          width="70px"
          height="15px"
          class="mt-2"
        >
          <p class="text-xs leading-130 text-white font-semibold">
            {{ item?.value }}
          </p>
        </CPreloader>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { ICourse } from "@/types/common";
import dayjs from "dayjs";
import CArrowIcon from "@/modules/Dashboard/components/Courses/CArrowIcon.vue";
import CPreloader from "@/components/CPreloader.vue";

interface Props {
  card: ICourse;
  loading?: boolean;
}

const props = defineProps<Props>();
const { t } = useI18n();

const cards = computed(() => [
  {
    title: t("duration"),
    value:
      dayjs(props.card?.flow?.start).format("DD.MM.YYYY") +
      " - " +
      dayjs(props.card?.flow?.end).format("DD.MM.YYYY"),
    icon: "icon-calendar-course",
  },
  {
    title: t("homeworks"),
    value: t("homeworks_count", { count: props.card?.assignments_count }),
    icon: "icon-home-course",
  },
  {
    title: t("modules"),
    value: t("modules_count", { count: props.card?.modules_count }),
    icon: "icon-modules",
  },
  {
    title: t("lessons"),
    value: t("lessons_count", { count: props.card?.lessons_count }),
    icon: "icon-video",
  },
]);
</script>

<style scoped>
.my-course-card {
  background-image: linear-gradient(151deg, #16cc53, #042d1c, #16cc53);
  background-size: 300% 100%;
  /*background: linear-gradient(151deg, #16cc53 -9.22%, #042d1c 100.3%);*/
  box-shadow: 0 2px 32px 0 rgba(8, 10, 21, 0.15);
}

.my-course-card:hover {
  background-position: 100% 0;
  box-shadow: 0 7.72601px 21.2393px 0 rgba(8, 10, 21, 0.04),
    0 15.00793px 30.77328px 0 rgba(8, 10, 21, 0.06),
    0 22.52302px 38.67398px 0 rgba(8, 10, 21, 0.07),
    0 32.97245px 59.25457px 0 rgba(8, 10, 21, 0.07),
    0 79px 169px 0 rgba(8, 10, 21, 0.07);
}
</style>
