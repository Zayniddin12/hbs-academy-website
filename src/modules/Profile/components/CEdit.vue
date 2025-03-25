<template>
  <div>
    <CTitle :title="$t('edit')" />

    <div class="w-full bg-white rounded-2xl p-5 mt-4">
      <CAvatarChange
        :default-image="user?.avatar"
        @change="form.values.avatar = $event"
        @delete="(condition) => (isDeleteClicked = condition)"
      />

      {{console.log("form.values.country",form.values)}}

      <div class="grid grid-cols-2 gap-4 my-8">
        <FGroup :label="$t('country_and_region')">
          <FSelect
            v-bind="{ options: regions }"
            label-key="name"
            value-key="id"
            infinite-scroll
            selected-option-styles="bg-white-100"
            @load="onLoadCountries"
            v-model="form.values.country"
            :error="form.$v.value.country?.$error"
          />
        </FGroup>
        <FGroup :label="$t('gender')">
          <div class="flex-y-center gap-2">
            <CGenderChoice
              :cards="genders"
              :active="form.values.gender"
              @change="form.values.gender = $event"
            />
          </div>
        </FGroup>
        <FGroup :label="$t('email')">
          <FInput
            v-model="form.values.email"
            disabled
            class="pointer-events-none"
          >
            <template #suffix>
              <i class="icon-lock text-xl text-gray-100 -mb-0.5 block" />
            </template>
          </FInput>
        </FGroup>
        <FGroup :label="$t('phone_number')">
          <div class="w-full relative pointer-events-none user-select-none">
            <FInputPhone v-model.trim="form.values.phone" disabled />
            <i class="absolute-y right-2.5 icon-lock text-xl text-gray-100" />
          </div>
        </FGroup>
      </div>

      <div class="flex-y-center justify-end gap-3">
        <CButton
          variant="secondary"
          :text="$t('cancel')"
          class="min-w-[160px]"
          @click="$emit('back')"
        />
        <CButton
          :text="$t('save')"
          class="min-w-[160px]"
          @click="submit"
          :disabled="!isEdited"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import FGroup from "@/components/Form/FGroup.vue";
import FInput from "@/components/Form/Input/FInput.vue";
import FSelect from "@/components/Form/FSelect.vue";
import CGenderChoice from "@/modules/Auth/components/CGenderChoice.vue";
import { useI18n } from "vue-i18n";
import FInputPhone from "@/components/Form/Input/FInputPhone.vue";
import { useForm } from "@/composables/useForm";
import CButton from "@/components/Common/CButton.vue";
import CAvatarChange from "@/modules/Profile/components/CAvatarChange.vue";
import { computed, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { IUser } from "@/types/common";
import ApiService from "@/services/ApiService";
import { useCustomToast } from "@/composables/useCustomToast";
import { useHandleError } from "@/composables/useErrorHandling";

const { t } = useI18n();
const { showToast } = useCustomToast();

const user = computed(() => useAuthStore()?.user);
const emit = defineEmits(["back"]);

const form = useForm(
  {
    phone: "",
    gender: "male",
    country: 1,
    email: "gmail@gmail.com",
    avatar: "",
  },
  {}
);

const { handleError } = useHandleError();
const regions = ref([]);
const currentPage = ref(1);
const countriesCount = ref(0);

function getCountries() {
  ApiService.query("/common/CountryList/", {
    params: {
      page: currentPage.value,
      page_size: 30,
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

const data = ref();
const isDeleteClicked = ref(false);

function submit() {
  if (isDeleteClicked.value) {
    data.value = {
      avatar: null,
      region: form.values.country.id,
      gender: form.values.gender,
    };
  } else if (form.values.avatar === "") {
    data.value = {
      region: form.values.country.id,
      gender: form.values.gender,
    };
  } else {
    data.value = {
      region: form.values.country.id,
      avatar: form.values.avatar,
      gender: form.values.gender,
    };
  }

  ApiService.patch("/account/StudentUpdate/", data.value).then(() => {
    useAuthStore().getUser();
    showToast(t("successfully_edited"), "success");
    emit("back");
  });
}

const genders = [
  {
    name: t("male"),
    value: "male",
  },
  {
    name: t("female"),
    value: "female",
  },
];

watch(
  () => user.value,
  (value: IUser) => {
    form.values.phone = value?.phone_number;
    form.values.gender = value?.gender;
    form.values.country = value?.region_full;
    form.values.email = value?.email;
  },
  {
    immediate: true,
  }
);

const isEdited = ref(false);

watch(
  () => form.values.phone,
  (val) => {
    isEdited.value = val?.replaceAll(" ", "") !== user.value?.phone_number;
  },
  {
    deep: true,
  }
);

watch(
  () => form.values.email,
  (val) => {
    isEdited.value = val !== user.value?.email;
  },
  {
    deep: true,
  }
);

watch(
  [
    () => isDeleteClicked.value,
    () => form.values.avatar,
    () => form.values.country,
    () => form.values.gender,
  ],
  () => {
    isEdited.value = true;
  }
);
</script>
