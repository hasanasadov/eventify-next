export const paths = {
  DASHBOARD: {
    MAIN: "/dashboard",

    EVENTS: {
      LIST: "/dashboard/events",
      CREATE: "/dashboard/events/create",
      EDIT: (id = ":id") => `/dashboard/events/edit/${id}`,
      DELETE: (id = ":id") => `/dashboard/events/delete/${id}`,
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
