<template>
  <div class="h-24 bg-gradient-to-b from-black to-gray-900 text-white">
    <div>
      <img
        class="hidden md:inline h-10 w-10"
        :src="song?.album?.images[0].url"
        alt="song image"
      />
      <div>
        <h3>{{ song?.name }}</h3>
        <p>{{ song?.artists[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSongStore } from "@/store";
import { storeToRefs } from "pinia";
import useSongInfo from "@/lib/useSongInfo";

const { $spotify } = useNuxtApp();

const songStore = useSongStore();
const { activeSong } = storeToRefs(songStore);
const { setActiveSong, setIsPlaying } = songStore;

const song = useSongInfo();

function fetchCurrentSong() {
  if (!song) {
    $spotify
      .getMyCurrentPlayingTrack()
      .then((data) => setActiveSong(data.body?.item));
  }

  $spotify
    .getMyCurrentPlaybackState()
    .then((data) => setIsPlaying(data.body?.is_playing));
}

watch(activeSong, () => {
  if ($spotify.getAccessToken() && !activeSong.value) {
    fetchCurrentSong();
  }
});

const volume = ref(50);
</script>
