<template>
  <div class="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
    <header class="absolute top-5 right-8">
      <div
        class="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
        @click="signOut"
      >
        <img
          class="rounded-full w-10 h-10"
          :src="session?.user.image"
          alt="profile picture"
        />
        <h2>{{ session?.user.name }}</h2>
        <ChevronDownIcon class="h-5 w-5" />
      </div>
    </header>
    <section
      :class="`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`"
    >
      <img
        :src="activePlaylist?.images?.[0]?.url"
        alt="playlist image"
        class="h-44 w-44 shadow-2xl"
      />
      <div>
        <p>Playlist</p>
        <h1 class="text-2xl md:text-3xl xl:text-5xl font-bold">
          {{ activePlaylist?.name }}
        </h1>
      </div>
    </section>
    <div>
      <Songs />
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { shuffle } from "lodash";
import { storeToRefs } from "pinia";
import { usePlaylistStore } from "@/store";

const { data: session, signOut } = useSession();
const { activePlaylist } = storeToRefs(usePlaylistStore());
const color = ref("");

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

watch(
  activePlaylist,
  () => {
    color.value = shuffle(colors).pop();
  },
  { immediate: true }
);
</script>
