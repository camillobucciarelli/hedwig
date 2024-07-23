import { auth } from "~/firebase-configurations/server";
import createSessionCookie from "./create-session-cookie";

const signIn = async (idToken: string): Promise<Record<string, any> | null> => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken, true);

    // expires in 5 days
    const expiresIn: number = 60 * 60 * 24 * 5 * 1000;

    /**
     *  Why not `credentials.expiresIn`?
     *  Because the session cookie should be longer than the ID token expiry time to avoid session expiration during user activity.
     */
    const sessionIdToken: string = await createSessionCookie(
      idToken,
      expiresIn,
    );

    const user = await auth.getUser(decodedToken.uid);

    return {
      tokenId: sessionIdToken,
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      role: user.customClaims?.organizer ? "organizer" : undefined,
    };
  } catch (error) {
    return null;
  }
};

export default signIn;
