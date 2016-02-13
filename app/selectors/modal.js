
export const getModal = (state) => {
  if (!state.modal.size) {
    return null;
  }
  const flight = state.flights.getIn([state.modal.get('flightType'), 'items', state.modal.get('flightId')]);
  return state.modal.set('flight', flight);
};
