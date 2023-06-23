import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("Should set up default filter values", () => {
  const state = filtersReducer(undefined, "@@INIT");
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("Should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SET_SORT_BY", field: "amount" });
  expect(state.sortBy).toBe("amount");
});

test("Should set sortBy to date", () => {
  const startState = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount"
  };
  const action = {
    type: "SET_SORT_BY",
    field: "date"
  };
  const state = filtersReducer(startState, action);
  expect(state.sortBy).toBe("date");
});

test("Should set text filter", () => {
  const filterText = "foo bar";
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text: filterText
  });
  expect(state.text).toBe(filterText);
});

test("Should set startDate filter", () => {
  const startDate = moment(0);
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate
  });
  expect(state.startDate).toEqual(startDate);
});

test("Should set endDate filter", () => {
  const endDate = moment(1000);
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate
  });
  expect(state.endDate).toEqual(endDate);
});
