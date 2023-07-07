import selectExpensesTotal from "../../selectors/expenses-total"
import expenses from "../fixtures/expenses"

test("Should return 0 if no expenses", () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test("Should handle single expense", () => {
  const result = selectExpensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});

test("Should handle multiple expenses", () => {
  let expected = 0;
  for (let expense of expenses) {
    expected += expense.amount;
  }
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(expected);
});
