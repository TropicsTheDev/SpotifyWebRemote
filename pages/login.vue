<template>
  <div
    class="flex flex-col items-center bg-black min-h-screen w-full justify-center"
  >
    <img
      class="w-52 mb-5"
      src="https://links.papareact.com/9xl"
      alt="spotify logo"
    />
    <div v-for="provider in Object.values(providers)">
      <button
        class="bg-[#18D860] text-white p-5 rounded-full"
        @click="signIn(provider.id, { callbackUrl: '/' })"
      >
        Login with {{ provider.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { getProviders, signIn } = useSession();
const providers = await getProviders();
</script>
