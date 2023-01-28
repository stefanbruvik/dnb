import "normalize.css";
import "../../globals.scss";

import { EditModeContext } from "hooks/useEditMode";
import Floors from "components/Floors";
import { FloorsContext } from "hooks/useFloors";
import type { ParkingFloor } from "types";
import { SpotType } from "enums";
import { nth } from "lodash";
import styles from "./app.module.scss";
import { useState } from "react";

function App() {
  const [editMode, setEditMode] = useState(true);
  const [floors, setFloors] = useState<ParkingFloor[]>([]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const addFloor = () => {
    setFloors([...(floors ?? []), { spots: [{ type: SpotType.Compact }] }]);
  };

  const addSpot = (floorNumber: number) => {
    const currentFloor = nth(floors, floorNumber);
    if (currentFloor) {
      const newFloor = { ...currentFloor, spots: [...currentFloor.spots, { type: SpotType.Compact }] };
      const newFloors = floors?.map((floor, index) => (index === floorNumber ? newFloor : floor));

      setFloors(newFloors);
    }
  };

  return (
    <div className={styles.root}>
      <button onClick={toggleEditMode}>
        <span>{editMode ? "Turn edit mode off" : "Turn edit mode on"}</span>
      </button>

      <EditModeContext.Provider value={editMode}>
        <FloorsContext.Provider value={floors}>
          <Floors {...{ setFloors, addFloor, addSpot }} />
        </FloorsContext.Provider>
      </EditModeContext.Provider>
    </div>
  );
}

export default App;
