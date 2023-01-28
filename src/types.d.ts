import { SpotType } from "./enums";

export type ParkingSpot = {
  type: SpotType;
};

export type ParkingFloor = {
  spots: ParkingSpot[];
};
