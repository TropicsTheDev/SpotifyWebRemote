import { NuxtAuthHandler } from "#auth";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyWebApi from 'spotify-web-api-node';
import LOGIN_URL from "@/lib/spotifyLoginUrl";

const spotifyApi = new SpotifyWebApi({
  clientId: useRuntimeConfig().public.clientId,
  clientSecret: useRuntimeConfig().public.clientSecret,
});

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: newToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: newToken.access_token,
      accessTokenExpires: Date.now() + newToken.expires_in * 1000,
      refreshToken: newToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export default NuxtAuthHandler({
  providers: [
    SpotifyProvider.default({
      clientId: useRuntimeConfig().public.clientId,
      clientSecret: useRuntimeConfig().public.clientSecret,
      authorization: LOGIN_URL,
    }),
  ],
  secret: useRuntimeConfig().jwtSecret,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      if (Date.now() < token?.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
