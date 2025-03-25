<template>

  <RouterLink
      :to="{ name: 'LessonSingle', params: { id: lesson?.id } }"
    class="p-4 rounded-xl border border-secondary flex items-end justify-between hover:border-gray-200 hover:bg-[#F7F9FA] transition-300"
  >
    <div class="flex gap-3">
      <div
        class="w-[110px] h-[72px] rounded-lg relative overflow-hidden before:rounded-lg before:absolute before:inset-0 before:border before:border-[rgba(255, 255, 255, 0.12)] shrink-0"
      >
        <img
          :src="lesson?.details?.preview"
          class="w-full h-full object-cover"
          alt="lesson"
        />
        <div class="w-full h-full absolute inset-0 bg-dark/50 flex-center">
          <button
            class="flex-center w-8 h-8 rounded-full bg-white/[22%] backdrop-blur-[15px]"
          >
            <i class="icon-player text-white" />
          </button>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-3 h-auto">
        <p

          class="text-base leading-130 text-dark font-semibold"
        >
          {{ lesson?.details?.title }}
        </p>
        <div class="flex-y-center gap-1">
          <p
            class="text-xs leading-130 text-gray-100 px-2 py-1 border border-secondary rounded-full bg-white-100"
          >
            {{ lesson?.course_title }}
          </p>
          <p
            class="text-xs leading-130 text-gray-100 px-2 py-1 border border-secondary rounded-full bg-white-100"
          >
            {{ lesson?.module_title }}
          </p>
        </div>
      </div>
    </div>

    <CSaveButton
      :saved="isSaved ?? false"
      @click.prevent="removeToFavorite(!isSaved)"
    />
  </RouterLink>
</template>

<script setup lang="ts">
import CSaveButton from "@/components/Common/CSaveButton.vue";
import { ref } from "vue";
import { ISavedLesson } from "@/types/common";
import ApiService from "@/services/ApiService";
import { useHandleError } from "@/composables/useErrorHandling";
import { useCustomToast } from "@/composables/useCustomToast";
import { useI18n } from "vue-i18n";

interface Props {
  lesson: ISavedLesson;
}

const props = defineProps<Props>();
const emit = defineEmits(["clickBookmark"]);
const { t } = useI18n();
const { handleError } = useHandleError();
const { showToast } = useCustomToast();
const isSaved = ref(props.lesson?.is_saved);

function removeToFavorite(val: boolean) {
  const data = {
    is_saved: val,
  };
  ApiService.put(`/study/FavoriteLessonUpdate/${props.lesson?.id}/`, data)
    .then((res) => {
      if (res?.data?.is_saved) {
        showToast(t("added_to_favorite"), "success");
      } else {
        showToast(t("removed_from_favorite"), "success");
      }
      emit("clickBookmark");
    })
    .catch(({ response }) => {
      handleError(response);
    });
}
</script>
