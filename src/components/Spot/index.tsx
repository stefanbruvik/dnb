import { FaCar, FaChargingStation, FaClock, FaMotorcycle, FaWheelchair } from "react-icons/fa";
import type { ParkingSpot, Ticket } from "types";
import { getFloorAndSpot, getNextSpotType } from "./utils";

import { DateTime } from "luxon";
import { SpotType } from "enums";
import { findLast } from "lodash";
import styles from "./spot.module.scss";
import { useCallback } from "react";
import useEditMode from "hooks/useEditMode";
import useFloors from "hooks/useFloors";
import useTickets from "hooks/useTickets";

type SpotProps = {
  floorNumber: number;
  spotNumber: number;
  spot: ParkingSpot;
};

const Spot = (props: SpotProps) => {
  const { spot, floorNumber, spotNumber } = props;
  const { floors, setFloors } = useFloors();
  const editMode = useEditMode();
  const { tickets, setTickets } = useTickets();

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
        if (!currentSpot.occupied) {
          // Start parking
          const newTicket: Ticket = {
            floorNumber,
            spotNumber,
            startTime: DateTime.local()
          };

          setTickets([...tickets, newTicket]);
        } else {
          // End parking
          const ticket = findLast(tickets, t => t.floorNumber === floorNumber && t.spotNumber === spotNumber);
          if (ticket) {
            const modifiedTicket = { ...ticket, endTime: DateTime.local() };
            const modifiedTickets = tickets?.map(t =>
              t.floorNumber === floorNumber && t.spotNumber === spotNumber && !t.endTime ? modifiedTicket : t
            );

            setTickets(modifiedTickets);
          }
        }
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
      <div
        className={`${styles.card} ${styles[spot.type]} ${spot.occupied ? styles.occupied : ""} ${
          editMode ? styles.editmode : ""
        }`}
        onClick={e => (editMode ? toggleType(floorNumber, spotNumber) : toggleParking(floorNumber, spotNumber))}
      >
        <div className={styles.spot}>
          {(!spot.occupied || editMode) && (
            <>
              {spot.type === SpotType.Motorcycle && <FaMotorcycle size={iconSize} />}
              {spot.type === SpotType.Normal && <FaCar size={iconSize} />}
              {spot.type === SpotType.Compact && <FaCar size={iconSize} />}
              {spot.type === SpotType.Large && <FaCar size={iconSize} />}
              {spot.type === SpotType.Handicapped && <FaWheelchair size={iconSize} />}
              {spot.type === SpotType.Electrical && <FaChargingStation size={iconSize} />}
            </>
          )}
          {spot.occupied && !editMode && <FaClock size={iconSize} />}
        </div>
      </div>
    </div>
  );
};

export default Spot;
