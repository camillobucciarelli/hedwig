export type AuthUser = {
  id?: string;
  username?: string;
  password?: string;
  displayName?: string;
  role?: AuthRoles;
};

export type AuthRoles = "organizer";
