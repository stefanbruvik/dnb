import "normalize.css";
import "styles/globals.scss";

import { useCallback, useState } from "react";

import Button from "components/Button";
import { EditModeContext } from "hooks/useEditMode";
import { FaRegEdit } from "react-icons/fa";
import Floors from "components/Floors";
import { FloorsContext } from "hooks/useFloors";
import type { ParkingFloor } from "types";
import styles from "./app.module.scss";

function App() {
  const [editMode, setEditMode] = useState(true);
  const [floors, setFloors] = useState<ParkingFloor[]>([]);

  const toggleEditMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode, setEditMode]);

  return (
    <div className={styles.root}>
      <Button onClick={toggleEditMode} text={"Toggle edit mode"} icon={<FaRegEdit />} />

      <EditModeContext.Provider value={editMode}>
        <FloorsContext.Provider value={floors}>
          <Floors {...{ setFloors }} />
        </FloorsContext.Provider>
      </EditModeContext.Provider>
    </div>
  );
}

export default App;
