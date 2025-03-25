<template>
  <div class="aspect-video">
    <video controls>
      <source
        v-for="(item, index) in videoSources"
        :key="index"
        :src="item?.src"
        :type="item?.type"
      />
    </video>
    <!--    <video-player-->
    <!--      v-bind="options"-->
    <!--      id="CustomVideoPlayer"-->
    <!--      class="video-player w-full h-full"-->
    <!--    />-->
  </div>
</template>

<script lang="ts" setup>
// import { shallowRef } from "vue";
// import { VideoPlayer } from "@videojs-player/vue";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import videoJsResolutionSwitcher from "@silvermine/videojs-resolution-switcher";

// type VideoJsPlayer = ReturnType<typeof videojs>;

const videoSources = [
  {
    src: "/winterfell/house.mp4",
    type: "video/mp4",
    res: 1080,
    label: "1080p",
  },
  {
    src: "/winterfell/stark-720.mp4",
    type: "video/mp4",
    res: 720,
    label: "720p",
  },
  {
    src: "/anakin/anakin-360.mp4",
    type: "video/mp4",
    res: 360,
    label: "360p",
  },
];

// const options = {
//   html5: {
//     // nativeCaptions: false,
//     vhs: {
//       overrideNative: true,
//     },
//     nativeAudioTracks: false,
//     nativeVideoTracks: false,
//   },
//   sources: videoSources,
//   disablePictureInPicture: true,
//   plugins: {
//     // dashHlsBitrateSwitcher: {
//     //   support: "both",
//     // },
//     // settingsMenu: {
//     //   items: [
//     //     "AudioTrackButton",
//     //     "ChaptersButton",
//     //     "SubsCapsButton",
//     //     "PlaybackRateMenuButton",
//     //     "RatesButton",
//     //   ],
//     //   languages: {
//     //     settings: "Settings",
//     //     loading: "Loading",
//     //     back: "Back",
//     //     captions_off: "Captions Off",
//     //     default_audio: "Default Audio",
//     //     audio: "Audio",
//     //     subtitles: "Subtitles",
//     //     chapters: "Chapters",
//     //     speed: "Speed",
//     //     quality: "Quality",
//     //   },
//     // },
//   },
//   liveui: true,
//   controls: true,
//   // playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
//   nativeControlsForTouch: false,
//   noUITitleAttributes: true,
//   keepTimeTooltipInSeekBar: true,
//   persistTextTrackSettings: true,
//   preferFullWindow: true,
//   alwaysEnableFullWindow: true,
// };
//
// const player = shallowRef<VideoJsPlayer>();
// const handleMounted = (payload: any) => {
//   player.value = payload.player;
//   console.log("Basic player mounted", payload);
// };
//
// const handleEvent = (log: any) => {
//   console.log("Basic player event", log);
// };
</script>

<!--<style>-->
<!--.vjs-play-progress.vjs-slider-bar {-->
<!--  background: #ea3323;-->
<!--}-->

<!--.vjs-load-progress div {-->
<!--  background: rgba(255, 255, 255, 0.5) !important;-->
<!--}-->

<!--.vjs-progress-holder.vjs-slider.vjs-slider-horizontal {-->
<!--  background: rgba(255, 255, 255, 0.2);-->
<!--}-->

<!--.vjs-picture-in-picture-control.vjs-control.vjs-button.vjs-disabled {-->
<!--  display: none;-->
<!--}-->
<!--</style>-->
