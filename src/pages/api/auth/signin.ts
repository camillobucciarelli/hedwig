import type { APIRoute } from "astro";
import signIn from "~/data/firebase/auth/sign-in";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    const sessionCookie = await signIn(idToken);

    if (!sessionCookie) {
      return new Response("Unauthorized", { status: 401 });
    }

    cookies.set("__session", sessionCookie, {
      path: "/",
      httpOnly: true,
      secure: true,
    });

    return redirect("/");
  } catch (error: any) {
    return new Response(error, { status: 401 });
  }
};
