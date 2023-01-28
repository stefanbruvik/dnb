import type { ParkingSpot } from "types";
import Spot from "components/Spot";
import styles from "./floor.module.scss";
import useEditMode from "hooks/useEditMode";

type FloorProps = {
  floorNumber: number;
  spots: ParkingSpot[];
  addSpot: any;
  setFloors: any;
};

const Floor = (props: FloorProps) => {
  const { floorNumber, spots, addSpot, setFloors } = props;

  const editMode = useEditMode();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h4>Floor {floorNumber}</h4>
        {editMode && (
          <button onClick={e => addSpot(floorNumber)}>
            <span>Add spot</span>
          </button>
        )}
      </div>
      <div className={styles.spots}>
        {spots.map((spot, spotNumber) => (
          <Spot
            key={`floor${floorNumber}-spot${spotNumber}`}
            spot={spot}
            floorNumber={floorNumber}
            spotNumber={spotNumber}
            setFloors={setFloors}
          />
        ))}
      </div>
    </div>
  );
};

export default Floor;
