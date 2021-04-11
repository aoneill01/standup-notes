import * as React from "react";

const labelStyles = {
  fontWeight: "bold",
};

const inputStyles = {
  flexGrow: 1,
};

const topStyles = {
  display: "flex",
  gap: 8,
};

const closeStyles = {
  border: "none",
  backgroundColor: "rgba(255, 255, 255, 0)",
};

const renderItem = (item) => {
  const storyRegex = /cpm-\d+/gi;
  let index = 0;
  let match;
  let children = [];
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

const NotesList = ({
  label,
  items = [],
  onItemAdded = () => {},
  onItemRemoved = () => {},
}) => {
  const [newItem, setNewItem] = React.useState("");

  const onKeyUp = ({ key }) => {
    if (key === "Enter") {
      onItemAdded(newItem);
      setNewItem("");
    }
  };

  return (
    <>
      <div style={topStyles}>
        <label style={labelStyles}>{label}</label>
        <input
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          onKeyUp={onKeyUp}
          style={inputStyles}
        />
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {renderItem(item)}{" "}
            <button style={closeStyles} onClick={() => onItemRemoved(item)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesList;
