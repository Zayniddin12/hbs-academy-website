<template>
  <div>
    <Draggable
      v-if="mounted"
      v-model="list"
      class="flex flex-col gap-3"
      :component-data="{
        tag: 'transition-group',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      item-key="id"
      ghost-class="ghost"
      v-bind="dragOptions"
      @start="drag = true"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <li
          class="flex-center-between p-3 pl-4 rounded-xl bg-white-100"
          :class="{ '!cursor-grab': drag }"
          :style="{ cursor: 'grab !important' }"
        >
          <!--                    <div-->
          <!--                      v-if="false"-->
          <!--                      class="flex-center tw-mr-3 tw-bg-violet-light/[0.25] tw-rounded-md tw-text-violet tw-font-semibold tw-text-xl tw-tracking-sm tw-text-violet tw-w-8 tw-h-8 tw-flex-shrink-0"-->
          <!--                    >-->
          <!--                      {{ element.id }}-->
          <!--                    </div>-->
          <p
            class="tw-mr-2 tw-flex-grow tw-font-medium tw-text-lg tw-tracking-sm tw-blue-900"
          >
            {{ element?.text }}
          </p>
          <div>
            <i class="icon-drag text-2xl text-gray" />
            <!--            <InlineSvg-->
            <!--              src="/images/icons/menu.svg"-->
            <!--              class="tw-w-6 tw-h-6 tw-flex-shrink-0"-->
            <!--            />-->
          </div>
        </li>
      </template>
    </Draggable>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import Draggable from "vuedraggable";

import { useMounted } from "@/composables/useMounted";

interface Props {
  answers: any;
}
const props = defineProps<Props>();

// ******* EMITS *******
const emit = defineEmits<{
  (
    e: "update:modelValue",
    value?: { answer: number; question: number }[]
  ): void;
}>();

const { mounted } = useMounted();

const dragOptions = {
  animation: 250,
  disabled: false,
};

const drag = ref(false);
const list = ref<any[]>([]);

watch(
  () => props.answers,
  (newValue) => {
    if (newValue) {
      list.value = [...newValue];
    }
  },
  { deep: true, immediate: true }
);

function onDragEnd() {
  drag.value = false;
  emit("update:modelValue", list.value);
}
</script>
