import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";

export type TriageDevs = {
  primary: string;
  secondary: string;
};

export function getTriageDevs(date: Date): TriageDevs {
  const primaryOrder = ["CT", "RA", "KH", "XL", "RM"];
  const getDeveloperForIndex = (index: number, order) =>
    order[index % order.length];
  const week = differenceInCalendarWeeks(date, new Date(2022, 0, 17), {
    weekStartsOn: 1,
  });

  return {
    primary: getDeveloperForIndex(week, primaryOrder),
    secondary: null,
  };
}
