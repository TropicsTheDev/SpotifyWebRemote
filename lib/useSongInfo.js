import { useNuxtApp } from "#app";
import { useSongStore } from "@/store";
import { storeToRefs } from "pinia";

export default function useSongInfo() {
  const { $spotify } = useNuxtApp();
  const { activeSong } = storeToRefs(useSongStore());

  const songInfo = ref({});

  async function fetchSongInfo() {
    if (activeSong.value.id) {
      const info = await fetch(
        `https://api.spotify.com/v1/tracks/${activeSong.value.id}`,
        {
          headers: {
            Authorization: `Bearer ${$spotify.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      songInfo.value = info;
    }
  }

  watch(
    activeSong,
    () => {
      fetchSongInfo();
    },
    { immediate: true }
  );

  return songInfo;
}
