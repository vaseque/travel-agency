/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  if(filters.duration) {
    const from = filters.duration.from;
    const to = filters.duration.to;
    output = output.filter(trip => trip.days >= from && trip.days <= to);
  }

  if(filters.tags.length) {
    output = output.filter(trip => trip.tags.some(tag => filters.tags.includes(tag)));
  }

  if(output) {
    output = output.sort((a, b) => parseInt(b.cost.slice(1)) -  parseInt(a.cost.slice(1)));
  }

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => trip.id === tripId);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code === countryCode);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
