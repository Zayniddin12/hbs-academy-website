<template>
  <div>
    <div class="mt-8 grid grid-cols-12 gap-6 container">
      <div class="col-span-8">
        <CTestWrapper
          :count="single?.questions?.length"
          v-bind="{ current, loading }"
          :is-submitted="single?.submitted"
          @next="handleNext"
          @back="handlePrev"
        >
          <div v-if="loading" class="flex flex-col space-y-4 mt-16">
            <PreLoader :loading="loading" height="48px" width="100%" />
            <PreLoader :loading="loading" height="48px" width="100%" />
            <PreLoader :loading="loading" height="48px" width="100%" />
            <PreLoader :loading="loading" height="48px" width="100%" />
          </div>

          <template v-if="!loading">
            <template
              v-for="(question, index) in single?.questions"
              :key="index"
            >
              <CQuestion
                v-if="current === index + 1"
                v-bind="{ question, index }"
                :form="useFormQuestions"
                :answered="single?.submitted"
              />
            </template>
          </template>
        </CTestWrapper>
      </div>
      <div class="col-span-4">
        <CTestSidebar
          v-bind="{
            questions: single?.questions,
            current,
            values: useFormQuestions?.values,
            done: single?.submitted,
          }"
          :answered="single?.submitted"
          :time="
            calculateTimeDifference(
              new Date(single?.test_started_at),
              single?.details?.allocated_time
            )
          "
          @map-change="handleMapChange"
        />
      </div>
    </div>
    <PFinishTestModal
      :finishing="finishing"
      :show="showModal"
      @close="showModal = false"
      @finish="finishQuestion"
    />
  </div>
</template>

<script setup lang="ts">
import CTestWrapper from "@/modules/Assignments/components/Test/CTestWrapper.vue";
import CTestSidebar from "@/modules/Assignments/components/Test/CTestSidebar.vue";
import { ref, watch } from "vue";
import CQuestion from "@/modules/Assignments/components/Test/CQuestion.vue";
import { useForm } from "@/composables/useForm";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { IQuestion, ITestSingle } from "@/modules/Assignments/types";
import { useHandleError } from "@/composables/useErrorHandling";
import { useI18n } from "vue-i18n";
import PFinishTestModal from "@/modules/Assignments/pages/PFinishTestModal.vue";
import PreLoader from "@/components/Common/PreLoader.vue";
import { useCustomToast } from "@/composables/useCustomToast";

const router = useRouter();
const route = useRoute();
const { handleError } = useHandleError();
const { t } = useI18n();

const current = ref(1);
const loading = ref(false);
const finishing = ref(false);
const notStartedTest = ref(false);
const single = ref<ITestSingle>();
const showModal = ref(false);
const { showToast } = useCustomToast();

const useFormQuestions = useForm({}, {});

function handleMapChange(newCurrent) {
  if (navigator.onLine) {
    current.value = newCurrent;
  } else {
    showToast(t("offline_warning"), "error");
    return null;
  }
}

function getSingle() {
  ApiService.post(`/assignment/EnterTest/${route.params.id}/`)
    .then((res) => {
      single.value = res?.data;
      useFormQuestions.values = res?.data?.questions?.map(
        (item: any, index: number) => {
          return {
            ...item,
            answer:
              item.details?.answer_type === "single_answer"
                ? assignSingleAnswer(item, index)
                : item.details?.answer_type === "multiple_answer"
                ? assignMultipleAnswer(item, index)
                : "",
          };
        }
      );
    })
    .catch(({ response }) => {
      notStartedTest.value = true;
      router.push({
        name: "AssignmentSingle",
        params: { id: route.params.id },
      });
      handleError(response);
    });
}

function assignSingleAnswer(data, index) {
  const selectedAnswer = data?.answers.find((item) => item?.is_selected);
  if (selectedAnswer?.is_selected) {
    return selectedAnswer.id;
  }
}

function assignMultipleAnswer(data, index) {
  const selectedAnswers = data?.answers.filter((item) => item?.is_selected);
  if (selectedAnswers?.length) {
    return selectedAnswers.map((item) => item.id);
  }
}

async function getSingleAnswers() {
  loading.value = true;
  try {
    const res = await ApiService.get(
      `/assignment/AssignmentDetail/${route.params.id}`
    );
    if (res?.data?.submitted) {
      single.value = {
        ...res?.data,
        questions: res?.data?.answer_questions,
      };
      useFormQuestions.values = res?.data?.answer_questions?.map((item) => ({
        ...item,
        answer: "",
      }));
    } else {
      await getSingle();
    }
  } catch (error) {
    handleError(error?.response);
  } finally {
    loading.value = false;
  }
}

getSingleAnswers();

function handleNext() {
  if (navigator.onLine) {
    const index = Object.values(useFormQuestions.values)?.findIndex(
      (item: any) => !item?.answer
    );

    if (single?.value?.submitted) {
      if (current.value < single.value?.questions.length) {
        current.value++;
      } else {
        router.push({
          name: "AssignmentSingle",
          params: { id: route.params.id },
        });
      }
    } else {
      if (current.value < single.value?.questions.length) {
        answerQuestion(current.value - 1);
      } else if (index > 0) {
        current.value = index + 1;
      } else {
        answerQuestion(useFormQuestions.values.length - 1).then(() => {
          // finishQuestion();
          // showModal.value = true;
          // if (
          //   single.value?.questions.length === current.value &&
          //   single.value?.questions[single.value?.questions.length - 1]
          //     .is_answered
          // ) {
          showModal.value = true;
          // }
        });
      }
    }
  } else {
    showToast(t("offline_warning"), "error");
    return null;
  }
}

function handlePrev() {
  if (navigator.onLine) {
    if (current.value > 1) {
      current.value--;
    } else {
      router.push(`/assignments/${route.params.id}`);
    }
  } else {
    showToast(t("offline_warning"), "error");
    return null;
  }
}

function answerQuestion(index: number) {
  const questionAnswer = useFormQuestions.values[index] as IQuestion;
  const data = {
    answers: "",
  } as { answers: string | number | any[] };

  if (questionAnswer.details?.answer_type === "single_answer") {
    data.answers = [questionAnswer.answer];
  } else if (questionAnswer.details?.answer_type === "multiple_answer") {
    data.answers = questionAnswer.answer;
  } else {
    data.answers = questionAnswer.answer?.map((el) => el?.id);
  }

  if (
    data.answers?.length !==
    single.value?.questions[index]?.details?.required_answers_count
  ) {
    showToast(
      t("min_selection", {
        count: single.value?.questions[index]?.details?.required_answers_count,
      }),
      "error"
    );

    return;
  }

  // Check if the user is online before making the API call
  return data.answers?.filter((dd) => dd)?.length > 0
    ? ApiService.put(
        `/assignment/SubmitTestAnswer/${questionAnswer?.id}/`,
        data
      )
        .then(() => {
          useFormQuestions.values[index]["is_answered"] = true;
          if (single.value?.questions.length !== current.value) {
            current.value++;
          }
        })
        .catch(({ response }) => {
          handleError(response);
          if (response?.data?.at(0)?.error?.message?.includes("is finished")) {
            router.push({
              name: "AssignmentSingle",
              params: { id: route.params.id },
            });
          }
        })
    : null;
}
async function finishQuestion() {
  finishing.value = true;

  try {
    const submitPromises = Object.keys(useFormQuestions.values).map(
      (_, index: number) => {
        const questionAnswer = useFormQuestions.values[index] as IQuestion;
        if (
          !questionAnswer.is_answered &&
          questionAnswer.answer &&
          questionAnswer.answer.length !== 0
        ) {
          return answerQuestion(index);
        }
        return Promise.resolve();
      }
    );

    await Promise.all(submitPromises);

    await ApiService.put(`/assignment/FinishTest/${route.params.id}/`);
    router.push({
      name: "AssignmentSingle",
      params: { id: route.params.id },
    });
  } catch ({ response }) {
    handleError(response);
  } finally {
    finishing.value = false;
  }
}

function calculateTimeDifference(startDate: Date, allocatedMinutes: number) {
  if (startDate) {
    const endTime = new Date(startDate.getTime()); // 1 minute = 60000 milliseconds
    endTime.setMinutes(endTime.getMinutes() + allocatedMinutes);

    const currentTime = new Date();

    const remainingTime = endTime.getTime() - currentTime.getTime();
    return remainingTime / 1000;
  } else {
    return 0;
  }
}

// onBeforeRouteLeave(() => {
//   ApiService.get(`/assignment/AssignmentDetail/${route.params.id}`).then(
//     (res) => {
//       if (!res?.data?.submitted && !notStartedTest.value) {
//         if (route.params.id) {
//           router.push("/test/" + route.params.id);
//         } else {
//           router.go(0);
//         }
//       }
//     }
//   );
// });

onBeforeRouteLeave((to, from, next) => {
  ApiService.get(`/assignment/AssignmentDetail/${route.params.id}`)
    .then((res) => {
      if (res?.data?.submitted) {
        next();
      } else {
        showModal.value = true;
      }
    })
    .catch(() => {
      next(false);
    });
});
</script>
