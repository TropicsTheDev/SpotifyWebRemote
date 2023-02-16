import SpotifyWebApi from "spotify-web-api-node";

export default defineNuxtPlugin((nuxt) => {
  const config = useRuntimeConfig();

  const spotifyApi = new SpotifyWebApi({
    clientId: config.public.clientId,
    clientSecret: config.public.clientSecret,
  });

  const { data: session, status, signIn } = useSession();

  spotifyApi.setAccessToken(session.value?.user.accessToken);
  spotifyApi.setRefreshToken(session.value?.user?.refreshToken);

  watch(session, (newSession) => {
    if (session.value.error === "RefreshTokenError") {
      signIn();
    }
    spotifyApi.setAccessToken(newSession.user.accessToken);
    spotifyApi.setRefreshToken(newSession.user.refreshToken);
  });

  return {
    provide: {
      spotify: spotifyApi,
    },
  };
});
