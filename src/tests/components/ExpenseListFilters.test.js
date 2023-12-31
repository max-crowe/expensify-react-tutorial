import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, filters2 } from "../fixtures/filters";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with different filters", () => {
  wrapper.setProps({
    filters: filters2
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "asdf";
  wrapper.find("input").at(0).simulate("change", {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  wrapper.find("select").at(0).simulate("change", {
    target: { value: "date" }
  });
  expect(sortByDate).toHaveBeenCalled();
  expect(sortByAmount).not.toHaveBeenCalled();
});

test("should sort by amount", () => {
  wrapper.find("select").at(0).simulate("change", {
    target: { value: "amount" }
  });
  expect(sortByDate).not.toHaveBeenCalled();
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  const startDate = moment();
  const endDate = startDate.add(1, "days");
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
    startDate, endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus changes", () => {
  const calendarFocused = "endDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
