import moment from "moment";
import expensesReducer from "../../reducers/expenses"
import expenses from "../fixtures/expenses";

test("Should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("Should remove expense by ID", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("Should not remove expense if ID not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses);
});

test("Should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "4",
      description: "Butter",
      note: "",
      amount: 100000000,
      createdAt: moment(0).add(30, "days").valueOf()
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("Should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[2].id,
    updates: {
      note: "foo bar",
      amount: 123456789
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[1], {...expenses[2], ...action.updates}]);
});

test("Should not edit an expense if not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      amount: 1
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
