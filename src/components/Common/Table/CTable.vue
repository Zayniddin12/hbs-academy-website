<template>
  <div class="relative w-full max-w-full overflow-x-auto" :class="wrapperClass">
    <Transition name="dropdown" mode="out-in">
      <table class="w-full c-table" v-if="!loading">
        <thead>
          <tr>
            <th
              v-for="(h, index) in head"
              :key="index"
              class="p-3 bg-white-400 first:rounded-l-md last:rounded-r-md text-xs text-left last:text-right first:pl-4 last:pr-4 text-gray font-semibold"
              :class="[{ 'w-[5%]': h.key === '_index' }, thClass]"
            >
              {{ h.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(d, index) in data"
            :key="index"
            class="border-b last:border-none border-gray-400 relative"
            :class="[
              bodyTrClass,
              { 'bg-white-500': index % 2 !== 0 },
              { 'even:bg-white-50': type === 'filled' },
            ]"
          >
            <td
              v-for="(h, idx) in head"
              :key="idx"
              class="py-5 px-4 text-xs text-dark"
              :class="[tdClass]"
            >
              <div v-if="idx === 0" class="w-1 h-10 absolute left-0 top-2" />
              <slot :name="h.key" :data="{ ...d, _index: getIndex(index) }">
                {{ h.key === "_index" ? getIndex(index) : d[h.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </Transition>
    <div
      v-if="loading"
      class="w-full h-[500px] flex items-center justify-center"
    >
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TClassName } from "@/types/common";
import { ITableHead } from "@/types/components/table";

interface Props {
  type?: "filled" | "transparent";

  head: ITableHead[];

  thClass?: TClassName;
  bodyTrClass?: TClassName;
  tdClass?: TClassName;
  wrapperClass?: TClassName;

  data: Record<string, any>[];

  limit: number;
  currentPage: number;

  loading?: boolean;
  statusKey?: string;
  statusColors?: any;
}
const props = withDefaults(defineProps<Props>(), {
  loading: true,
});

function getIndex(index: number) {
  return (props?.currentPage - 1) * props?.limit + index + 1;
}
</script>
<style>
.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #52618f 41%);
  background: linear-gradient(0deg, #52618f 50%, #52618f 0) center/4.5px 100%,
    linear-gradient(90deg, #52618f 50%, #52618f 0) center/100% 4.5px;
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1.5s infinite steps(12);
}
.spinner::before,
.spinner::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.spinner::after {
  opacity: 0.83;
  transform: rotate(60deg);
}
@keyframes spinner-d3o0rx {
  100% {
    transform: rotate(1turn);
  }
}
</style>
