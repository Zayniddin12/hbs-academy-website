<template>
  <div class="bg-white min-h-[calc(100vh-84px)] pb-10">
    <div class="container">
      <CBreadcrumb v-bind="{ routes }" class="py-4" />
      <div class="grid grid-cols-12 gap-6 pt-8">
        <div class="col-span-8">
          <CInfoAssignment
            :title="single?.details?.title"
            :description="single?.details?.description"
          />
          <CDeadlineStatus
            :deadline="single?.end_date"
            :is-submitted="single?.submitted"
            :date="single?.submitted_at"
          />
          <div class="grid grid-cols-4 my-3 gap-3">
            <CIconInfoCard
              v-for="(card, index) in single?.details?.type === 'test'
                ? testCards
                : infoCards"
              :key="index"
              v-bind="{ card }"
            />

            <CIconInfoCard
              v-if="single?.is_rejected"
              :card="{
                icon: 'icon-star text-red',
                title: $t('assignment_status'),
                value: $t('rejected'),
              }"
            />
          </div>

          <div v-if="single?.is_rejected" class="my-4">
            <CTitle
              :title="$t('rejected_reason')"
              class="text-base font-semibold"
            />

            <p class="text-sm leading-130 font-normal text-dark mt-2">
              {{ single?.rejection_reason }}
            </p>
          </div>

          <div
            v-if="
              single?.details?.type === 'test' &&
              single?.submitted &&
              single?.details?.type === 'test' &&
              calculateDeadline(single?.end_date) >= 0
            "
          >
            <CTitle
              :title="$t('test_result')"
              class="text-base font-semibold"
            />
            <div class="grid grid-cols-4 my-3 gap-3">
              <CIconInfoCard
                v-for="(card, index) in testResults"
                :key="index"
                v-bind="{ card }"
              />
            </div>
          </div>
          <div
            v-if="
              single?.details?.type !== 'test' && single?.details?.files?.length
            "
            class="my-5"
          >
            <CTitle
              class="text-base font-semibold"
              :title="$t('additional_files_for_assignment')"
            />
            <div class="grid grid-cols-2 gap-3 mt-3">
              <CFile
                v-for="(file, index) in single?.details?.files"
                :key="index"
                :file="{ ...file, file_size: file?.size }"
              />
            </div>
          </div>
          <!--          v-if="-->
          <!--          single?.details?.type === 'test' &&-->
          <!--          calculateDeadline(single?.end_date) > 0 && !single?.submitted-->
          <!--          "-->
          <div
            v-if="!single?.submitted && single?.details?.type === 'test'"
            class="p-3 rounded-xl bg-green-200 mb-5"
          >
            <div class="flex-y-center gap-1">
              <i class="icon-info text-xl text-primary" />
              <p class="text-base leading-130 font-semibold text-dark">
                {{ $t("read_before_start") }}
              </p>
            </div>
            <p class="mt-2 text-sm leading-130 font-normal text-dark">
              {{
                $t("read_before_start_text", {
                  time: single?.details?.allocated_time,
                })
              }}
            </p>
          </div>

          <div
            v-if="
              (single?.details?.type === 'test' && single?.submitted_at) ||
              (single?.details?.type === 'test' &&
                calculateDeadline(single?.end_date) >= 0)
            "
          >
            <CTitle :title="$t('questions')" />

            <div class="grid grid-cols-2 gap-3 mt-3">
              <!--              <CTestResult-->
              <!--                v-for="(answer, index) in single?.answer_questions"-->
              <!--                :key="index"-->
              <!--                v-bind="{ answer }"-->
              <!--                :order="index"-->
              <!--              />-->
            </div>
          </div>

          <CollapseTransition>
            <div
              class="pt-5 border-t border-secondary pb-3 flex flex-col gap-5"
              v-if="isFilling"
            >
              <div
                v-if="
                  single?.details?.type === 'writing' ||
                  single?.details?.type === 'writing_and_file'
                "
              >
                <CTitle
                  class="text-base font-semibold"
                  :title="$t('text_answer')"
                />
                <FTextarea
                  :placeholder="$t('enter_your_answer')"
                  v-model="form.values.text"
                  :error="form.$v.value.text.$error"
                  class="mt-3"
                  textarea-class="min-h-[120px]"
                  maxlength="1000"
                />
              </div>
              <div
                v-if="
                  single?.details?.type === 'file' ||
                  single?.details?.type === 'writing_and_file'
                "
              >
                <CTitle
                  class="text-base font-semibold"
                  :title="$t('hand_over_files')"
                />
                <ImageUploader
                  class="mt-3"
                  :default-images="form.values.files"
                  :error="form.$v.value.files.$error"
                  @change="form.values.files = $event"
                />
              </div>
            </div>
          </CollapseTransition>
          <CollapseTransition>
            <div v-if="!isFilling && single?.submitted" class="pb-5">
              <div
                v-if="
                  single?.details?.type === 'writing' ||
                  single?.details?.type === 'writing_and_file'
                "
                class="flex flex-col gap-2"
              >
                <CTitle
                  class="text-base font-semibold"
                  :title="$t('text_answer')"
                />
                <p
                  class="text-sm leading-130 font-normal text-dark mb-5 break-words"
                >
                  {{ single?.answer_text }}
                </p>
              </div>
              <div
                v-if="
                  single?.details?.type === 'file' ||
                  single?.details?.type === 'writing_and_file'
                "
                class="flex flex-col gap-2"
              >
                <CTitle
                  class="text-base font-semibold"
                  :title="$t('submitted_file')"
                />
                <div class="grid grid-cols-2 gap-3">
                  <CFile
                    v-for="(file, index) in form.values.files"
                    :file="file"
                    :key="index"
                  />
                </div>
              </div>
            </div>
          </CollapseTransition>

          <RouterLink
            :to="{ name: 'Test', params: { id: single?.id } }"
            v-if="
              single?.details?.type === 'test' &&
              single?.submitted &&
              single?.details?.type === 'test' &&
              calculateDeadline(single?.end_date) >= 0
            "
          >
            <CButton class="mt-5" :text="$t('see_test_result')" />
          </RouterLink>
          <Transition
            name="fade"
            mode="out-in"
            v-if="calculateDeadline(single?.end_date) > 0"
          >

            <div :key="isFilling">
              <div v-if="!isFilling" class="flex-y-center gap-3">
                <!--                <CButton class="!h-11 flex-center" />-->
                <CButton
                  v-if="
                    !single?.submitted_at && single?.is_within_date_range && single?.details?.type !== 'test'
                  "
                  :text="$t('submit_the_assignment')"
                  icon="icon-file-plus text-2xl"
                  class="h-11 flex-center"
                  @click="isFilling = true"
                />
                <CButton
                  v-if="
                    single?.submitted_at && single?.details?.type !== 'test'
                  "
                  :text="$t('edit')"
                  variant="secondary"
                  icon="icon-pen-edit text-lg"
                  class="h-11 flex-center"
                  @click="isFilling = true"
                />
                <RouterLink
                  v-if="
                    single?.details?.type === 'test' && single?.is_within_date_range && !single?.submitted_at
                  "
                  :to="{ name: 'Test', params: { id: $route.params?.id } }"
                >
                  <CButton class="h-11" :text="$t('start_test')" />
                </RouterLink>
              </div>
              <div v-if="isFilling" class="flex-y-center gap-3">
                <CButton
                  :text="$t('save')"
                  class="h-11 flex-center"
                  @click="submit"
                />
                <CButton
                  :text="$t('cancel')"
                  class="h-11 flex-center"
                  variant="secondary"
                  @click="isFilling = false"
                />
              </div>
            </div>
          </Transition>
        </div>
        <div class="col-span-4">
          <div class="mb-5">
            <p class="text-sm leading-130 font-medium text-gray">
              {{ $t("module_name") }}
            </p>
            <p class="text-xl leading-130 font-bold text-dark mt-1">
              {{ single?.module?.title }}
            </p>
          </div>
          <CLessonSidebar v-bind="{ lessons, assignments }" assignments-open />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";

import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useI18n } from "vue-i18n";
import CLessonSidebar from "@/modules/Courses/components/CLessonSidebar.vue";
import CInfoAssignment from "@/modules/Assignments/components/CInfoAssignment.vue";
import CTitle from "@/components/Common/CTitle.vue";
import CFile from "@/components/Common/CFile.vue";
import CIconInfoCard from "@/modules/Assignments/components/CIconInfoCard.vue";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import CButton from "@/components/Common/CButton.vue";
import ImageUploader from "@/components/Form/Uploader/ImageUploader.vue";
import { useForm } from "@/composables/useForm";
import { requiredIf } from "@vuelidate/validators";
import FTextarea from "@/components/Form/FTextarea.vue";
import CDeadlineStatus from "@/modules/Assignments/components/CDeadlineStatus.vue";
import { calculateDeadline } from "@/utils";
import CTestResult from "@/modules/Assignments/components/Test/CTestResult.vue";
import ApiService from "@/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { IAssignmentSingle } from "@/types/common";
import { useCustomToast } from "@/composables/useCustomToast";
import { useHandleError } from "@/composables/useErrorHandling";

const { t } = useI18n();
const { showToast } = useCustomToast();
const route = useRoute();
const router = useRouter();
const { handleError } = useHandleError();

const isFilling = ref(false);
const assignments = ref([]);
const lessons = ref([]);
const single = ref<IAssignmentSingle>();

function getSingle() {
  if (!route.params.id) return;
  ApiService.get(`/assignment/AssignmentDetail/${route.params.id}`).then(
    (res) => {
      single.value = res?.data;
      form.values.text = res?.data?.answer_text;
      form.values.files = res?.data?.answer_files.map((el: any) => {
        return {
          ...el,
          name: el.file_name,
          file_size: el.size,
        };
      });
      getLessons(res?.data?.module?.id);
      getAssignments(res?.data?.module?.id);
    }
  );
}

function getLessons(id: number) {
  ApiService.get(`/study/Modules/${id}/Lessons`).then((res: any) => {
    lessons.value = res?.data?.results;
  });
}

function getAssignments(id: number) {
  ApiService.get(`/assignment/ModuleAssignments/${id}`).then((res: any) => {
    assignments.value = res?.data;
  });
}

getSingle();

const form = useForm(
  {
    files: [],
    text: "",
  },
  {
    files: {
      requiredIf: requiredIf(
        () =>
          single.value?.details?.type === "file" ||
          single.value?.details?.type === "writing_and_file"
      ),
    },
    text: {
      requiredIf: requiredIf(
        () =>
          single.value?.details?.type === "writing" ||
          single.value?.details?.type === "writing_and_file"
      ),
    },
  }
);

function submit() {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    submitWriting();
  }
}

function submitWriting() {
  let data = {
    text: form.values.text,
    files: form.values.files.map((el: any) => el?.id),
  };

  if (!data?.text) {
    delete data.text;
  }

  if (!data?.files.length) {
    delete data.files;
  }

  ApiService.put(
    `/assignment/SubmitAssignmentAnswer/${route.params?.id}/`,
    data
  )
    .then(() => {
      if (single?.value?.submitted) {
        showToast(t("successfully_edited"), "success");
      } else {
        showToast(t("successfully_submitted"), "success");
      }
      isFilling.value = false;
      getSingle();
    })
    .catch(({ response }) => {
      handleError(response);
    });
}

watch(
  () => isFilling.value,
  () => {
    form.values.files = [];
    form.values.text = "";
    if (single.value?.submitted) {
      form.values.text = single.value?.answer_text;
      form.values.files = single.value?.answer_files.map((el: any) => {
        return {
          ...el,
          name: el.file_name,
          file_size: el.size,
        };
      });
    }
    form.$v.value.$reset();
  }
);

const test_spent_time = computed(() =>
  ((single.value?.test_spent_time ?? 0) / 60)?.toFixed(1)
);

const infoCards = computed(() => [
  {
    title: t("max_point"),
    value: Math.round(single?.value?.details?.ball),
    icon: "icon-star",
  },
  {
    title: t("deadline"),
    value: dayjs(single?.value?.end_date).format("DD.MM.YYYY"),
    icon: "icon-calendar-time",
  },
]);

const testCards = computed(() => [
  {
    title: t("max_point"),
    value: Math.round(single.value?.details?.ball),
    icon: "icon-star",
  },
  {
    title: t("questions_count"),
    value: single?.value?.details?.questions_count,
    icon: "icon-list",
  },
  {
    title: t("time_for_test"),
    value: t("minutes", { time: single.value?.details?.allocated_time }),
    icon: "icon-time",
  },
  {
    title: t("deadline"),
    value: single?.value?.end_date
      ? dayjs(single?.value?.end_date).format("DD.MM.YYYY, HH:mm")
      : "-",
    icon: "icon-calendar-time",
    isDeadline:
      calculateDeadline(single?.value?.end_date) <= 0 &&
      !single?.value?.submitted,
  },
]);

const testResults = computed(() => [
  {
    title: t("result"),
    value: Math.round(single?.value?.ball ?? 0),
    icon: "icon-star",
  },
  {
    title: t("answers_count"),
    value: `${single?.value?.answer_questions_correct_count ?? 0} / ${
      single?.value?.details?.questions_count ?? 0
    }`,
    icon: "icon-list",
  },
  {
    title: t("time_for_test_submit"),
    value: t("minutes", { time: test_spent_time.value }),
    icon: "icon-time",
  },
  {
    title: t("submitted_at"),
    value: single?.value?.submitted_at
      ? dayjs(single?.value?.submitted_at).format("DD.MM.YYYY, HH:mm")
      : "-",
    icon: "icon-calendar-time",
  },
]);

const routes = computed(() => [
  {
    name: t("home"),
    route: "/",
  },
  {
    name: single?.value?.details?.title,
    route: "/",
  },
]);

watch(
  () => route.params.id,
  () => {
    form.values.text = "";
    form.values.files = [];
    form.$v.value.$reset();
    getSingle();
  }
);
</script>
