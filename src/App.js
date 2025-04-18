import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import styles from "./App.module.css";

const ItemTypes = { TEXT: "text" };

const DraggableItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TEXT,
    item: { name },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  return (
    <div ref={drag} className={styles.item} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
    </div>
  );
};

const Canvas = () => {
  const [items, setItems] = useState([]);
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TEXT,
    drop: (item) => setItems((prev) => [...prev, item.name]),
  }));
  return (
    <div ref={drop} className={styles.canvas}>
      {items.map((item, i) => (
        <div key={i} className={styles.droppedItem}>{item}</div>
      ))}
    </div>
  );
};

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <h1 className={styles.header}>StoryWeave</h1>
        <div className={styles.editor}>
          <div className={styles.sidebar}>
            <DraggableItem name="Text Box" />
            <DraggableItem name="Image" />
          </div>
          <Canvas />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;