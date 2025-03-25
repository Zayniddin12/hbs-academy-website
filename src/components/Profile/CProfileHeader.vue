<template>
  <CCard class="!p-0">
    <div class="p-6 pb-0 flex gap-5">
      <div
        class="w-[135px] h-[140px] rounded-lg border border-white-100 overflow-hidden"
      >
        <img :src="image" alt="title" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex-grow flex justify-between">
          <div>
            <slot name="title">
              <h1 class="text-dark font-semibold text-2xl">{{ title }}</h1>
            </slot>
            <slot name="subTitle">
              <p class="text-sm text-gray leading-130">{{ subTitle }}</p>
            </slot>
          </div>

          <div>
            <slot name="actions">
              <CButton />
            </slot>
          </div>
        </div>
        <div class="flex gap-4">
          <slot name="details">
            <CProfileDashDetail title="16.09.2022 / 09:41" />

            <CProfileDashDetail
              :title="formatPhoneNumber('+998712007007')"
              description="Номер телефона"
            />
            <CProfileDashDetail description="Электронная почта" />

            <CProfileDashDetail description="Читали" />
          </slot>
        </div>
      </div>
    </div>
    <div class="w-full pl-6 mt-7">
      <hr class="border-white-100" />
    </div>
    <CTab v-model="activeTab" :list="tabList" />
  </CCard>
</template>
<script setup lang="ts">
import CCard from "@/components/Card/CCard.vue";
import CTab from "@/components/Tab/CTab.vue";
import { ref } from "vue";
import CButton from "@/components/Common/CButton.vue";
import CProfileDashDetail from "@/components/Profile/CProfileDashDetail.vue";
import { formatPhoneNumber } from "@/utils";
import { ITabItem } from "@/components/Tab/CTab.types";

interface Props {
  image: string;
  title: string;
  date: string;
  subTitle?: string;
  tabList?: ITabItem[];
}

withDefaults(defineProps<Props>(), {
  title: "Elzodxon",
  date: new Date(),
  subTitle: "Technologist",
  image:
    "https://instagram.fura3-1.fna.fbcdn.net/v/t39.30808-6/357442290_18147085372289532_6022039261545861077_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&_nc_ht=instagram.fura3-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=NhppKX4UpbUAX8ORmzM&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzE0MDM1MDYxNzg2ODE1NDg0NA%3D%3D.2-ccb7-5&oh=00_AfDaOYtFZ2qZZNn8axOVb0FLz4r5pNeLbyTGDNrTgAOS4A&oe=64FEFF09&_nc_sid=ee9879",
});
const activeTab = ref("ProductReview");
</script>
