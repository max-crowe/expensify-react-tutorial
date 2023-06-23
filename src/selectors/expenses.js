import moment from "moment";

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const createdAt = moment(expense.createdAt);
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAt, "day") : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAt, "day") : true;

    return textMatch && startDateMatch && endDateMatch;
  }).sort((first, second) => {
    if (sortBy === "date") {
      return first.createdAt < second.createdAt ? 1 : -1;
    }
    return second.amount - first.amount;
  });
};
