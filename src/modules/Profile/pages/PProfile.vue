<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="step">
        <CProfileInfo
          v-if="step === 1"
          v-bind="{ user }"
          @edit="step = 2"
          @logout="showLogout = true"
          @change-password="step = 3"
        />
        <CEdit v-if="step === 2" @back="step = 1" />
        <CChangePassword v-if="step === 3" @back="step = 1" />
      </div>
    </Transition>
    <CLogoutModal :show="showLogout" @close="showLogout = false" />
  </div>
</template>

<script lang="ts" setup>
import CProfileInfo from "@/modules/Profile/components/CProfileInfo.vue";
import CEdit from "@/modules/Profile/components/CEdit.vue";
import { computed, ref } from "vue";
import CLogoutModal from "@/modules/Profile/components/CLogoutModal.vue";
import CChangePassword from "@/modules/Profile/components/CChangePassword.vue";
import { useAuthStore } from "@/stores/auth";

const step = ref(1);
const showLogout = ref(false);

const user = computed(() => useAuthStore()?.user);
</script>
