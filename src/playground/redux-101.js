import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
  type: "DECREMENT",
  decrementBy: decrementBy
});

const setCount = ({ count = 0 } = {}) => ({
  type: "SET",
  count: 0
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({
  incrementBy: 5
}));

store.dispatch(setCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({
  decrementBy: 10
}));

store.dispatch(setCount({
  count: 69
}));
