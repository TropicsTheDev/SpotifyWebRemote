import { defineStore } from "pinia";

const usePlaylistStore = defineStore("playlists", {
  state() {
    return {
      playlists: [],
      activePlaylist: { id: "1yFyKy0htYzuFeTOOBXxWk" },
    };
  },

  actions: {
    setActivePlaylist(playlist) {
      this.activePlaylist = playlist;
    },
  },
});

export default usePlaylistStore;
