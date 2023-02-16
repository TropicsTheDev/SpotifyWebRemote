import { defineStore } from "pinia";

const useSongStore = defineStore("songs", {
  state() {
    return {
      activeSong: {},
      isPlaying: false,
    };
  },

  actions: {
    setActiveSong(song) {
      this.activeSong = song;
    },
    setIsPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },
  },
});

export default useSongStore;
