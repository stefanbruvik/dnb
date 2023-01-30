import { FaCar, FaChargingStation, FaMotorcycle, FaWheelchair } from "react-icons/fa";

import { SpotType } from "enums";

export const getIcon = (type: SpotType) => {
  switch (type) {
    case SpotType.Handicapped:
      return <FaWheelchair />;
    case SpotType.Electrical:
      return <FaChargingStation />;
    case SpotType.Motorcycle:
      return <FaMotorcycle />;
    default:
      return <FaCar />;
  }
};
