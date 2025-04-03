import {
  getVenues,
  getVenueById,
  getFavoriteVenues,
  addFavoriteVenue,
  removeFavoriteVenue,
  searchVenues,
  getVenueComments,
} from "./server";

const venueServices = {
  getVenues,
  getVenueById,
  getFavoriteVenues,
  searchVenues,
  addFavoriteVenue,
  removeFavoriteVenue,
  getVenueComments,
};

export default venueServices;
