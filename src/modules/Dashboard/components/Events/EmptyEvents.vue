<template>
  <div class="bg-white rounded-2xl flex-y-center">
    <img src="/images/no-data/no-assignments.svg" alt="no-assignments" />
    <div>
      <p class="text-2xl leading-130 font-semibold text-dark">
        {{ $t("no_events") }}
      </p>
      <p class="mt-2 text-sm leading-130 font-normal text-gray max-w-[288px]">
        {{ $t("no_events_text") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
