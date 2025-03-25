<template>
  <div>
    <FCheckboxGroup
      v-model="values[index].answer"
      :items="answers"
      label-key="text"
      value-key="id"
      v-bind="{ answered }"
      :disabled="form.values[index].answer?.length >= count || answered"
    />
  </div>
</template>

<script setup lang="ts">
import { TForm } from "@/composables/useForm";
import FCheckboxGroup from "@/components/Form/Checkbox/FCheckboxGroup.vue";
import { IAnswer } from "@/modules/Assignments/types";
import { onMounted, ref } from "vue";

interface Props {
  answers: IAnswer[];
  form: TForm<any>;
  index: number;
  answered?: boolean;
  count?: number;
}

const props = defineProps<Props>();
const values = ref(props.form.values);

onMounted(() => {
  const selectedAnswers = props.answers.filter((item) => item?.is_selected);
  if (selectedAnswers?.length && !values.value[props.index].answer) {
    values.value[props.index].answer = selectedAnswers.map((item) => item.id);
  }
});
</script>
