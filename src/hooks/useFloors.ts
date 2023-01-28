import type { ParkingFloor } from "types";
import React from "react";

export const FloorsContext = React.createContext<ParkingFloor[]>([]);
const useFloors = () => React.useContext(FloorsContext);

export default useFloors;
