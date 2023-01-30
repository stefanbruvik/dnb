import { groupBy, sortBy, toPairs, upperFirst } from "lodash";

import type { ParkingSpot } from "types";
import { SpotType } from "enums";
import { getIcon } from "./utils";
import styles from "./availability.module.scss";
import useEditMode from "hooks/useEditMode";

type AvailabilityCardProps = {
  spots: ParkingSpot[];
};

const AvailabilityCard = (props: AvailabilityCardProps) => {
  const { spots } = props;

  const editMode = useEditMode();

  const spotsByType = groupBy(spots, "type");
  const typePair = sortBy(toPairs(spotsByType), o => o[0]) as [SpotType, ParkingSpot[]][];
  const totalAvailable = spots.reduce((acc, spot) => acc + (spot.occupied ? 0 : 1), 0);

  return (
    <div className={`${styles.root} ${totalAvailable === 0 && !editMode ? styles.full : ""}`}>
      <h5>Availability</h5>
      <div className={styles.total}>
        <div>{totalAvailable}</div>
        <div>of {spots.length}</div>
      </div>

      {typePair.map((pair, index) => {
        return (
          <div key={index} className={styles.row}>
            <div className={styles.iconAndType}>
              {getIcon(pair[0])} {upperFirst(pair[0])}:
            </div>
            <div>
              <span>{pair[1].reduce((acc, spot) => acc + (spot.occupied ? 0 : 1), 0)}</span>
              {<span>of {pair[1].length}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityCard;
