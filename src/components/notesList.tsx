import * as React from "react";
import * as styles from "./notesList.module.css";

const renderNote = (item: string) => {
  const storyRegex = /cpm-\d+/gi;
  let index = 0;
  let match: RegExpExecArray;
  let children: (JSX.Element | string)[] = [];
  while ((match = storyRegex.exec(item)) !== null) {
    children.push(item.substring(index, match.index));
    children.push(
      <a
        key={match.index}
        href={`https://jira.disney.com/browse/${match[0].toUpperCase()}`}
        target="_blank"
        rel="noreferrer"
      >
        {match[0]}
      </a>
    );
    index = match.index + match[0].length;
  }
  children.push(item.substring(index));
  return <>{children}</>;
};

type ItemHandler = (item: string) => void;

type NotesListProps = {
  label: string;
  notes: string[];
  onNoteAdded?: ItemHandler;
  onNoteRemoved?: ItemHandler;
};

const NotesList = ({
  label,
  notes,
  onNoteAdded = () => {},
  onNoteRemoved = () => {},
}: NotesListProps) => {
  console.log(styles);
  const [newNote, setNewNote] = React.useState("");

  const onKeyUp = ({ key }: React.KeyboardEvent) => {
    if (key === "Enter") {
      onNoteAdded(newNote);
      setNewNote("");
    }
  };

  return (
    <>
      <div className={styles.top}>
        <label className={styles.label}>{label}</label>
        <input
          type="text"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          onKeyUp={onKeyUp}
          className={styles.input}
        />
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {renderNote(note)}{" "}
            <button
              className={styles.close}
              onClick={() => onNoteRemoved(note)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesList;
