<template>
  <div>
    <div class="flex-center-between gap-4">
      <CTitle :title="$t('profile')" />
      <button
        class="flex-y-center gap-1 text-xs leading-5 font-semibold text-gray-100 hover:text-red transition-300"
        @click="$emit('logout')"
      >
        <span>
          {{ $t("logout") }}
        </span>
        <i class="icon-log-out text-xl" />
      </button>
    </div>

    <div class="mt-4 p-5 bg-white rounded-2xl flex items-end justify-between">
      <div class="flex-y-center gap-4 mb-1">
        <CAvatar :image="user?.avatar" class="w-[80px] h-[80px]" />
        <div>
          <div class="flex-y-center gap-1">
            <p class="text-xl leading-140 font-semibold text-dark">
              {{ user?.full_name }}
            </p>
            <button
              class="icon-pen-edit text-sm text-gray hover:text-primary transition-300"
              @click="$emit('edit')"
            />
          </div>
          <a
            :href="`tel:${user?.phone_number}`"
            class="text-base leading-140 font-semibold text-[#606468] hover:text-primary transition-300"
            >{{ user?.phone_number }}</a
          >
        </div>
      </div>

      <CButton
        variant="secondary"
        icon-position="left"
        icon="icon-key text-xl"
        :text="$t('change_password')"
        class="flex-center h-9"
        @click="$emit('change-password')"
      />
    </div>

    <a
      href="https://t.me/hbs_support"
      target="_blank"
      class="p-4 pr-5 bg-white rounded-xl mt-4 flex-center-between w-full group block"
    >
      <div class="flex-y-center gap-4">
        <div class="w-9 h-9 flex-center rounded-md bg-secondary">
          <i class="icon-headphone text-[28px] text-dark" />
        </div>
        <p class="text-sm leading-140 text-dark font-semibold flex flex-col">
          {{ $t("help") }}
          <span class="text-sm text-gray">+998 78 113-62-00</span>
        </p>
      </div>
      <i
        class="icon-chevron rotate-180 text-[28px] text-gray group-hover:translate-x-1 transition-300"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import CAvatar from "@/components/CAvatar.vue";
import CButton from "@/components/Common/CButton.vue";
import { IUser } from "@/types/common";

interface Props {
  user?: IUser;
}

defineProps<Props>();
</script>
