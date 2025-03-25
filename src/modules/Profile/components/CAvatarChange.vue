<template>
  <div class="flex-center flex-col">
    <input
      id="file-avatar"
      type="file"
      class="w-0 h-0"
      accept=".jpg, .png, .jpeg, .svg"
      @change="handleChange"
    />
    <CAvatar v-bind="{ image }" class="w-[80px] h-[80px]" />
    <div class="flex-y-center gap-2 mt-4">
      <button
        class="min-w-[100px] px-4 py-1 rounded-full text-xs leading-130 font-medium text-dark bg-secondary hover:bg-white-100 transition-300 border border-[#C8CFD6]"
        @click="getFile"
      >
        {{ $t("change") }}
      </button>
      <button
        v-if="image"
        class="min-w-[100px] px-4 py-1 rounded-full text-xs leading-130 font-medium text-red-200 bg-red-200/[8%] hover:bg-red-200 hover:text-white transition-300 border border-red-200/[24%]"
        @click="removeImage"
      >
        {{ $t("delete") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CAvatar from "@/components/CAvatar.vue";
import { ref } from "vue";
import ApiService from "@/services/ApiService";
import { useCustomToast } from "@/composables/useCustomToast";
import { useI18n } from "vue-i18n";

const { showToast } = useCustomToast();
const { t } = useI18n();

interface Props {
  defaultImage?: string;
}

const props = defineProps<Props>();

const image = ref<any>(props.defaultImage);

const emit = defineEmits(["change", "delete"]);

function handleChange(event: any) {
  const target = event?.target as HTMLInputElement | null;
  const file = target?.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("file_type", file?.type?.includes("image") ? "image" : "");
  ApiService.post("/common/MediaUpload/", formData)
    .then((res: any) => {
      emit("change", res?.data?.id);
      emit("delete", false);
    })
    .catch(() => {
      image.value = "";
      emit("delete", true);
      showToast(t("image_load_error"), "error");
    });

  reader.onload = () => {
    image.value = reader.result;
  };
}

const getFile = () => {
  const input = document.getElementById("file-avatar");
  input?.click();
};

function removeImage() {
  emit("delete", true);
  image.value = "";
}
</script>
