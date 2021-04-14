import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";

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
  const [newNote, setNewNote] = React.useState("");

  const onKeyUp = ({ key }: React.KeyboardEvent) => {
    if (key === "Enter") {
      onNoteAdded(newNote);
      setNewNote("");
    }
  };

  return (
    <>
      <TextField
        label={label}
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
        onKeyUp={onKeyUp}
        fullWidth
      />
      <List>
        {notes.map((note, index) => (
          <ListItem key={index}>
            <ListItemText primary={renderNote(note)}></ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onNoteRemoved(note)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NotesList;
