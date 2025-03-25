<template>
  <div class="border py-2 px-3 rounded-md border-dashed border-[#E4E6EF]">
    <slot>
      <p class="text-sm font-bold text-dark-primary">
        {{ title }}
      </p>
    </slot>
    <p class="text-gray text-2xs">
      {{ t(description) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

interface Props {
  title?: string;
  description: string;
}

const { t } = useI18n();

withDefaults(defineProps<Props>(), {
  title: "elzodxon@gmail.com",
  description: "Номер телефона",
});
</script>
