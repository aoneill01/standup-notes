import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import AnalogClock from "analog-clock-react";

function formatForTimeZone(date: Date, timeZone: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZone,
    timeZoneName: "short",
  };
  const dateTimeFormat = new Intl.DateTimeFormat([], options);
  const formatted = dateTimeFormat.format(date);
  const parts = dateTimeFormat.formatToParts(date);
  const findPart = (type) =>
    parseInt(parts.find((part) => part.type === type)?.value);
  return { formatted, minute: findPart("minute"), hour: findPart("hour") };
}

function calculateTimeZones() {
  const timeZones = [
    { timeZone: "America/Los_Angeles", name: "US Pacific" },
    { timeZone: "America/Bogota", name: "Colombia" },
    { timeZone: "America/New_York", name: "US East" },
    { timeZone: "Asia/Kolkata", name: "India" },
  ];
  const date = new Date();

  return timeZones.map(({ name, timeZone }) => ({
    name,
    ...formatForTimeZone(date, timeZone),
  }));
}

const TimeZoneCard: React.FunctionComponent = () => {
  const [timeZones, setTimeZones] = useState(calculateTimeZones());

  useEffect(() => {
    let id = undefined;
    const handleNextMinute = () => {
      id = setTimeout(() => {
        setTimeZones(calculateTimeZones());
        handleNextMinute();
      }, 1000 * (61 - new Date().getSeconds()));
    };
    handleNextMinute();
    return () => clearTimeout(id);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="h6">
          Time Zones
        </Typography>

        <List>
          {timeZones.map(({ name, formatted, hour, minute }) => (
            <ListItem key={name}>
              <ListItemIcon>
                <AnalogClock
                  useCustomTime={true}
                  minutes={minute}
                  hours={hour}
                  width="40px"
                  baseColor="#3f51b5"
                  handColors={{ second: "transparent" }}
                  centerColor="transparent"
                  centerBorderColor="transparent"
                />
              </ListItemIcon>
              <ListItemText primary={formatted} secondary={name}></ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TimeZoneCard;
