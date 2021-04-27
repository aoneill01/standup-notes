import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
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
  id: string;
  label: string;
  notes: string[];
  onNoteAdded?: ItemHandler;
  onNoteRemoved?: ItemHandler;
};

const NotesList = ({
  id,
  label,
  notes,
  onNoteAdded = () => {},
  onNoteRemoved = () => {},
}: NotesListProps) => {
  const [newNote, setNewNote] = React.useState("");

  const onKeyUp = ({ key }: React.KeyboardEvent) => {
    if (key === "Enter") {
      addNote();
    }
  };

  const addNote = () => {
    onNoteAdded(newNote);
    setNewNote("");
  };

  return (
    <>
      <TextField
        type="text"
        label={label}
        value={newNote}
        id={id}
        onChange={(event) => setNewNote(event.target.value)}
        onKeyUp={onKeyUp}
        fullWidth
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="add"
                disabled={!newNote}
                onClick={addNote}
              >
                <Add />
              </IconButton>
            </InputAdornment>
          ),
        }}
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
