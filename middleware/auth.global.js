export default defineNuxtRouteMiddleware((to) => {
  const { status } = useSession();

  switch (status.value) {
    case "authenticated":
      if (to.path.includes("/login")) {
        return navigateTo("/");
      }

      if (to.path.includes("/api/auth")) {
        return;
      }
      break;

    case "unauthenticated":
      if (!to.path.includes("/login")) {
        return navigateTo("/login");
      }
      break;
    default:
      return abortNavigation();
  }
});
