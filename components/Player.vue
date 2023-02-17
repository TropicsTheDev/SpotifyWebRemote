<template>
  <div
    class="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8"
  >
    <div class="flex items-center space-x-4">
      <img
        class="hidden md:inline h-10 w-10"
        :src="song?.album?.images?.[0].url"
        alt="song image"
      />
      <div>
        <h3>{{ song?.name }}</h3>
        <p>{{ song?.artists?.[0].name }}</p>
      </div>
    </div>

    <div class="flex items-center justify-evenly">
      <ArrowPathRoundedSquareIcon class="button" />
      <BackwardIcon class="button" />
      <template v-if="isPlaying">
        <PauseIcon class="button w-10 h-10" @click="handlePlayPause" />
      </template>
      <template v-else>
        <PlayIcon class="button w-10 h-10" @click="handlePlayPause" />
      </template>
      <ForwardIcon class="button" />
      <ArrowUturnLeftIcon class="button" />
    </div>

    <div class="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
      <VolumeDownIcon class="button" @click="setVolumeDown" />
      <input
        class="w-14 md:w-28"
        type="range"
        min="0"
        max="100"
        v-model="volume"
      />
      <VolumeUpIcon class="button" @click="setVolumeUp" />
    </div>
  </div>
</template>

<script setup>
import {
  ArrowPathRoundedSquareIcon,
  PauseIcon,
  PlayIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowUturnLeftIcon,
  SpeakerWaveIcon as VolumeUpIcon,
} from "@heroicons/vue/24/solid";
import {
  HeartIcon,
  SpeakerWaveIcon as VolumeDownIcon,
} from "@heroicons/vue/24/outline";
import { debounce } from "lodash";
import { useSongStore } from "@/store";
import { storeToRefs } from "pinia";
import useSongInfo from "@/lib/useSongInfo";

const { $spotify } = useNuxtApp();

const songStore = useSongStore();
const { activeSong, isPlaying } = storeToRefs(songStore);
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

watch(
  activeSong,
  () => {
    if ($spotify.getAccessToken() && !activeSong.value) {
      fetchCurrentSong();
    }
  },
  { immediate: true }
);

async function handlePlayPause() {
  console.log(isPlaying.value);
  try {
    if (isPlaying.value) {
      await $spotify.pause();
      setIsPlaying(false);
    } else {
      await $spotify.play();
      setIsPlaying(true);
    }
  } catch (error) {
    alert(error);
  }
}

const volume = ref(50);

function setVolumeDown() {
  volume.value > 0 && (volume.value = parseInt(volume.value) - 10);
}

function setVolumeUp() {
  volume.value < 100 && (volume.value = parseInt(volume.value) + 10);
}

watch(volume, (newVolume) => {
  if (newVolume > 0 && newVolume < 100) {
    debounceAdjustedVolume(newVolume);
  }
});

const debounceAdjustedVolume = debounce(async (volume) => {
  try {
    await $spotify.setVolume(volume).catch((err) => {});
  } catch (error) {
    alert(
      "Something went wrong. Are you on an iOS device? iOS devices do not allow volume change :("
    );
  }
}, 500);
</script>
