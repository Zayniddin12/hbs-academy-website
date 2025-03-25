import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => {
    return {
      isPlaying: false,
      selectedId: 0,
      selectedCourseId: 0,
    };
  },
  actions: {
    playVideo(id: number) {
      this.isPlaying = true;
      this.selectedId = id;
    },

    pauseVideo(id: number) {
      this.isPlaying = false;
      this.selectedId = id;
    },
    setSelectedCourse(id: number) {
      this.selectedCourseId = id;
      sessionStorage.setItem("scid", String(id));
    },
  },
});
