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
      EDIT: "/dashboard/venues/edit/:id",
    },
  },
};
