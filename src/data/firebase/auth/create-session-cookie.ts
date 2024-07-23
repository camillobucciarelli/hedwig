import { auth } from "~/firebase-configurations/server";

// Create the session cookie. This will also verify the ID token in the process.
// The session cookie will have the same claims as the ID token.
// To only allow session cookie setting on recent sign-in, auth_time in ID token
// can be checked to ensure user was recently signed in before creating a session cookie.
const createSessionCookie = async (
  idToken: string,
  expiresIn: number,
): Promise<string> => {
  return auth.createSessionCookie(idToken, {
    expiresIn,
  });
};

export default createSessionCookie;
