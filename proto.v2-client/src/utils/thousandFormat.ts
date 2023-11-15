const thousandFormat = (num: string | number): string => {
  if (typeof num === "string" && num.length === 0) return "0";
  const base = num.toString();
  return base.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export default thousandFormat;
