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
      <title>Notes</title>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h3">
            Notes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography component="h2" variant="h4">
                Daily Standup
              </Typography>
              <NotesList
                {...noteListProperties("yesterday")}
                label="Yesterday I:"
              />
              <NotesList
                {...noteListProperties("today")}
                label="Today I will:"
              />
              <NotesList
                {...noteListProperties("blocked")}
                label="I am blocked by:"
              />
              <NotesList
                {...noteListProperties("postScrum")}
                label="Post scrum topics:"
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
              <Typography component="h2" variant="h4">
                Retrospective
              </Typography>
              <NotesList {...noteListProperties("retro")} label="For retro:" />
              <NotesList
                {...noteListProperties("techRetro")}
                label="For tech retro:"
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={clearRetro}>
                Clear Retrospective
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
