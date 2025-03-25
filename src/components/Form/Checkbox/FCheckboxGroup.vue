<template>
  <slot>
    <div v-if="items && Object.keys(items).length > 0" :class="wrapperClass">
      <FCheckbox
        class="w-full flex-row-reverse justify-between bg-white-100 p-2 pr-3 rounded-xl h-12"
        v-for="(item, index) in items"
        :checked="modelValue?.includes(item[valueKey])"
        :key="index"
        :label="item[labelKey]"
        :value="item[valueKey]"
        :disabled="disabled ? !modelValue?.includes(item[valueKey]) : answered"
        :name="name"
        :class="[
          { 'pointer-events-none': answered },
          {
            '!bg-white !border-primary border':
              modelValue?.includes(item[valueKey]) && !answered,
          },
          {
            '!bg-white !border-primary border':
              answered &&
              modelValue?.includes(item[valueKey]) &&
              item?.is_correct &&
              item?.is_selected,
          },
          {
            '!bg-white !border-red-200 border':
              answered &&
              modelValue?.includes(item[valueKey]) &&
              !item?.is_correct,
          },
          {
            'pointer-events-none': answered,
          },
        ]"
        @change="onChange($event, item[valueKey])"
      >
        <template #label>
          <div class="flex-y-center gap-3">
            <div
              class="w-8 h-8 rounded-lg bg-secondary flex-center"
              :class="[
                {
                  '!bg-primary':
                    modelValue?.includes(item[valueKey]) && !answered,
                },
                {
                  '!bg-primary/[12%]':
                    modelValue?.includes(item[valueKey]) &&
                    answered &&
                    item?.is_correct,
                },
                {
                  '!bg-red-200/[12%]':
                    modelValue?.includes(item[valueKey]) &&
                    answered &&
                    !item?.is_correct,
                },
              ]"
            >
              <p
                class="text-base leading-130 font-semibold text-gray-100 uppercase"
                :class="[
                  {
                    '!text-white':
                      modelValue?.includes(item[valueKey]) && !answered,
                  },
                  {
                    '!text-primary':
                      modelValue?.includes(item[valueKey]) &&
                      answered &&
                      item?.is_correct &&
                      item?.is_selected,
                  },
                  {
                    '!text-red-200':
                      modelValue?.includes(item[valueKey]) &&
                      answered &&
                      !item?.is_correct,
                  },
                ]"
              >
                {{ getAlphabeticalOrder(index) }}
              </p>
            </div>
            <p class="text-base leading-130 font-medium text-dark">
              {{ item[labelKey] }}
            </p>
          </div>
        </template>
        <template v-if="answered" #value>
          <img
            v-if="!item?.is_correct"
            src="/images/svg/close-circle.svg"
            alt="incorrect"
          />
          <img
            v-if="item?.is_correct"
            src="/images/svg/tick-circle.svg"
            alt="incorrect"
          />
        </template>
      </FCheckbox>
    </div>
  </slot>
</template>

<script setup lang="ts">
import FCheckbox from "@/components/Form/Checkbox/FCheckbox.vue";
import { ref } from "vue";
import { getAlphabeticalOrder } from "@/utils";

interface Props {
  modelValue: string | number | object;
  items: object;
  labelKey?: string;
  valueKey?: string;
  wrapperClass?: string;
  name?: string;
  disabled?: boolean;
  answered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  wrapperClass: "flex flex-wrap gap-4",
  labelKey: "name",
  valueKey: "id",
  name: `k-checkbox-${Math.floor(Math.random() * 1000)}`,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | object): void;
}>();

const values = ref<any>(props.modelValue || []);

function onChange(newValue: boolean, itemValue: number) {
  if (newValue) {
    values.value?.push(itemValue);
  } else {
    values.value = values.value?.filter((item) => item !== itemValue);
  }
  emit("update:modelValue", values.value);
}
</script>
