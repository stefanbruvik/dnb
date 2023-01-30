import type { ParkingFloor } from "types";
import React from "react";

type ParkingFloorsContextType = {
  floors: ParkingFloor[];
  setFloors: React.Dispatch<React.SetStateAction<ParkingFloor[]>>;
};

export const FloorsContext = React.createContext<ParkingFloorsContextType>({
  floors: [],
  setFloors: () => {
    return;
  }
});
const useFloors = () => React.useContext(FloorsContext);

export default useFloors;
