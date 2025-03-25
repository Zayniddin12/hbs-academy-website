<template>
  <div class="flex flex-col gap-3">
    <FRadioGroup
      v-model="values[index].answer"
      :items="answers"
      label-key="text"
      value-key="id"
      v-bind="{ answered }"
      :disabled="answered"
    />
  </div>
</template>

<script setup lang="ts">
import FRadioGroup from "@/components/Form/Radio/FRadioGroup.vue";
import { onMounted, ref } from "vue";
import { TForm } from "@/composables/useForm";
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
  if (selectedAnswer?.is_selected && !values.value[props.index].answer) {
    values.value[props.index].answer = selectedAnswer.id;
  }
});
</script>
