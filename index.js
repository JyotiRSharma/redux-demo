const redux = require("redux");
const createStore = redux.createStore;

/**
 * Action: Describe what happened, but don't describe the application's state changes.
 */

// String constant to describe the type of the action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// An action creator creates an action, its a function that returns an action.
function orderCake() {
  // define an action
  return {
    type: CAKE_ORDERED,
    payload: 2, // can be added optionally
  };
  // That is it action is created
}

function restockCake(restockQuantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: restockQuantity,
  };
}

/**
 * Reducers: Specify how the application's state changes in response to actions sent to the store.
 * Its a pure function that accepts state and action as arguments and returns the next state of the application.
 * example: (previousState, action) => newState
 */

// Example State: Whenever the ownser opens the shop, there are 10 cakes on the shelf
const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case CAKE_ORDERED:
      // make a copy of the state object and only update the numOfCakes
      return {
        ...state,
        numOfCakes: state.numOfCakes - payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
// All access to the state via getState()
console.log("initial state", store.getState());
// Registers listeners via subscribe(listener)
const unsubscribe = store.subscribe(() =>
  console.log("Updated state:", store.getState())
);

// Allows state to be updated via dispatch(action)
// Invoke the orderCake action creator, which will inturn return the action
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// Restock the cakes
store.dispatch(restockCake());

// Unsubscribe from the store, by calling the function returned by the subscribe method
unsubscribe();

// won't update the state
store.dispatch(orderCake());
