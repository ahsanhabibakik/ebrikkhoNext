export const ROLE_PERMISSIONS = {
  user: [],
  ad: ["viewProducts"],
  admin: [
    "viewProducts",
    "addProduct",
    "editProduct",
    "viewOrders",
    "manageUsers",
  ],
  superadmin: [
    "viewProducts",
    "addProduct",
    "editProduct",
    "deleteProduct",
    "viewOrders",
    "manageUsers",
    "makeAdmin",
    "makeSuperAdmin",
    "viewDashboard",
  ],
};

export function hasPermission(user, permission) {
  if (!user) return false;
  const role = user.role || (user.isAdmin ? "admin" : "user");
  return ROLE_PERMISSIONS[role]?.includes(permission);
}
