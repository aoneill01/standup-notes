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
      <h1>Notes</h1>
      <h2>Daily Standup</h2>
      <NotesList {...noteListProperties("yesterday")} label="Yesterday I:" />
      <NotesList {...noteListProperties("today")} label="Today I will:" />
      <NotesList {...noteListProperties("blocked")} label="I am blocked by:" />
      <NotesList
        {...noteListProperties("postScrum")}
        label="Post scrum topics:"
      />
      <button onClick={clearStandup}>Clear Daily Standup</button>
      <h2>Retrospective</h2>
      <NotesList {...noteListProperties("retro")} label="For retro:" />
      <NotesList {...noteListProperties("techRetro")} label="For tech retro:" />
      <button onClick={clearRetro}>Clear Retrospective</button>
    </Layout>
  );
};

export default IndexPage;
