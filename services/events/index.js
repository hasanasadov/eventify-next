import {
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



