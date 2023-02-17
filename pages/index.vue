<template>
  <div class="bg-black h-screen overflow-hidden">
    <main class="flex">
      <Sidebar />
      <Center />
    </main>

    <div class="sticky bottom-0">
      <Player />
    </div>
  </div>
</template>

<script setup></script>

<style lang="css">
@import '@/styles/globals.css';
</style>
