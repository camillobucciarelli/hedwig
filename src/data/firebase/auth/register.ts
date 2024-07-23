import { auth } from "~/firebase-configurations/server";
import type { AuthUser } from "~/models/auth-user";

const register = async (user: AuthUser): Promise<AuthUser> => {
  const userRecord = await auth.createUser({
    email: user.username,
    displayName: user.displayName,
    password: user.password,
  });

  // Add roles to custom claims
  if (user.role) {
    await auth.setCustomUserClaims(userRecord.uid, {
      [user.role as string]: true,
    });
  }

  return {
    id: userRecord.uid,
    username: userRecord.email,
    displayName: userRecord.displayName,
    role: user.role,
  };
};

export default register;
