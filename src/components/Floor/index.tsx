import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { dropRight, nth } from "lodash";

import AvailabilityCard from "components/AvailabilityCard";
import Button from "components/Button";
import type { ParkingSpot } from "types";
import Spot from "components/Spot";
import { SpotType } from "enums";
import styles from "./floor.module.scss";
import { useCallback } from "react";
import useEditMode from "hooks/useEditMode";
import useFloors from "hooks/useFloors";
import useTickets from "hooks/useTickets";

type FloorProps = {
  floorNumber: number;
  spots: ParkingSpot[];
};

const Floor = (props: FloorProps) => {
  const { floorNumber, spots } = props;

  const editMode = useEditMode();
  const { floors, setFloors } = useFloors();
  const tickets = useTickets();

  const addSpot = useCallback(
    (floorNumber: number) => {
      const currentFloor = nth(floors, floorNumber);
      if (currentFloor) {
        const newFloor = {
          ...currentFloor,
          spots: [...currentFloor.spots, { type: SpotType.Normal, occupied: false }]
        };
        const newFloors = floors?.map((floor, index) => (index === floorNumber ? newFloor : floor));

        setFloors(newFloors);
      }
    },
    [floors, setFloors]
  );

  const removeSpot = useCallback(
    (floorNumber: number) => {
      const currentFloor = nth(floors, floorNumber);
      if (currentFloor) {
        const modifiedFloor = { ...currentFloor, spots: dropRight(currentFloor.spots) };
        const newFloors = floors?.map((floor, index) => (index === floorNumber ? modifiedFloor : floor));

        setFloors(newFloors);
      }
    },
    [floors, setFloors]
  );

  return (
    <div className={`${styles.root} ${editMode ? styles.editmode : ""}`}>
      <div className={styles.header}>
        <h4>Floor {floorNumber}</h4>
        <div className={`${styles.buttons} ${editMode ? styles.editmode : ""}`}>
          <Button onClick={e => addSpot(floorNumber)} icon={<FaPlus />} text="Add spot" />
          <Button
            variant="secondary"
            disabled={spots.length === 0}
            onClick={e => removeSpot(floorNumber)}
            icon={<FaTrashAlt />}
            text="Remove spot"
          />
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={`${styles.card} ${editMode ? styles.editmode : ""}`}>
          <AvailabilityCard spots={spots} />
        </div>

        <div className={styles.spots}>
          {spots.map((spot, spotNumber) => (
            <Spot
              key={`floor${floorNumber}-spot${spotNumber}`}
              spot={spot}
              floorNumber={floorNumber}
              spotNumber={spotNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Floor;
