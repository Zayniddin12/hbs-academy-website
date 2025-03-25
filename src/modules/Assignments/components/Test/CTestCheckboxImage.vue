<template>
  <div class="flex flex-col gap-3">
    <FCheckboxGroupImages
      v-model="values[index].answer"
      :items="answers"
      label-key="title"
      value-key="id"
      v-bind="{ answered }"
      @update:model-value="($event) => (values[index].answer = $event)"
      :disabled="form.values[index].answer?.length >= count || answered"
    />
  </div>
</template>

<script setup lang="ts">
import { TForm } from "@/composables/useForm";
import FCheckboxGroupImages from "@/components/Form/Checkbox/FCheckboxGroupImages.vue";
import { onMounted, ref } from "vue";
import { IQuestion } from "@/modules/Assignments/types";

interface Props {
  answers: IQuestion[];
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
