import { FaCar, FaChargingStation, FaMotorcycle, FaWheelchair } from "react-icons/fa";

import type { ParkingSpot } from "types";
import { SpotType } from "enums";
import { nth } from "lodash";
import styles from "./spot.module.scss";
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

  const getFloorAndSpot = (floorNumber: number, spotNumber: number) => {
    const currentFloor = nth(floors, floorNumber);
    if (currentFloor) {
      const currentSpot = nth(currentFloor.spots, spotNumber);
      if (currentSpot) {
        return { currentFloor, currentSpot };
      }
    }
    return {};
  };

  const nextType = (spot: ParkingSpot) => {
    if (spot.type === SpotType.Compact) {
      return SpotType.Large;
    }

    if (spot.type === SpotType.Large) {
      return SpotType.Handicapped;
    }

    if (spot.type === SpotType.Handicapped) {
      return SpotType.Motorcycle;
    }

    if (spot.type === SpotType.Motorcycle) {
      return SpotType.Electrical;
    }

    return SpotType.Compact;
  };

  const toggleType = (floorNumber: number, spotNumber: number) => {
    const { currentFloor, currentSpot } = getFloorAndSpot(floorNumber, spotNumber);

    if (currentFloor && currentSpot) {
      const newSpot = { ...currentSpot, type: nextType(currentSpot) };
      const newSpots = currentFloor.spots.map((spot, index) => (index === spotNumber ? newSpot : spot));
      const newFloor = { ...currentFloor, spots: newSpots };
      const newFloors = floors?.map((floor, index) => (index === floorNumber ? newFloor : floor));

      setFloors(newFloors);
    }
  };

  const toggleParking = (floorNumber: number, spotNumber: number) => {
    const { currentFloor, currentSpot } = getFloorAndSpot(floorNumber, spotNumber);
    if (currentFloor && currentSpot) {
      console.log(currentFloor, currentSpot);
    }
  };

  return (
    <>
      <div
        className={`${styles.root} ${styles[spot.type]}`}
        onClick={e => (editMode ? toggleType(floorNumber, spotNumber) : toggleParking(floorNumber, spotNumber))}
      >
        <div className={styles.spot}>
          <span>{spotNumber}</span>
          {spot.type === SpotType.Motorcycle && <FaMotorcycle />}
          {spot.type === SpotType.Compact && <FaCar />}
          {spot.type === SpotType.Large && <FaCar />}
          {spot.type === SpotType.Handicapped && <FaWheelchair />}
          {spot.type === SpotType.Electrical && <FaChargingStation />}
        </div>
      </div>
    </>
  );
};

export default Spot;
