import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm"
import expenses from "../fixtures/expenses"

test("should render empty expense form", () => {
  const wrapper = shallow(<ExpenseForm/>);
  expect(wrapper).toMatchSnapshot();
});

test("should render expense form with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm/>);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "New description"
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find("input").at(0).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "foo bar baz";
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount on valid amount change", () => {
  const value = "123.45";
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find("input").at(1).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount on invalid amount change", () => {
  const value = "1.2.3";
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find("input").at(1).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const expense = expenses[2];
  const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy}/>);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expense.description,
    amount: expense.amount,
    createdAt: expense.createdAt,
    note: expense.note
  });
});

test("should set new date on date change", () => {
  const wrapper = shallow(<ExpenseForm/>);
  const now = moment();
  wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on focus change", () => {
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({ focused: true });
  expect(wrapper.state("calendarFocused")).toBe(true);
});
