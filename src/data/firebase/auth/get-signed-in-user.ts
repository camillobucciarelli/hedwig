import { auth } from "~/firebase-configurations/server";
import type { AuthUser } from "~/models/auth-user";

export const getSignedInUser = async (uid: string): Promise<AuthUser> => {
  const user = await auth.getUser(uid);
  return {
    id: user.uid,
    username: user.email,
    displayName: user.displayName,
    role: user.customClaims?.organizer ? "organizer" : undefined,
  };
};

export default getSignedInUser;
