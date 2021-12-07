import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";

export type TriageDevs = {
  primary: string;
  secondary: string;
};

export function getTriageDevs(date: Date): TriageDevs {
  const primaryOrder = ["RA", "LC", "KH", "AO", "XL", "RM", "CT", "BW"];
  const getDeveloperForIndex = (index: number, order) =>
    order[index % order.length];
  const week = differenceInCalendarWeeks(date, new Date(2021, 11, 6), {
    weekStartsOn: 1,
  });

  return {
    primary: getDeveloperForIndex(week, primaryOrder),
    secondary: null,
  };
}
