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
  const [triageData, setTriageData] = useState<[TriageDevs, TriageDevs]>(null);

  const updateTriageData = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    setTriageData([getTriageDevs(today), getTriageDevs(nextWeek)]);
  };

  useEffect(() => {
    updateTriageData();
    const id = setInterval(updateTriageData, 1000 * 60 * 60);
    return () => clearInterval(id);
  }, []);

  if (!triageData) return null;
  const [currentWeek, nextWeek] = triageData;

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
              <TableCell>Secondary</TableCell>
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
              <TableCell>
                <Avatar className={classes.secondary}>
                  {currentWeek.secondary}
                </Avatar>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Next week</TableCell>
              <TableCell>
                <Avatar>{nextWeek.primary}</Avatar>
              </TableCell>
              <TableCell>
                <Avatar>{nextWeek.secondary}</Avatar>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TriageCard;
