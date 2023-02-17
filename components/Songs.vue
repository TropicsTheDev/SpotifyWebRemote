<template>
  <div>
    <template v-if="songsPending">
      <progress>Loading songs...</progress>
    </template>
    <template v-else-if="songs && songs.length > 0">
      <div v-for="(song, index) in songs">
        <Song :key="song.track.id" :song="song.track" :order="index" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { usePlaylistStore } from "@/store";
import { storeToRefs } from "pinia";

const { $spotify } = useNuxtApp();

const { activePlaylist } = storeToRefs(usePlaylistStore());

const {
  data: songs,
  pending: songsPending,
  erorr: songsError,
} = useAsyncData(
  async () => {
    const token = await $spotify.getAccessToken();
    if (token) {
      const res = await $spotify.getPlaylistTracks(activePlaylist.value.id);
      return res.body.items;
    }
  },
  { watch: [activePlaylist] }
);
</script>

<style lang="scss" scoped></style>
