export const paths = {
  HOME: "/",
  EVENTS: "/events",
  VENUES: "/venues",
  MAP: "/map",
  SEARCH: "/search",
  CHAT: "/chat",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  DASHBOARD: {
    MAIN: "/dashboard",
    EVENTS: {
      LIST: "/dashboard/events",
      CREATE: "/dashboard/events/create",
      EDIT: (id = ":id") => `/dashboard/events/edit/${id}`,
      DELETE: (id = ":id") => `/dashboard/events/delete/${id}`,
    },
    USERS: {
      LIST: "/dashboard/users",
      CREATE: "/dashboard/users/create",
      EDIT: (id = ":id") => `/dashboard/users/edit/${id}`,
      DELETE: (id = ":id") => `/dashboard/users/delete/${id}`,
    },
    VENUES: {
      LIST: "/dashboard/venues",
      CREATE: "/dashboard/venues/create",
      EDIT: (id = ":id") => `/dashboard/venues/edit/${id}`,
      DELETE: (id = ":id") => `/dashboard/venues/delete/${id}`,
    },

    LOCATIONS: {
      LIST: "/dashboard/locations",
      CREATE: "/dashboard/locations/create",
      EDIT: (id = ":id") => `/dashboard/locations/edit/${id}`,
      DELETE: (id = ":id") => `/dashboard/locations/delete/${id}`,
    },
  },
};
