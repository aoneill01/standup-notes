import {
  Avatar,
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getTriageDevs, TriageDevs } from "../helpers/triageDev";

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TriageCard: React.FunctionComponent = () => {
  const classes = useStyles();
  const [triageData, setTriageData] = useState<TriageDevs[]>(null);

  const updateTriageData = () => {
    const devs: TriageDevs[] = [];
    const date = new Date();
    for (let i = 0; i < 3; i++) {
      devs.push(getTriageDevs(date));
      date.setDate(date.getDate() + 7);
    }
    setTriageData(devs);
  };

  useEffect(() => {
    updateTriageData();
    const id = setInterval(updateTriageData, 1000 * 60 * 60);
    return () => clearInterval(id);
  }, []);

  if (!triageData) return null;
  const [currentWeek, nextWeek, twoWeeks] = triageData;

  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="h6" style={{ marginBottom: 8 }}>
          Triage Support
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Primary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>This week</TableCell>
              <TableCell>
                <Avatar className={classes.primary}>
                  {currentWeek.primary}
                </Avatar>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Next week</TableCell>
              <TableCell>
                <Avatar>{nextWeek.primary}</Avatar>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2 weeks</TableCell>
              <TableCell>
                <Avatar>{twoWeeks.primary}</Avatar>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TriageCard;
