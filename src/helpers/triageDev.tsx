import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";

export type TriageDevs = {
  primary: string;
  secondary: string;
};

export function getTriageDevs(date: Date): TriageDevs {
  const primaryOrder = ["AC", "JK", "XL", "RM", "BW"];
  const secondaryOrder = ["AO", "KH"];
  const getDeveloperForIndex = (index: number, order) =>
    order[index % order.length];
  const week = differenceInCalendarWeeks(date, new Date(2021, 9, 4), {
    weekStartsOn: 1,
  });

  return {
    primary: getDeveloperForIndex(week, primaryOrder),
    secondary: getDeveloperForIndex(week, secondaryOrder),
  };
}
