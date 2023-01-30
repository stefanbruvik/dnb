import "normalize.css";
import "styles/globals.scss";

import { FaRegArrowAltCircleLeft, FaRegEdit } from "react-icons/fa";
import { ParkingFloor, Ticket } from "types";
import { useCallback, useMemo, useState } from "react";

import AvailabilityCard from "components/AvailabilityCard";
import Button from "components/Button";
import EarningsCard from "components/EarningsCard";
import { EditModeContext } from "hooks/useEditMode";
import Floors from "components/Floors";
import { FloorsContext } from "hooks/useFloors";
import Message from "components/Message";
import { TicketsContext } from "hooks/useTickets";
import { flatMap } from "lodash";
import messages from "text.json";
import styles from "./app.module.scss";

function App() {
  const [editMode, setEditMode] = useState(true);
  const [floors, setFloors] = useState<ParkingFloor[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const toggleEditMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode, setEditMode]);

  const allSpots = useMemo(() => flatMap(floors, f => f.spots), [floors]);

  return (
    <div className={styles.root}>
      <div className={styles.appbar}>
        <h2>Parking Garage</h2>
        <Button
          onClick={toggleEditMode}
          text={editMode ? "Exit edit mode" : "Edit"}
          icon={editMode ? <FaRegArrowAltCircleLeft /> : <FaRegEdit />}
        />
      </div>

      <EditModeContext.Provider value={editMode}>
        <FloorsContext.Provider value={floors}>
          <TicketsContext.Provider value={{ tickets, setTickets }}>
            <div className={styles.cardsRow}>
              <div className={`${styles.cards} ${editMode ? styles.editmode : ""}`}>
                <AvailabilityCard spots={allSpots} />
                <EarningsCard tickets={tickets} />
              </div>
              {editMode && <Message title="Instructions" text={messages.editmode} />}
              {!editMode && <Message title="Instructions" text={messages.instructions} />}
            </div>
            <Floors {...{ setFloors }} />
          </TicketsContext.Provider>
        </FloorsContext.Provider>
      </EditModeContext.Provider>
    </div>
  );
}

export default App;
