import { useState, useEffect } from "react";

type Notes = {
  yesterday: string[];
  today: string[];
  blocked: string[];
  postScrum: string[];
  retro: string[];
  techRetro: string[];
};

const initialState: Notes = {
  yesterday: [],
  today: [],
  blocked: [],
  postScrum: [],
  retro: [],
  techRetro: [],
};

const isBrowser = typeof window !== "undefined";

const loadFromLocalStorage = () => {
  const result = isBrowser && window.localStorage.getItem("notes");
  return result ? (JSON.parse(result) as Notes) : null;
};

const useNotes = () => {
  const [notes, setNotes] = useState(loadFromLocalStorage() ?? initialState);

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNoteFor = (property: string) => (item: string) => {
    setNotes((state) => {
      const currentItems: string[] = state[property];
      return {
        ...state,
        [property]: [...currentItems, item],
      };
    });
  };

  const removeNoteFor = (property: string) => (item: string) => {
    setNotes((state) => {
      const currentItems: string[] = notes[property];
      return {
        ...state,
        [property]: currentItems.filter((existing) => existing !== item),
      };
    });
  };

  const clearStandup = () =>
    setNotes((state) => ({
      ...state,
      yesterday: [],
      today: [],
      blocked: [],
      postScrum: [],
    }));

  const clearRetro = () =>
    setNotes((state) => ({ ...state, retro: [], techRetro: [] }));

  return { notes, addNoteFor, removeNoteFor, clearStandup, clearRetro };
};

export { useNotes };
