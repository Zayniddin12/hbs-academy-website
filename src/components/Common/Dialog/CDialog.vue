<template>
  <div
    :class="[{ '!opacity-100 !visible': show }]"
    class="fixed top-0 left-0 w-full h-full bg-dark/60 z-50 flex items-center justify-center invisible opacity-0 transition-300 p-5 !m-0"
  >
    <Transition name="modal">
      <div
        v-if="show"
        id="ModalBg"
        ref="wrapper"
        @click="handleOuterClick"
        class="fixed top-0 left-0 w-full h-full z-[51] flex items-center justify-center transition-300 p-5"
      >
        <div
          id="Modal"
          :class="[bodyClass, { animated: animationIn }]"
          class="relative bg-white rounded-xl w-full max-w-[484px] overflow-hidden transition-300"
        >
          <slot name="header">
            <div
              :class="headerClass"
              class="px-5 pt-5 flex justify-between items-center"
            >
              <h3 class="text-dark text-lg md:text-xl font-semibold leading-23">
                {{ title }}
              </h3>
              <button
                :class="buttonClass"
                class="text-xl text-gray-100 transition-300 hover:text-red"
                @click="$emit('close')"
              >
                <i class="icon-close"></i>
              </button>
            </div>
          </slot>
          <div :class="wrapperClass" class="p-5">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TClassName } from "@/types/common";

interface Props {
  title?: string;
  show?: boolean;
  disableOuterClose?: boolean;
  bodyClass?: TClassName;
  headerClass?: TClassName;
  buttonClass?: TClassName;
  wrapperClass?: TClassName;
}

const animationIn = ref(false);
const wrapper = ref();
const props = withDefaults(defineProps<Props>(), {
  title: "Modal",
  disableOuterClose: false,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const onMousedown = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;

  if (target.id !== "Modal" && target.id === "ModalBg") {
    close();
  }
};
function handleOuterClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target === wrapper.value) {
    if (!props.disableOuterClose) {
      emit("close");
    } else {
      animationIn.value = true;
      setTimeout(() => {
        animationIn.value = false;
      }, 500);
    }
  }
}

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !props.disableOuterClose) {
      emit("close");
    }
  });
});

function close() {
  emit("close");
}
</script>

<style scoped>
.modal-enter-active {
  animation: modal 200ms ease-out forwards;
}

.modal-leave-active {
  animation: modal 200ms ease-in reverse forwards;
}

@keyframes modal {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animated {
  animation: animatedIn 0.4s ease-in-out;
}

@keyframes animatedIn {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  70% {
    transform: scale(0.95);
  }
}
</style>
