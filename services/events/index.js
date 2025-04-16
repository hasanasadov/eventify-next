import {
  remove,
  edit,
  getEvents,
  getEventById,
  getFavoriteEvents,
  searchEvents,
  addFavoriteEvent,
  removeFavoriteEvent,
  createEvent,
  getEventComments,
  getEventComment,
  createEventLike,
} from "./server";

const eventServices = {
  remove,
  edit,
  getEvents,
  getEventById,
  getFavoriteEvents,
  searchEvents,
  addFavoriteEvent,
  removeFavoriteEvent,
  createEvent,
  getEventComments,
  getEventComment,
  createEventLike,
};

export default eventServices;
