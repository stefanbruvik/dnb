import Floor from "components/Floor";
import styles from "./floors.module.scss";
import useEditMode from "hooks/useEditMode";
import useFloors from "hooks/useFloors";

type FloorsProps = {
  setFloors: any;
  addFloor: any;
  addSpot: any;
};

const Floors = (props: FloorsProps) => {
  const { addFloor, addSpot, setFloors } = props;

  const floors = useFloors();

  const editMode = useEditMode();

  return (
    <div className={styles.root}>
      {editMode && (
        <button onClick={addFloor}>
          <span>Add floor</span>
        </button>
      )}
      <div className={styles.floors}>
        {floors?.map((floor, index) => (
          <Floor key={index} floorNumber={index} spots={floor.spots} addSpot={addSpot} setFloors={setFloors} />
        ))}
      </div>
    </div>
  );
};

export default Floors;
