import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import Layout from "../components/layout";
import NotesList from "../components/notesList";
import TimeZoneCard from "../components/timeZoneCard";
import TriageCard from "../components/triageCard";
import { useNotes } from "../hooks/useNotes";

const IndexPage = () => {
  const {
    addNoteFor,
    clearRetro,
    clearStandup,
    notes,
    removeNoteFor,
  } = useNotes();

  const noteListProperties = (property) => ({
    notes: notes[property],
    onNoteAdded: addNoteFor(property),
    onNoteRemoved: removeNoteFor(property),
  });

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card style={{ marginTop: 24 }}>
            <CardContent>
              <Typography
                component="h2"
                variant="h6"
                style={{ marginBottom: 8 }}
              >
                Daily Standup
              </Typography>
              <NotesList
                {...noteListProperties("yesterday")}
                label="Yesterday I:"
                id="yesterday"
              />
              <NotesList
                {...noteListProperties("today")}
                label="Today I will:"
                id="today"
              />
              <NotesList
                {...noteListProperties("blocked")}
                label="I am blocked by:"
                id="blocked"
              />
              <NotesList
                {...noteListProperties("postScrum")}
                label="Post scrum topics:"
                id="postScrum"
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={clearStandup}
              >
                Clear Daily Standup
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                component="h2"
                variant="h6"
                style={{ marginBottom: 8 }}
              >
                Retrospective
              </Typography>
              <NotesList
                {...noteListProperties("retro")}
                label="For retro:"
                id="retro"
              />
              <NotesList
                {...noteListProperties("techRetro")}
                label="For tech retro:"
                id="techRetro"
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={clearRetro}>
                Clear Retrospective
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TimeZoneCard />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
