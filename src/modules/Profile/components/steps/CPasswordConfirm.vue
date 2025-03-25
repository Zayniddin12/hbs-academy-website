<template>
  <div>
    <p class="text-sm leading-normal text-gray-100">{{ $t("we_send_code") }}</p>

    <div
      class="px-2 py-1.5 rounded bg-white-100 flex-y-center gap-2.5 w-max mt-2"
    >
      <p class="text-sm leading-130 font-normal text-gray-100">
        {{ value?.phone }}
      </p>
      <i class="icon-pen-edit text-base text-gray" />
    </div>
    <div class="my-8">
      <FGroup :label="$t('confirm_code')">
        <FOtp v-model="values.code" :error="form.$v.value.code?.$error" />
      </FGroup>
      <div class="flex-center mt-5">
        <CResend v-bind="{ time: value?.time }" @resend="$emit('resend')" />
      </div>
    </div>
    <CButton
      class="w-full"
      :disabled="values?.code?.length < 6"
      :text="$t('continue')"
      @click="submit"
    />
  </div>
</template>

<script setup lang="ts">
import FGroup from "@/components/Form/FGroup.vue";
import FOtp from "@/components/Form/FOtp.vue";
import { TForm } from "@/composables/useForm";
import { unref } from "vue";
import CResend from "@/modules/Auth/components/CResend.vue";
import CButton from "@/components/Common/CButton.vue";
import ApiService from "@/services/ApiService";

interface Props {
  value: {
    sid: string;
    phone: string;
    secret: string;
    time: number;
  };
  form: TForm<any>;
}

const props = defineProps<Props>();
const emit = defineEmits(["next", "resend"]);
const { form } = unref(props);
const { values } = form;

function submit() {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    const data = {
      sid: props.value.sid,
      otp: values.code,
      client_secret: props.value.secret,
    };
    ApiService.post("/verification/submit-otp/", data).then((res) => {
      values.sid = res.data.sid;
      emit("next");
      console.log("res", res);
    });
  }
}
</script>
