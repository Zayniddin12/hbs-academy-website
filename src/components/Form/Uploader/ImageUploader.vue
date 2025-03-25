<template>
  <div
    class="h-full w-full"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
  >
    <input
      id="file"
      type="file"
      name="file"
      class="w-0 h-0 absolute"
      accept=".pdf, .doc, .docx, .rtf, .xls, .xlsx, .ppt, .pptx, .txt, .csv, .zip, .rar, .webp, .png, .jpg, .jpeg"
      multiple
      @change="handleFile"
    />
    <div
      class="w-full h-[142px] flex items-center justify-center flex-col rounded-lg transition-300 cursor-pointer px-6 py-11 border border-dashed border-secondary hover:border-primary"
      :class="[
        {
          '!border-red': error,
        },
      ]"
      @click="getFile('create')"
    >
      <slot>
        <div class="text-base flex items-center flex-col">
          <i class="icon-doc-filled text-primary text-[32px]"></i>
          <p class="mt-4 text-sm leading-130 font-medium text-dark">
            {{ $t("add_file_here") }}
          </p>
          <i18n-t
            keypath="choose_file"
            tag="p"
            class="mt-1 text-xs leading-130 font-normal text-gray"
          >
            <template #choose>
              <span
                class="text-primary font-semibold cursor-pointer hover:text-dark transition-300"
                @click="handleFile"
                >{{ $t("choose_text") }}</span
              >
            </template>
          </i18n-t>
        </div>
      </slot>
    </div>

    <div class="flex flex-col gap-3 mt-2" v-if="files.length">
      <div
        class="flex-center-between relative rounded-xl border border-secondary p-2 transition-300 cursor-pointer"
        v-for="(item, index) in files"
        :key="index"
      >
        <div class="flex-y-center gap-2">
          <div class="w-8 h-8 flex-center rounded-lg bg-green-200 shrink-0">
            <i class="icon-docs text-green text-2xl" />
          </div>
          <div>
            <a
              target="_blank"
              :href="item?.url?.file"
              :title="item?.url?.filename"
            >
              <p
                class="text-xs leading-130 transition-300 hover:text-primary text-dark font-medium"
              >
                {{ item?.name }}
              </p>
            </a>

            <p class="text-xs leading-130 font-normal text-gray">
              {{ convertBytes(item?.size) }}
            </p>
          </div>
        </div>
        <i
          class="icon-close text-xl text-gray hover:text-red transition-300 cursor-pointer"
          @click="removeImage(index)"
        />
      </div>
    </div>

    <BlockPreloader
      :loading="uploading"
      class="!w-full mt-3 opacity-50 !rounded-xl"
      height="50px"
    />
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { convertBytes } from "@/utils";
import ApiService from "@/services/ApiService";
import { useHandleError } from "@/composables/useErrorHandling";
import BlockPreloader from "@/components/Form/Uploader/BlockPreloader.vue";

const emit = defineEmits(["change"]);

const { handleError } = useHandleError();

interface Props {
  error?: boolean;
  defaultImages?: string[];
}

type image = {
  id: string;
  url: string;
  name: string;
  file: File;
  size: number;
  type: string;
};
const props = defineProps<Props>();
const files = reactive<image[]>([]);
const uploadType = ref("");
const currentTarget = ref(null);
const uploading = ref(false);
const uploadsInProgress = ref(0);

onMounted(() => {
  if (props.defaultImages) {
    props.defaultImages?.forEach((item: any) => {
      files.push({
        id: item?.id,
        url: item,
        name: item?.name,
        file: item,
        type: "image",
        size: item?.size,
      });
    });
  }
});

const handleFile = async (event: Event) => {
  const target = event?.target as HTMLInputElement | null;
  if (target?.files === null) {
    return;
  }
  if (target?.files?.length) {
    uploading.value = true; // Set uploading to true when files are being processed
    uploadsInProgress.value = target.files.length;
    for (let key in target?.files) {
      handleUploader(key, target);
    }
  }
  send();
};
const handleUploader = (el: string | number, target: any) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(target?.files[el]);
    reader.onerror = (error) => reject(error);
  })
    .then((res) => {
      const formData = new FormData();
      formData.append("file", target?.files[el]);
      formData.append("file_type", "doc");

      //Do not touch this, or else You will find yourself DEAD!!!
      if (uploadType.value === "create") {
        ApiService.post("/common/MediaUpload/", formData)
          .then((response: any) => {
            files.push({
              id: response?.data?.id,
              url: res as string,
              name: target?.files[el].name,
              file: target?.files[el],
              size: target?.files[el].size,
              type: "image",
            });
          })
          .catch(({ response }) => {
            handleError(response);
          })
          .finally(() => {
            uploadsInProgress.value -= 1; // Decrease the count after each upload

            // Set uploading to false when all uploads are complete
            if (uploadsInProgress.value === 0) {
              uploading.value = false;
            }
          });
      }
    })
    .catch(() => {
      // Todo: Toast show
    });
};
const getFile = (type: string) => {
  uploadType.value = type;
  const input = document.getElementById("file");
  input?.click();
};
const removeImage = (index: number) => {
  files.splice(index, 1);
  send();
};

function send() {
  emit("change", files);
}

const dragging = ref(false);

const handleDragOver = (event: Event) => {
  handleFile(event);
  event.preventDefault();
};

const handleDragEnter = (e) => {
  dragging.value = true;
  currentTarget.value = e?.target;
};

const handleDragLeave = (e) => {
  if (e?.target === currentTarget.value) {
    currentTarget.value = null;
    dragging.value = false;
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  const eventTarget = {
    target: {
      files: event.dataTransfer?.files,
    },
  } as any;
  uploadType.value = "create";
  handleFile(eventTarget);
};
</script>
