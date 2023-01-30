import { DateTime } from "luxon";
import { SpotType } from "./enums";

export type ParkingSpot = {
  type: SpotType;
  occupied: boolean;
};

export type ParkingFloor = {
  spots: ParkingSpot[];
};

export type Ticket = {
  floorNumber: number;
  spotNumber: number;
  startTime: DateTime;
  endTime?: DateTime;
};
