import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";

export type TriageDevs = {
  primary: string;
  secondary: string;
};

export function getTriageDevs(date: Date): TriageDevs {
  const developerOrder = ["AO", "RG", "KH", "DJ", "SK"];
  const getDeveloperForIndex = (index: number) =>
    developerOrder[index % developerOrder.length];
  const week = differenceInCalendarWeeks(date, new Date(2021, 4, 17), {
    weekStartsOn: 1,
  });

  return {
    primary: getDeveloperForIndex(week),
    secondary: getDeveloperForIndex(week + 1),
  };
}
