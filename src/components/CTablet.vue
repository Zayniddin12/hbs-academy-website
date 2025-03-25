<template>
  <div class="container relative overflow-hidden h-screen">
    <div class="mb-9 pt-16 text-center">
      <img src="/images/svg/logo.svg" class="w-[180px] mx-auto" alt="logo" />
      <p class="text-4xl font-semibold leading-130 text-dark-100 mt-9 mb-3">
        {{ $t("download_mobile_app") }}
      </p>
      <p
        class="text-xl leading-130 font-normal text-gray-100 max-w-[46%] mx-auto"
      >
        {{ $t("download_mobile_app_text") }}
      </p>
    </div>
    <img src="/images/tablet.png" alt="tablet" />
  </div>
  <div
    class="w-full h-[657px] linear-white-bg-tablet absolute bottom-0 left-0 z-10 flex flex-col justify-between items-center pb-16"
  >
    <div></div>
    <div class="flex-y-center gap-6">
      <a href="#">
        <img
          src="/images/svg/playmarket.svg"
          class="max-w-[250px]"
          alt="playmarket"
        />
      </a>
      <a href="#">
        <img
          src="/images/svg/appstore.svg"
          class="max-w-[250px]"
          alt="appstore"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.linear-white-bg-tablet {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}
</style>
