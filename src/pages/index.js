import * as React from "react";
import NotesList from "../components/NotesList";

const pageStyles = {
  color: "#232129",
  margin: "0 auto",
  width: 900,
  padding: 8,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const initialState = {
  yesterday: [],
  today: [],
  blocked: [],
  postScrum: [],
};

const loadFromLocalStorage = () => {
  const result = window.localStorage.getItem("notes");
  return result ? JSON.parse(result) : null;
};

const IndexPage = () => {
  const [notes, setNotes] = React.useState(
    loadFromLocalStorage() ?? initialState
  );
  React.useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addItem = (property) => (item) => {
    const currentItems = notes[property];
    setNotes({
      ...notes,
      [property]: [...currentItems, item],
    });
  };
  const removeItem = (property) => (item) => {
    const currentItems = notes[property];
    setNotes({
      ...notes,
      [property]: currentItems.filter((existing) => existing !== item),
    });
  };
  const noteListProperties = (property) => ({
    items: notes[property],
    onItemAdded: addItem(property),
    onItemRemoved: removeItem(property),
  });
  const clearAll = () => setNotes(initialState);

  return (
    <main style={pageStyles}>
      <title>Standup Notes</title>
      <h1>Standup Notes</h1>
      <NotesList {...noteListProperties("yesterday")} label="Yesterday I:" />
      <NotesList {...noteListProperties("today")} label="Today I will:" />
      <NotesList {...noteListProperties("blocked")} label="I am blocked by:" />
      <NotesList
        {...noteListProperties("postScrum")}
        label="Post scrum topics:"
      />
      <button onClick={clearAll}>Clear</button>
    </main>
  );
};

export default IndexPage;
