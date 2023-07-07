import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should render ExpensesSummary with multiple expenses", () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expenseTotal={12345}/>);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with single expense", () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={1234}/>);
  expect(wrapper).toMatchSnapshot();
});
