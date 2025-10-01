export const accessRules: Record<string, string[]> = {
  "/dashboard/users": ["admin"],
  "/dashboard/post": ["admin", "user"],
  "/dashboard/playground/history": ["admin", "staff"],
  "/dashboard/playground/settings": ["admin"],
  "/dashboard/models": ["admin", "staff"],
  "/dashboard/docs": ["admin", "staff", "user"],
  "/dashboard/settings": ["admin"],
  "/dashboard/log-activity": ["admin"],

}