<template>
  <div class="flex gap-2 py-3">
    <CAvatar class="!w-8 !h-8" :image="comment?.user?.avatar" />
    <div>
      <div class="flex-y-center gap-1">
        <p class="text-sm leading-130 text-dark font-semibold">
          {{ comment?.user?.name }}
        </p>
        <p class="text-xs leading-130 font-medium text-gray">
          {{ dayjs(comment?.created_at).format("DD.MM.YYYY, HH:mm") }}
        </p>
      </div>
      <p class="mt-1 text-2xs leading-130 font-normal text-dark">
        {{ comment?.body }}
      </p>
      <div class="flex-y-center gap-3">
        <button
          v-if="comment?.replies?.length"
          class="flex-y-center gap-1 group"
          @click="openComments = !openComments"
        >
          <p
            class="text-xs leading-130 text-primary font-medium group-hover:text-dark transition-300"
          >
            {{
              openComments
                ? $t("hide_comments")
                : $t("replies_count", { count: comment?.replies?.length })
            }}
          </p>
          <i
            class="icon-chevron-bold text-base text-primary group-hover:text-dark transition-300"
            :class="{ 'rotate-180': openComments }"
          />
        </button>
        <button
          class="flex-y-center gap-1 group"
          @click="openReply = !openReply"
        >
          <i
            class="icon-reply text-base text-gray group-hover:text-primary transition-300"
            :class="{ 'text-primary': openReply }"
          />
          <p
            class="text-xs leading-130 text-gray font-medium group-hover:text-primary transition-300"
            :class="{ 'text-primary': openReply }"
          >
            {{ $t("reply") }}
          </p>
        </button>
      </div>

      <CollapseTransition>
        <div v-if="openReply" class="w-full flex-y-center gap-2 pt-3">
          <CAvatar class="!w-8 !h-8" :image="comment?.user?.avatar" />
          <FInput
            v-model="form.values.text"
            class="w-full"
            :placeholder="$t('enter_your_comment')"
            :error="form.$v.value.text.$error"
            @keydown.enter="onSubmit"
          />
          <button
            class="w-10 h-10 flex-center bg-secondary rounded-lg shrink-0 group transition-300 active:scale-95"
            @click="openReply = false"
          >
            <i
              class="icon-close text-2xl text-gray-100 group-hover:text-red transition-300"
            />
          </button>
        </div>
      </CollapseTransition>

      <CollapseTransition>
        <div v-if="openComments">
          <CCommentReply
            v-for="(item, index) in comment?.replies"
            :comment="item"
            :key="index"
          />
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import CAvatar from "@/components/CAvatar.vue";
import dayjs from "dayjs";
import FInput from "@/components/Form/Input/FInput.vue";
import { ref, watch } from "vue";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import CCommentReply from "@/modules/Courses/components/CCommentReply.vue";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";

interface Props {
  comment: {
    id: number;
    user: {
      id: number;
      name: string;
      avatar: string;
      is_verified: boolean;
    };
    created_at: string;
    body: string;
    replies: {
      id: number;
      user: {
        id: number;
        name: string;
        avatar: string;
        is_verified: boolean;
      };
      created_at: string;
      body: string;
    }[];
  };
}

defineProps<Props>();

const openReply = ref(false);
const openComments = ref(false);
const loading = ref(false);

const form = useForm(
  {
    text: "",
  },
  {
    text: {
      required,
    },
  }
);

function onSubmit() {
  loading.value = true;
  form.$v.value.$touch();
}

watch(
  () => openReply.value,
  () => {
    form.values.text = "";
    form.$v.value.$reset();
  }
);
</script>

<style scoped></style>
