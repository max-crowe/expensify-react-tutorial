export const setTextFilter = (filterString = "") => ({
  type: "SET_TEXT_FILTER",
  text: filterString
});

export const sortByAmount = () => ({
  type: "SET_SORT_BY",
  field: "amount"
});

export const sortByDate = () => ({
  type: "SET_SORT_BY",
  field: "date"
});

export const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate: startDate
});

export const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate: endDate
});
