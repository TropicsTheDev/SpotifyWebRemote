<template>
  <div
    class="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36"
  >
    <div class="space-y-4">
      <button
        class="flex items-center space-x-2 hover:text-white"
        @click="signOut"
      >
        <ArrowLeftOnRectangleIcon class="h-5 w-5" />
        <p>Logout</p>
      </button>
      <button class="flex items-center space-x-2 hover:text-white">
        <HomeIcon class="h-5 w-5" />
        <p>Home</p>
      </button>
      <button class="flex items-center space-x-2 hover:text-white">
        <MagnifyingGlassIcon class="h-5 w-5" />
        <p>Search</p>
      </button>
      <button class="flex items-center space-x-2 hover:text-white">
        <BuildingLibraryIcon class="h-5 w-5" />
        <p>Library</p>
      </button>
      <hr class="border-t-[0.1lx] border-gray-900" />

      <button class="flex items-center space-x-2 hover:text-white">
        <PlusCircleIcon class="h-5 w-5" />
        <p>Create Playlist</p>
      </button>
      <button class="flex items-center space-x-2 hover:text-white">
        <HeartIcon class="h-5 w-5" />
        <p>Liked Songs</p>
      </button>
      <button class="flex items-center space-x-2 hover:text-white">
        <RssIcon class="h-5 w-5" />
        <p>Your Episodes</p>
      </button>
      <hr class="border-t-[0.1lx] border-gray-900" />

      <template v-if="playlistsPending">
        <progress>Loading Playlists</progress>
      </template>
      <template v-else>
        <p
          class="cursor-pointer hover:text-white"
          v-for="playlist in playlists"
          :key="playlist.id"
          @click="setActivePlaylist(playlist)"
        >
          {{ playlist.name }}
        </p>
      </template>

      <!-- <template v-if="playlistsPending === true">
        <progress>Loading Playlists</progress>
      </template>
      <template v-if="playlistsError">
        <p>{{ playlistsError }}</p>
      </template> -->
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { usePlaylistStore } from "@/store";

const { data: session, status, signOut } = useSession();

const { $spotify } = useNuxtApp();

const {
  data: playlists,
  pending: playlistsPending,
  error: playlistsError,
} = await useAsyncData(
  "playlists",
  async () => {
    const token = $spotify.getAccessToken();
    if (token) {
      const res = await $spotify.getUserPlaylists();
      return res.body.items;
    }
  },
  { watch: [session] }
);

const { setActivePlaylist } = usePlaylistStore();
</script>
