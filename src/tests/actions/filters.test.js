import moment from "moment";
import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from "../../actions/filters";

test("Should generate SET_START_DATE action", () => {
  const startDate = moment(0);
  const action = setStartDate(startDate);
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: startDate
  });
});

test("Should generate SET_END_DATE action", () => {
  const endDate = moment(0);
  const action = setEndDate(endDate);
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: endDate
  });
});

test("Should generate SET_TEXT_FILTER action with user-defined string", () => {
  const filterString = "foobar";
  const action = setTextFilter(filterString);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: filterString
  });
});

test("Should generate SET_TEXT_FILTER action with default string", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});

test("Should generate SET_SORT_BY action with field set to amount", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SET_SORT_BY",
    field: "amount"
  });
});

test("Should generate SET_SORT_BY action with field set to date", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SET_SORT_BY",
    field: "date"
  })
});
