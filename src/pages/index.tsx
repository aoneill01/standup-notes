import * as React from "react";
import Layout from "../components/layout";
import NotesList from "../components/notesList";

type Notes = {
  yesterday: string[],
  today: string[],
  blocked: string[],
  postScrum: string[],
}

const initialState: Notes = {
  yesterday: [],
  today: [],
  blocked: [],
  postScrum: [],
};

const isBrowser = typeof window !== "undefined";

const loadFromLocalStorage = () => {
  const result = isBrowser && window.localStorage.getItem("notes");
  return result ? JSON.parse(result) as Notes : null;
};

const IndexPage = () => {
  const [notes, setNotes] = React.useState(
    loadFromLocalStorage() ?? initialState
  );

  React.useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addItem = (property: string) => (item: string) => {
    const currentItems: string[] = notes[property];
    setNotes({
      ...notes,
      [property]: [...currentItems, item],
    });
  };

  const removeItem = (property: string) => (item: string) => {
    const currentItems: string[] = notes[property];
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
    <Layout>
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
    </Layout>
  );
};

export default IndexPage;
