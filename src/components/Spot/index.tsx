import { FaCar, FaChargingStation, FaClock, FaMotorcycle, FaWheelchair } from "react-icons/fa";
import { getFloorAndSpot, getNextSpotType } from "./utils";

import type { ParkingSpot } from "types";
import { SpotType } from "enums";
import styles from "./spot.module.scss";
import { useCallback } from "react";
import useEditMode from "hooks/useEditMode";
import useFloors from "hooks/useFloors";

type SpotProps = {
  floorNumber: number;
  spotNumber: number;
  spot: ParkingSpot;
  setFloors: any;
};

const Spot = (props: SpotProps) => {
  const { spot, setFloors, floorNumber, spotNumber } = props;
  const floors = useFloors();
  const editMode = useEditMode();

  const toggleType = (floorNumber: number, spotNumber: number) => {
    const { currentFloor, currentSpot } = getFloorAndSpot(floors, floorNumber, spotNumber);

    if (currentFloor && currentSpot) {
      const newSpot = { ...currentSpot, type: getNextSpotType(currentSpot) };
      const newSpots = currentFloor.spots.map((spot, index) => (index === spotNumber ? newSpot : spot));
      const newFloor = { ...currentFloor, spots: newSpots };
      const newFloors = floors?.map((floor, index) => (index === floorNumber ? newFloor : floor));

      setFloors(newFloors);
    }
  };

  const toggleParking = useCallback(
    (floorNumber: number, spotNumber: number) => {
      const { currentFloor, currentSpot } = getFloorAndSpot(floors, floorNumber, spotNumber);

      if (currentFloor && currentSpot) {
        const newSpot = { ...currentSpot, occupied: !currentSpot.occupied };
        const newSpots = currentFloor.spots.map((spot, index) => (index === spotNumber ? newSpot : spot));
        const newFloor = { ...currentFloor, spots: newSpots };
        const newFloors = floors?.map((floor, index) => (index === floorNumber ? newFloor : floor));

        setFloors(newFloors);
      }
    },
    [floors, setFloors]
  );

  const iconSize = 24;

  return (
    <div className={styles.root}>
      {spot.occupied && <FaClock size={44} className={styles.clock} />}
      <div
        className={`${styles.card} ${styles[spot.type]} ${spot.occupied ? styles.occupied : ""}`}
        onClick={e => (editMode ? toggleType(floorNumber, spotNumber) : toggleParking(floorNumber, spotNumber))}
      >
        <div className={styles.spot}>
          {spot.type === SpotType.Motorcycle && <FaMotorcycle size={iconSize} />}
          {spot.type === SpotType.Compact && <FaCar size={iconSize} />}
          {spot.type === SpotType.Large && <FaCar size={iconSize} />}
          {spot.type === SpotType.Handicapped && <FaWheelchair size={iconSize} />}
          {spot.type === SpotType.Electrical && <FaChargingStation size={iconSize} />}
        </div>
      </div>
    </div>
  );
};

export default Spot;
