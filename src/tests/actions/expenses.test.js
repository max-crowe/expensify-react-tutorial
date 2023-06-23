import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("Should set up REMOVE_EXPENSE action", () => {
  const action = removeExpense({ id: "abc123" });
  expect(action).toEqual({
    id: "abc123",
    type: "REMOVE_EXPENSE"
  });
});

test("Should set up EDIT_EXPENSE action", () => {
  const updates = {
    description: "New description",
    amount: 3
  };
  const action = editExpense("abc123", updates);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "abc123",
    updates: updates
  });
});

test("Should set up ADD_EXPENSE action with provided values", () => {
  const expenseData = {
    description: "Booze",
    amount: 500.5,
    createdAt: 1000,
    note: "Blended whiskey and Miller high life"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });
});

test("Should set up ADD_EXPENSE action with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0
    }
  });
});
