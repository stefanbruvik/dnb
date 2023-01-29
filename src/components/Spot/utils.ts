import type { ParkingFloor, ParkingSpot } from "types";

import { SpotType } from "enums";
import { nth } from "lodash";

export const getNextSpotType = (spot: ParkingSpot) => {
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

export const getFloorAndSpot = (floors: ParkingFloor[], floorNumber: number, spotNumber: number) => {
  const currentFloor = nth(floors, floorNumber);
  if (currentFloor) {
    const currentSpot = nth(currentFloor.spots, spotNumber);
    if (currentSpot) {
      return { currentFloor, currentSpot };
    }
  }
  return {};
};
