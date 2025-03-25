<template>
  <div class="flex flex-col justify-end h-full text-center w-full mt-[40%]">
    <div class="max-w-[335px] mx-auto">
      <img
        src="/images/Illustration.png"
        alt="ill"
        class="mx-auto max-w-[230px]"
      />

      <p class="text-2xl leading-130 font-semibold text-dark">
        {{ $t("thank_you_for_applying") }}
      </p>
      <p class="text-2xs leading-130 font-normal text-gray/60 mt-1">
        {{ $t("we_will_contact_you_soon") }}
      </p>
      <CButton
        :text="$t('enter_system')"
        class="min-w-[165px] mt-4"
        @click="$emit('login')"
      />
      <p class="text-xs leading-130 text-gray mb-2.5 mt-16">
        {{ $t("if_you_have_questions") }}
      </p>
    </div>
    <div class="flex-y-center gap-4 w-full">
      <a :href="`mailto:${'info@hbsacademy.com'}`" class="w-full inline-block">
        <CButton
          class="w-full"
          variant="secondary"
          :text="'info@hbsacademy.com'"
          icon="icon-mail"
          icon-position="left"
        />
      </a>
      <a :href="`tel:${'+998996753211'}`" class="w-full">
        <CButton
          class="w-full"
          :text="$t('call')"
          icon="icon-phone"
          icon-position="left"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from "@/components/Common/CButton.vue";
</script>
