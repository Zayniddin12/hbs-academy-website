<template>
  <div class="flex flex-col gap-3">
    <FRadioGroupImage
      v-model="values[index].answer"
      :items="answers"
      label-key="title"
      value-key="id"
      v-bind="{ answered }"
      :disabled="answered"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TForm } from "@/composables/useForm";
import FRadioGroupImage from "@/components/Form/Radio/FRadioGroupImage.vue";
import { IAnswer } from "@/modules/Assignments/types";

interface Props {
  answers: IAnswer[];
  form: TForm<any>;
  index: number;
  answered?: boolean;
}

const props = defineProps<Props>();
const values = ref(props.form.values);

onMounted(() => {
  const selectedAnswer = props.answers.find((item) => item?.is_selected);
  if (selectedAnswer && !values.value[props.index].answer) {
    values.value[props.index].answer = selectedAnswer.id;
  }
});
</script>
