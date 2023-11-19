const TimeMap = (() => {
  const min = 60;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = week * 4;
  const year = month * 12;
  return { min, hour, day, week, month, year };
})();

const TimeTextMap = {
  [TimeMap.min]: "minute",
  [TimeMap.hour]: "hour",
  [TimeMap.day]: "day",
  [TimeMap.week]: "week",
  [TimeMap.month]: "month",
  [TimeMap.year]: "year",
};

const createTimeText = (time: number, standard: number, suffix: string) => {
  const duration = Math.floor(time / standard);
  return `${duration} ${duration === 1 ? suffix : suffix + "s"} ago`;
};

const translateTimeZone = (updated_at: string) => {
  return +new Date(
    parseInt(updated_at.slice(0, 4)),
    parseInt(updated_at.slice(5, 7)) - 1,
    parseInt(updated_at.slice(8, 10)),
    parseInt(updated_at.slice(11, 13)) + 9,
    parseInt(updated_at.slice(14, 16))
  );
};

export const fetchRelatedTime = (updated_at: string) => {
  const seconds = (+new Date() - translateTimeZone(updated_at)) / 1000;
  return Object.entries(TimeMap).reduce((text, [time, value]) => {
    if (seconds >= value)
      return createTimeText(seconds, value, TimeTextMap[value]);
    return text;
  }, "Just before");
};

export function daysBetweenDates(rawDate1: string, rawDate2: string) {
  const date1 = new Date(rawDate1);
  const date2 = new Date(rawDate2);

  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const durationWeeks = Math.floor(diffDays / 7) + 1;
  let weekOrWeeks = "";
  if (durationWeeks == 1) {
    weekOrWeeks = "week";
  } else if (durationWeeks > 1) {
    weekOrWeeks = "weeks";
  }

  return `${durationWeeks} ${weekOrWeeks}`;
}

// export function convertIsoDateToReadable(str: string) {
//   // ISO 형식으로 변환
//   // 날짜와 시간을 구분하는 첫 번째 하이픈만 'T'로 변환
//   const isoFormattedStr = str.replace(/-/g, (match, offset) =>
//     offset === 10 ? "T" : match
//   );
//   const date = new Date(isoFormattedStr);

//   // 날짜가 유효한지 확인
//   if (isNaN(date.getTime())) {
//     return "Invalid Date";
//   }

//   const month = date.toLocaleString("en-US", { month: "short" });
//   const day = date.getDate();

//   let suffix = "th";
//   if (day % 10 === 1 && day !== 11) {
//     suffix = "st";
//   } else if (day % 10 === 2 && day !== 12) {
//     suffix = "nd";
//   } else if (day % 10 === 3 && day !== 13) {
//     suffix = "rd";
//   }

//   return `${month} ${day}${suffix}`;
// }

export function convertIsoDateToReadable(str: string) {
  // Check if the input string is not provided or empty
  if (!str) {
    return "Invalid Date";
  }

  // Convert the string to a Date object directly without replacing characters
  const date = new Date(str);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Extract and format the month and day
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  // Determine the correct suffix for the day
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  // Return the formatted date string
  return `${month} ${day}${suffix}`;
}

/**
 * @param startDate 1st Day
 * @param daysToAdd N
 * @returns Nth Day
 */
export function addDaysToDate(startDate: Date, daysToAdd: number): Date {
  const resultDate = new Date(startDate);
  resultDate.setDate(resultDate.getDate() + daysToAdd - 1);
  return resultDate;
}
