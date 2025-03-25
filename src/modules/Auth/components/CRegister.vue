<template>
  <div class="mt-6">
    <p class="text-3xl leading-130 font-semibold text-dark flex items-center">
      <i
        class="icon-chevron text-2xl text-dark cursor-pointer"
        @click="$emit('back')"
      ></i>
      {{ $t("register") }}
    </p>
    <p class="mt-1 text-2xs leading-130 text-gray-100/60">
      {{ $t("fill_your_info") }}
    </p>

    <div class="flex flex-col gap-4 my-8">
      <FGroup :label="$t('name')">
        <FInput
          :placeholder="$t('enter_name')"
          v-model="form.values.name"
          :error="form.$v.value.name?.$error"
        />
      </FGroup>
      <FGroup :label="$t('last_name')">
        <FInput
          :placeholder="$t('enter_last_name')"
          v-model="form.values.last_name"
          :error="form.$v.value.last_name?.$error"
        />
      </FGroup>
      <FGroup :label="$t('country_and_region')">
        <FSelect
          v-bind="{ options: regions }"
          label-key="name"
          value-key="id"
          infinite-scroll
          @load="onLoadCountries"
          selected-option-styles="bg-white-100"
          v-model="form.values.country"
          :error="form.$v.value.country?.$error"
        />
      </FGroup>
      <FGroup :label="$t('birthdate')">
        <FDatePicker
          v-model="form.values.birthdate"
          :error="form.$v.value.birthdate?.$error"
        />
      </FGroup>
      <FGroup :label="$t('gender')">
        <div class="flex-y-center w-full gap-2">
          <CGenderChoice
            :cards="genders"
            :active="form.values.gender"
            @change="form.values.gender = $event"
            :error="form.$v.value.gender?.$error"
          />
        </div>
      </FGroup>
    </div>

    <CButton
      class="w-full mb-8"
      :text="$t('register_text')"
      @click="onSubmit"
      :disabled="form.$v.value.$invalid"
      v-bind="{ loading }"
    />
  </div>
</template>

<script setup lang="ts">
import FGroup from "@/components/Form/FGroup.vue";
import FInput from "@/components/Form/Input/FInput.vue";
import FSelect from "@/components/Form/FSelect.vue";
import FDatePicker from "@/components/Form/Date/FDatePicker.vue";
import CGenderChoice from "@/modules/Auth/components/CGenderChoice.vue";
import { useI18n } from "vue-i18n";
import CButton from "@/components/Common/CButton.vue";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import ApiService from "@/services/ApiService";
import { ref, computed } from "vue";
import dayjs from "dayjs";
import { useHandleError } from "@/composables/useErrorHandling";

interface Props {
  phone: string;
}

const { t } = useI18n();
const emit = defineEmits(["next"]);
const props = defineProps<Props>();
const { handleError } = useHandleError();

const loading = ref(false);
const regions = ref([]);
const countriesCount = ref(0);
const currentPage = ref(1);

const form = useForm(
  {
    name: "",
    last_name: "",
    country: "",
    birthdate: "",
    gender: "",
  },
  {
    name: {
      required,
    },
    last_name: {
      required,
    },
    country: {
      required,
    },
    birthdate: {
      required,
    },
    gender: {
      required,
    },
  }
);

function onSubmit() {
  form.$v.value.$touch();
  const data = {
    first_name: form.values.name,
    last_name: form.values.last_name,
    phone_number: props.phone?.replaceAll(" ", ""),
    country: form.values.country?.id,
    birth_date: form.values.birthdate.split(".").reverse().join("-"),
    gender: form.values.gender,
  };
  if (!form.$v.value.$invalid) {
    loading.value = true;
    ApiService.post("/account/StudentRegisterApplication/", data)
      .then(() => {
        emit("next");
      })
      .catch(({ response }) => {
        handleError(response);
      })
      .finally(() => (loading.value = false));
  }
}

function getCountries() {
  ApiService.query("/common/CountryList/", {
    params: {
      page: currentPage.value,
      page_size: 50,
    },
  })
    .then((res) => {
      regions.value = [...regions.value, ...res.data.results];
      countriesCount.value = res.data?.count;
    })
    .catch(({ response }) => {
      handleError(response);
    });
}

getCountries();
function onLoadCountries() {
  if (regions.value.length < countriesCount.value) {
    currentPage.value++;
    getCountries();
  }
}
const genders = computed(() => [
  {
    name: t("male"),
    value: "male",
  },
  {
    name: t("female"),
    value: "female",
  },
]);
</script>
