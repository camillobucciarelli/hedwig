import type { APIRoute } from "astro";
import register from "~/data/firebase/auth/register";

export const POST: APIRoute = async ({ request, redirect }) => {
  const body = await request.json();
  const password = body.password;
  const email = body.email;

  if (!email || !password) {
    return new Response("Missing form data", { status: 400 });
  }

  /* Create user */
  try {
    await register({
      username: email,
      password: password,
      displayName: body.name,
    });
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
  return redirect("/signin");
};
