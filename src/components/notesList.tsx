import * as React from "react";
import * as styles from "./notesList.module.css";

const renderItem = (item: string) => {
  const storyRegex = /cpm-\d+/gi;
  let index = 0;
  let match: RegExpExecArray;
  let children: (JSX.Element | string)[]  = [];
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
  label: string,
  items: string[],
  onItemAdded?: ItemHandler,
  onItemRemoved?: ItemHandler,
}

const NotesList = ({
  label,
  items,
  onItemAdded = () => {},
  onItemRemoved = () => {},
}: NotesListProps) => {
  console.log(styles)
  const [newItem, setNewItem] = React.useState("");

  const onKeyUp = ({ key }: React.KeyboardEvent) => {
    if (key === "Enter") {
      onItemAdded(newItem);
      setNewItem("");
    }
  };

  return (
    <>
      <div className={styles.top}>
        <label className={styles.label}>{label}</label>
        <input
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          onKeyUp={onKeyUp}
          className={styles.input}
        />
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {renderItem(item)}{" "}
            <button className={styles.close} onClick={() => onItemRemoved(item)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesList;
