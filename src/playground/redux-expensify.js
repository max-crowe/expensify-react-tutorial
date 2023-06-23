import { createStore, combineReducers } from 'redux';
import {v1 as uuid} from 'uuid';

const addExpense = (
  {
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description: description,
    note: note,
    amount: amount,
    createdAt: createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id: id
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id: id,
  updates: updates
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const setTextFilter = (filterString = "") => ({
  type: "SET_TEXT_FILTER",
  text: filterString
});

const sortByAmount = () => ({
  type: "SET_SORT_BY",
  field: "amount"
});

const sortByDate = () => ({
  type: "SET_SORT_BY",
  field: "date"
});

const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate: startDate
});

const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate: endDate
});

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      }
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.field
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;

    return textMatch && startDateMatch && endDateMatch;
  }).sort((first, second) => {
    if (sortBy === "date") {
      return first.createdAt < second.createdAt ? 1 : -1;
    }
    return second.amount - first.amount;
  });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenses = [
  store.dispatch(addExpense({
    description: "rent",
    amount: 100,
    createdAt: -1000
  })),
  store.dispatch(addExpense({
    description: "coffee",
    amount: 300,
    createdAt: -2000
  }))
];

/*
store.dispatch(editExpense(expenses[1].expense.id, {
  amount: 500
}))

store.dispatch(setTextFilter("rent"));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(removeExpense({ id: expenses[0].expense.id }));
*/

//store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1250));
//store.dispatch(setTextFilter("RE"));
//store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
