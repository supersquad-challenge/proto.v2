// const thousandFormat = (num: string | number): string => {
//   if (typeof num === "string" && num.length === 0) return "0";
//   const base = num.toString();
//   return base.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// };

// export default thousandFormat;

const thousandFormat = (num: string | number): string => {
  // Check if the input is null, undefined, or not a number.
  if (num === null || num === undefined || isNaN(Number(num))) {
    return "0";
  }

  // Convert the input to a string if it's not already.
  const base = num.toString();

  // Format the string with thousand separators.
  return base.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export default thousandFormat;
