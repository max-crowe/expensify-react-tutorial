import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import AppRouter from "./routers/AppRouter";
import getVisibleExpenses from "./selectors/expenses";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({
  description: "Water bill",
  amount: 123
}));
store.dispatch(addExpense({
  description: "Gas bill",
  amount: 345,
  createdAt: 1000
}));
store.dispatch(addExpense({
  description: "Rent",
  amount: 123000
}));

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));
