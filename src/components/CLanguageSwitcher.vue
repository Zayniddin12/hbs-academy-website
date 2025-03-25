<template>
  <CDropdown head-class="cursor-pointer">
    <template #head="{ show }">
      <div
        class="transition-300 flex items-center justify-between gap-1 group p-2 pr-3 rounded-full border border-secondary hover:border-green"
        :class="{ 'bg-green-200 !border-green': show }"
      >
        <div class="flex-y-center gap-1 text-blue-100">
          <i class="icon-globe flex-center text-[28px] h-4 mr-1" />
          <span class="text-sm leading-130 font-medium text-dark">
            {{ currentLanguage?.label }}
          </span>
          <i
            class="icon-chevron-bold transition-200 text-base inline-block"
            :class="{ '!rotate-180': show }"
          ></i>
        </div>
      </div>
    </template>

    <ul class="shadow-language">
      <li
        v-for="(item, index) in languages"
        :key="index"
        class="transition-200 p-3 text-sm text-dark font-medium leading-130 flex-center-between border-b border-secondary hover:bg-white-100"
        @click="changeLocale(item.value)"
      >
        <span>{{ item.label }}</span>
        <i
          v-if="item.value === currentLanguage?.value"
          class="icon-tick text-base text-green"
        ></i>
      </li>
    </ul>
  </CDropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CDropdown from "@/components/Common/CDropdown.vue";
import { ELanguage, ILanguage } from "@/types/components/languageSwitcher";

const languages: ILanguage[] = [
  {
    value: ELanguage.UZ,
    label: "O'zbekcha",
    icon: "/src/assets/svg/flags/ru.svg",
  },
  {
    value: ELanguage.RU,
    label: "Русский",
    icon: "/src/assets/svg/flags/ru.svg",
  },
  {
    value: ELanguage.EN,
    label: "English",
    icon: "/src/assets/svg/flags/ru.svg",
  },
];

const currentLanguage = computed(() => {
  const currentLocale = localStorage.getItem("locale") || "en";

  return languages.find((lang) => lang.value === currentLocale) || "en";
});

function changeLocale(_locale: ELanguage) {
  localStorage.setItem("locale", _locale);
  window.location.reload();
}
</script>
