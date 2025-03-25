<template>
  <slot>
    <div v-if="items?.length" :class="wrapperClass">
      <Radio
        v-for="(item, index) in items"
        :key="index"
        v-bind="{ disabled }"
        v-model="activeRadio"
        :label="item[labelKey]"
        :value="item[valueKey]"
        :name="radioName"
        class="min-h-12 h-auto"
        :class="[
          itemClass,
          {
            '!bg-white !border-primary':
              activeRadio === item[valueKey] && !answered,
          },
          {
            '!bg-white !border-primary':
              answered && activeRadio === item[valueKey] && item?.is_correct,
          },
          {
            '!bg-white !border-red-200':
              answered && activeRadio === item[valueKey] && !item?.is_correct,
          },
          {
            'pointer-events-none': answered,
          },
        ]"
        @click="activeRadio = !disabled ? item[valueKey] : modelValue"
      >
        <template #label>
          <div class="flex-y-center gap-3">
            <div
              class="w-8 h-8 rounded-lg bg-secondary flex-center transition-300"
              :class="[
                {
                  '!bg-primary': activeRadio === item[valueKey] && !answered,
                },
                {
                  '!bg-primary/[12%]':
                    activeRadio === item[valueKey] &&
                    answered &&
                    item?.is_correct,
                },
                {
                  '!bg-red-200/[12%]':
                    activeRadio === item[valueKey] &&
                    answered &&
                    !item?.is_correct,
                },
              ]"
            >
              <p
                class="text-base leading-130 min-w-[32px] flex-center font-semibold text-gray-100 uppercase transition-300"
                :class="[
                  {
                    '!text-white': activeRadio === item[valueKey] && !answered,
                  },
                  {
                    '!text-primary':
                      activeRadio === item[valueKey] &&
                      answered &&
                      item?.is_correct,
                  },
                  {
                    '!text-red-200':
                      activeRadio === item[valueKey] &&
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
      </Radio>
    </div>
  </slot>
</template>

<script setup lang="ts">
import Radio from "@/components/Form/Radio/FRadio.vue";
import { ref, watch } from "vue";
import { getAlphabeticalOrder } from "@/utils";
interface Props {
  modelValue: string | number | object;
  items: Array<any>;
  labelKey?: string;
  valueKey?: string;
  wrapperClass?: string;
  disabled?: boolean;
  itemClass?: string;
  answered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  wrapperClass: "flex flex-wrap gap-4",
  labelKey: "name",
  valueKey: "id",
  disabled: false,
});

const activeRadio = ref(props.modelValue);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | object): void;
}>();

const radioName = `k-radio-${Math.floor(Math.random() * 1000)}`;

const value = ref<string | number | object>([]);

watch(
  () => activeRadio.value,
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue;
    }
    if (!props.disabled) {
      emit("update:modelValue", value.value);
    }
  }
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue;
    }
    activeRadio.value = newValue;
  }
);
</script>
