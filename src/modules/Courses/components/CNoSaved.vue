<template>
  <div class="bg-white py-4 rounded-2xl px-9 flex-y-center">
    <img src="/images/no-data/no-saved.svg" alt="no-assignments" />
    <div>
      <p class="text-2xl leading-130 font-semibold text-dark">
        {{ $t("no_saved") }}
      </p>
      <p class="mt-2 text-sm leading-130 font-normal text-gray max-w-[288px]">
        {{ $t("no_saved_text") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
