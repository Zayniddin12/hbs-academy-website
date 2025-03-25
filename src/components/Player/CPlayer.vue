<template>
  <div
    class="w-full relative h-full group rounded-xl"
    @mouseleave="isSettingsOpen = false"
  >
    <img
      :src="posterUrl"
      alt=""
      class="absolute w-full h-full"
      :class="loading ? 'z-10' : 'z-0'"
    />
    <iframe
      v-if="isSafariOrChrome()"
      :src="`https://player.vdocipher.com/v2/?otp=${videoInfo?.otp}&playbackInfo=${videoInfo?.playback_info}&autoplay=true`"
      style="border: 0; width: 100%; height: 100%"
      allow="encrypted-media"
      allowfullscreen
      ref="iframe"
      @click="changeStatus"
      class="relative z-[9] rounded-xl"
    />
    <div v-else class="absolute inset-0 w-full h-full bg-dark/20 flex-center">
      <p class="text-white text-2xl">This browser not supported</p>
    </div>
    <Transition name="fade">
      <div
        v-if="loading"
        class="flex-center absolute inset-0 w-full h-full bg-dark/20 z-20"
      >
        <div class="spinner" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import ApiService from "@/services/ApiService";
import { useHandleError } from "@/composables/useErrorHandling";
import apiService from "@/services/ApiService";
import { useVideoStore } from "@/modules/Auth/stores";
import { onBeforeRouteUpdate } from "vue-router";

const { handleError } = useHandleError();
const emit = defineEmits(["refetch"]);
const mounted = ref(false);

interface Props {
  manifestUrl: string;
  licenseServer: string;
  posterUrl: string;
  video: any;
  videoDuration: number;
  lessonId?: string;
  viewedTime: number;
  isFinished?: boolean;
}
const videoStore = useVideoStore();
const props = defineProps<Props>();
const video = ref();
const videoInfo = ref({});
const loading = ref(true);
const isSettingsOpen = ref(false);
const iframe = ref(null);
const timeInterval = ref(null);

const videoData = reactive<any>({
  video: "",
  isPlaying: false,
  currentTime: 0,
  totalTime: 0,
  runningTime: "00:00",
  playbackTime: 0,
  videoDuration: 0,
  isFull: false,
  speed: 1,
  quality: 720,
});

watch(
  () => props.video,
  (val) => {
    videoData.video = val;
  },
  { immediate: true }
);

watch(
  () => props.videoDuration,
  (val) => {
    videoData.videoDuration = val;
  },
  { immediate: true }
);

const intervalId = ref<number | null>(null);

watch(
  () => videoData.isPlaying,
  (isPlaying) => {
    if (isPlaying) {
      intervalId.value = setInterval(() => {
        updateProgress(videoData.currentTime);
      }, 7000); // Every 7 seconds
    } else {
      clearInterval(intervalId.value);
    }
  }
);

// Clean up the interval on component unmount
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

function updateProgress(time: number) {
  ApiService.put(`/study/LessonProgressUpdate/${props.lessonId}/`, {
    viewed_time: +time?.toFixed(0),
  })
    .then(() => {
      emit("refetch");
    })
    .catch(({ response }) => {
      handleError(response);
    });
}

function play() {
  video?.value?.play();
  if (!video.value.paused) {
    videoData.isPlaying = true;
  }
}

function Pause() {
  video?.value?.pause();
  videoData.isPlaying = false;
  // INFO: update progress logic
  updateProgress(videoData.playbackTime);
}

onUnmounted(() => {
  clearInterval(timeInterval.value);
  updateProgress(videoData.playbackTime);
  if (video.value) {
    video.value.removeEventListener("loadeddata", () => {
      loadVideo();
    });
    video.value.removeEventListener("timeupdate", () => {
      updateTime();
    });
    video.value.removeEventListener("pause", () => {
      Pause();
    });
    video.value.removeEventListener("playing", () => {
      play();
    });
  }
});

function changeStatus() {
  isSettingsOpen.value = false;
  if (videoData.isPlaying) {
    Pause();
  } else {
    play();
  }
}

watch(
  () => videoStore.isPlaying,
  async (val) => {
    if (val) {
      await video?.value?.play();
      videoData.isPlaying = val;
    } else {
      video?.value?.pause();
      videoData.isPlaying = val;
    }
  }
);

//Current Time
const updateTime = function () {
  videoData.currentTime = video.value.currentTime;
  videoData.totalTime = totalTime();
  videoData.runningTime = elapsedTime();
  videoData.playbackTime = videoData.currentTime;
  if (Math.floor(videoData?.currentTime) === videoData.videoDuration) {
    videoData.isPlaying = false;
  }
};

// convertTime
function convertTime(seconds: number) {
  const format = (val: any) => `0${Math.floor(val)}`.slice(-2);
  // let hours = seconds / 3600;
  let minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(":");
}

//Total Time
function totalTime() {
  if (video.value) {
    // let seconds = video.value.duration || 0;
    return convertTime(videoData.videoDuration || 0);
  } else {
    return "00:00";
  }
}

function loadVideo() {
  videoData.playbackTime = 0;
  if (props.viewedTime && !props.isFinished) {
    videoData.playbackTime = props.viewedTime;
    videoData.runningTime = convertTime(props.viewedTime);
  }
  totalTime();
  // if (mounted.value) {
  //   play();
  // }
  mounted.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 300);
}

//elapsedTime
function elapsedTime() {
  if (video.value) {
    let seconds = video.value.currentTime;
    return convertTime(seconds);
  } else {
    return "00:00";
  }
}

watch(
  () => videoData.playbackTime,
  () => {
    let diff = Math.abs(videoData.playbackTime - video.value.currentTime);
    if (diff > 0.01) {
      video.value.currentTime = videoData.playbackTime;
    }
  }
);

function getVideoInfo() {
  loading.value = true;
  return new Promise((resolve, reject) => {
    apiService
      .post("/study/vdocipher/ObtainOTP/", {
        video_id: props.video,
      })
      .then((res) => {
        videoInfo.value = res?.data;
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false;
        }, 300);
      });
  });
}

watch(
  () => props.video,
  async (val) => {
    if (val) {
      await getVideoInfo();
    }
  },
  {
    immediate: true,
  }
);

onBeforeRouteUpdate(() => {
  updateProgress(videoData.playbackTime);
});

onMounted(() => {
  if (isSafariOrChrome()) {
    video.value = window.VdoPlayer.getInstance(iframe.value)?.video;
    video.value.addEventListener("loadeddata", loadVideo);
    video.value.addEventListener("timeupdate", () => {
      const { currentTime } = video.value;
      sessionStorage.setItem("WT", currentTime);
      updateTime();
    });
    video.value.addEventListener("pause", Pause);
    video.value.addEventListener("playing", play);
  }
});

function isSafariOrChrome() {
  // if (Object.keys(videoInfo.value).length === 0) {
  //   return false;
  // }

  let userAgent = navigator.userAgent.toLowerCase();

  // Check for Safari
  let isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  // Check for Chrome
  let isChrome =
    /chrome|crios/i.test(userAgent) && !/edge|edg/i.test(userAgent);

  return isSafari || isChrome;
}
</script>

<style scoped>
#position-input {
  color: #ef233c;
  --thumb-height: 4px;
  --track-height: 4px;
  --track-color: #fff;
  --clip-edges: 0.125em;
}

#position-input {
  position: relative;
  background: #fff0;
}

#position-input:active {
  cursor: grabbing;
}

#position-input:disabled {
  filter: grayscale(1);
  opacity: 0.3;
  cursor: not-allowed;
}

/* === WebKit specific styles === */
#position-input,
#position-input::-webkit-slider-runnable-track,
#position-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

#position-input::-webkit-slider-runnable-track,
#position-input::-webkit-slider-thumb {
  position: relative;
}

#position-input::-webkit-slider-thumb {
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 1px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
    100vmax #ff0000;

  width: var(--thumb-width, var(--thumb-height));
  box-shadow: var(--box-fill);

  filter: brightness(100%);
  clip-path: polygon(
    100% -1px,
    var(--clip-edges) -1px,
    0 var(--clip-top),
    -100vmax var(--clip-top),
    -100vmax var(--clip-bottom),
    0 var(--clip-bottom),
    var(--clip-edges) 100%,
    var(--clip-further) var(--clip-further)
  );
}

.linear-shadow-black {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
}

.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #16cc53 94%, #0000) top/9px 9px
      no-repeat,
    conic-gradient(#0000 30%, #16cc53);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
