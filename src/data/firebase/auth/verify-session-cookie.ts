import { auth } from "~/firebase-configurations/server";

const verifySessionCookie = async (
  sessionCookie: string,
  role?: string,
): Promise<boolean> => {
  const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
  return !role || decodedIdToken.role === role;
};

export default verifySessionCookie;
