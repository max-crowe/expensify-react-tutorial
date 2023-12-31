import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total"

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => (
  <p>
    Showing {expenseCount} expense{
      expenseCount === 1 ? "" : "s"
    } totalling {numeral(expenseTotal / 100).format("$0,0.00")}
  </p>
);

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expenseTotal: selectExpensesTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
