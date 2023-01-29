import { SpotType } from "./enums";

export type ParkingSpot = {
  type: SpotType;
  occupied: boolean;
};

export type ParkingFloor = {
  spots: ParkingSpot[];
};
