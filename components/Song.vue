<template>
  <div
    class="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
    @click="playSong"
  >
    <div class="flex items-center space-x-4">
      <p>{{ order + 1 }}</p>
      <img
        class="h-10 w-10"
        :src="song.album.images[0].url"
        alt="song img"
      />
      <div>
        <p class="w-36 lg:w-64 truncate text-white">{{ song.name }}</p>
        <p class="w-40">{{ song.artists[0].name }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between ml-auto md:ml-0">
      <p class="w-40 hidden md:inline">{{ song.album.name }}</p>
      <p>{{ millisToMinutesAndSeconds(song.duration_ms) }}</p>
    </div>
  </div>
</template>

<script setup>
import { millisToMinutesAndSeconds } from "@/lib/time";
import { useSongStore } from "@/store";
const props = defineProps({
  song: {},
  order: "",
});

const { $spotify } = useNuxtApp();

const { activeSong, setActiveSong, isPlaying, setIsPlaying } = useSongStore();

function playSong() {
  setActiveSong(props.song);
  setIsPlaying(true);
  try {
    $spotify.play({
      uris: [props.song.uri],
    });
  } catch (error) {
    alert('Hello!!!!');
  }
  console.log({ ...activeSong, }, "Hello");
}
</script>
