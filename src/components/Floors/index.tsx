import { FaPlus, FaTrashAlt } from "react-icons/fa";

import Button from "components/Button";
import Floor from "components/Floor";
import { dropRight } from "lodash";
import styles from "./floors.module.scss";
import { useCallback } from "react";
import useEditMode from "hooks/useEditMode";
import useFloors from "hooks/useFloors";

type FloorsProps = {
  setFloors: any;
};

const Floors = (props: FloorsProps) => {
  const { setFloors } = props;

  const editMode = useEditMode();
  const floors = useFloors();

  const addFloor = useCallback(() => {
    setFloors([...(floors ?? []), { spots: [] }]);
  }, [floors, setFloors]);

  const removeFloor = useCallback(() => {
    setFloors(dropRight(floors));
  }, [floors, setFloors]);

  return (
    <div className={styles.root}>
      {editMode && (
        <div className={styles.buttons}>
          <Button onClick={addFloor} icon={<FaPlus />} text="Add floor" />
          <Button
            variant="secondary"
            disabled={floors.length === 0}
            onClick={removeFloor}
            icon={<FaTrashAlt />}
            text="Remove floor"
          />
        </div>
      )}
      <div className={styles.floors}>
        {floors?.map((floor, index) => (
          <Floor key={index} floorNumber={index} spots={floor.spots} setFloors={setFloors} />
        ))}
      </div>
    </div>
  );
};

export default Floors;
