<template>
  <div class="min-w-[335px] w-full max-w-[550px] relative">
    <Transition :name="transitionName" mode="out-in">
      <div>
        <!--        <div-->
        <!--          v-if="loading"-->
        <!--          class="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-3"-->
        <!--        >-->
        <!--          <svg-->
        <!--            class="animate-spin"-->
        <!--            fill="none"-->
        <!--            height="25"-->
        <!--            viewBox="0 0 20 20"-->
        <!--            width="25"-->
        <!--            xmlns="http://www.w3.org/2000/svg"-->
        <!--          >-->
        <!--            <path-->
        <!--              fill="#000"-->
        <!--              d="M18.6705 10C19.4048 10 20.0091 10.5978 19.9118 11.3256C19.7101 12.8333 19.1663 14.2813 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433284 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C5.71875 0.833744 7.16671 0.289884 8.6744 0.0882432C9.40217 -0.00909153 10 0.595234 10 1.32949C10 2.06375 9.39999 2.64679 8.67774 2.77904C7.69697 2.95865 6.75831 3.33706 5.92155 3.89617C4.71433 4.70281 3.77341 5.84932 3.21779 7.19071C2.66217 8.53211 2.51679 10.0081 2.80004 11.4322C3.0833 12.8562 3.78246 14.1642 4.80912 15.1909C5.83578 16.2175 7.14383 16.9167 8.56784 17.2C9.99186 17.4832 11.4679 17.3378 12.8093 16.7822C14.1507 16.2266 15.2972 15.2857 16.1038 14.0784C16.6629 13.2417 17.0414 12.303 17.221 11.3223C17.3532 10.6 17.9363 10 18.6705 10Z"-->
        <!--            />-->
        <!--          </svg>-->

        <!--          <p class="font-medium">Loading...</p>-->
        <!--        </div>-->
        <div :key="step" class="w-full">
          <!--          :class="{-->
          <!--            'backdrop-filter blur-[4px] pointer-events-none select-none':-->
          <!--              loading,-->
          <!--          }"-->
          <SStepLogin
            class="max-w-[335px] mx-auto"
            v-if="step === 1"
            v-bind="{ form }"
            @on-block="step = 4"
            @register="step = 2"
          />
          <CRegister
            class="max-w-[335px] mx-auto"
            v-if="step === 2"
            @next="step = 3"
            @back="step = 1"
            :phone="form.values.phone"
          />
          <CRegisterFinish v-if="step === 3" @login="step = 1" />
          <SStepBlocked v-if="step === 4" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useForm } from "@/composables/useForm";
import { minLength, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import SStepLogin from "@/modules/Auth/components/SStepLogin.vue";
import CRegister from "@/modules/Auth/components/CRegister.vue";
import CRegisterFinish from "@/modules/Auth/components/CRegisterFinish.vue";
import ApiService from "@/services/ApiService";
import { generateUniqueKey } from "@/utils";
import { useAuthStore } from "@/stores/auth";
import { useHandleError } from "@/composables/useErrorHandling";
import SStepBlocked from "@/modules/Auth/components/SStepBlocked.vue";

const router = useRouter();
const storeAuth = useAuthStore();
const { handleError } = useHandleError();

const step = ref(1);

const form = useForm<{
  phone?: string;
  sid?: string | number;
  time?: number;
  secret?: string;
  password?: string;
}>(
  {
    phone: "",
    sid: "",
    time: 0,
    secret: generateUniqueKey(),
    password: "",
  },
  {
    phone: {
      required,
      minLength: minLength(10),
    },
  }
);

// function onSubmit() {
//   ApiService.post("/account/StudentFinishLogin/", {
//     phone_number: form.values.phone?.replaceAll(" ", ""),
//     password: form.values.password,
//   })
//     .then(async (response: any) => {
//       await storeAuth.setTokens(response?.data);
//       await storeAuth.getUser().then(() => {
//         router.push({ name: "Courses" });
//       });
//     })
//     .catch((error) => {
//       handleError(error);
//     });
// }

const transitionName = ref("slide-right");
watch(
  () => step.value,
  (newValue, oldValue) => {
    if (newValue < oldValue) {
      transitionName.value = "slide-left";
    } else {
      transitionName.value = "slide-right";
    }
  }
);
</script>
