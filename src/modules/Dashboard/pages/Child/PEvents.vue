<template>
  <div>
    <CTitle :title="$t('events')" />
    <div class="flex-y-center gap-2 my-4">
      <button
        v-for="(option, index) in filterOptions"
        :key="index"
        class="py-2 px-4 rounded-full border border-transparent hover:border-green transition-300 bg-white"
        :class="{ '!border-green': active === option?.value }"
        @click="chooseActive(option.value)"
      >
        <p class="text-sm leading-5 font-medium text-dark">
          {{ option.label }}
        </p>
      </button>
    </div>
    <div class="p-5 bg-white mt-4 rounded-2xl flex flex-col gap-4">
      <Transition name="fade" mode="out-in">
        <div :key="loading" class="bg-white p-4 rounded-2xl grid gap-4">
          <template v-if="loading">
            <EventCardShimmer v-for="index in 4" :key="index" loading />
          </template>
          <template v-if="!loading && events?.length">
            <EventCard
              v-for="(event, index) in events"
              :key="index"
              v-bind="{ event }"
              @click="handleShowEvent(event?.id)"
            />
          </template>
          <EmptyEvents v-if="!loading && events?.length <= 0" />
        </div>
      </Transition>
      <div
        v-if="paginationData?.total > events?.length && !loading"
        ref="target"
      />
    </div>
    <EventInfoModal
      :show="showEventModal"
      :event="event"
      @close="showEventModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ApiService from "@/services/ApiService";
import EventCard from "@/modules/Dashboard/components/Events/EventCard.vue";
import EventCardShimmer from "@/modules/Dashboard/components/Events/EventCardShimmer.vue";
import EmptyEvents from "@/modules/Dashboard/components/Events/EmptyEvents.vue";
import CTitle from "@/components/Common/CTitle.vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import EventInfoModal from "@/modules/Dashboard/components/Events/EventInfoModal.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const target = ref(null);

const active = ref(route.query?.event ?? "");
const loading = ref(true);
const events = ref([]);
const event = ref(null);
const showEventModal = ref(false);

const paginationData = ref({
  page: 1,
  total: 0,
  page_size: 10,
});

const filterOptions = computed(() => [
  { label: t("all"), value: "" },
  { label: t("pending"), value: "pending" },
  { label: t("canceled"), value: "canceled" },
  { label: t("completed"), value: "completed" },
  { label: t("on_going"), value: "on_going" },
]);

function handleShowEvent(eventID: string) {
  getEventSingle(eventID);
}

function chooseActive(value: string) {
  active.value = value;
  router.push({ query: { event: value } });
  getEvents();
}

function getEventSingle(eventID: string) {
  ApiService.get(`/study/Events/${eventID}`).then((res) => {
    event.value = res?.data;
    if (event.value) {
      showEventModal.value = true;
    }
  });
}
function getEvents(merge?: boolean) {
  if (!merge) {
    loading.value = true;
  }
  ApiService.query("/study/Events", {
    params: {
      page: paginationData.value.page,
      page_size: paginationData.value.page_size,
      event__status: active.value ?? undefined,
    },
  })
    .then((res: any) => {
      paginationData.value.total = res?.data?.count;
      if (merge) {
        res?.data?.results.forEach((el: any) => {
          events.value.push(el);
        });
      } else {
        events.value = res?.data?.results;
      }
    })
    .finally(() => (loading.value = false));
}

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    paginationData.value.page++;
    getEvents(true);
  }
});

onMounted(() => {
  getEvents();
});
</script>

<style scoped></style>
