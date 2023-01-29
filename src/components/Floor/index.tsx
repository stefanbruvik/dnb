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

type FloorProps = {
  floorNumber: number;
  spots: ParkingSpot[];
  setFloors: any;
};

const Floor = (props: FloorProps) => {
  const { floorNumber, spots, setFloors } = props;

  const editMode = useEditMode();
  const floors = useFloors();

  const addSpot = useCallback(
    (floorNumber: number) => {
      const currentFloor = nth(floors, floorNumber);
      if (currentFloor) {
        const newFloor = {
          ...currentFloor,
          spots: [...currentFloor.spots, { type: SpotType.Compact, occupied: false }]
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
    <div className={styles.root}>
      <div className={styles.header}>
        <h4>Floor {floorNumber}</h4>
        {editMode && (
          <div className={styles.buttons}>
            <Button onClick={e => addSpot(floorNumber)} icon={<FaPlus />} text="Add spot" />
            <Button
              variant="secondary"
              disabled={spots.length === 0}
              onClick={e => removeSpot(floorNumber)}
              icon={<FaTrashAlt />}
              text="Remove spot"
            />
          </div>
        )}
      </div>

      <div className={styles.wrap}>
        <AvailabilityCard spots={spots} />

        <div className={styles.spots}>
          {spots.map((spot, spotNumber) => (
            <Spot
              key={`floor${floorNumber}-spot${spotNumber}`}
              spot={spot}
              floorNumber={floorNumber}
              spotNumber={spotNumber}
              setFloors={setFloors}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Floor;
