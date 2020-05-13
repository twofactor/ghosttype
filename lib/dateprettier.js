export const datePrettier = function (timestamp) {
  const timestampToDate = new Date(timestamp);

  console.log();
  return timestampToDate.toDateString();
};
