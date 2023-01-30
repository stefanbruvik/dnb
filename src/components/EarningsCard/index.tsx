import { FaAngleDown, FaAngleUp, FaClock } from "react-icons/fa";

import Button from "components/Button";
import { NumericFormat } from "react-number-format";
import type { Ticket } from "types";
import styles from "./earnings.module.scss";
import { useState } from "react";

type EarningsCardProps = {
  tickets: Ticket[];
};

const EarningsCard = (props: EarningsCardProps) => {
  const { tickets } = props;

  const [showTickets, setShowTickets] = useState(false);

  const handleShowTickets = () => {
    setShowTickets(!showTickets);
  };

  const totalSum = tickets?.reduce((acc, ticket) => {
    if (ticket.endTime) {
      const diff = ticket.endTime.toMillis() - ticket.startTime.toMillis();

      // Note: I used seconds for this demo.
      // Hours would be: Math.ceil(diff / 1000 / 60 / 60);
      const seconds = Math.ceil(diff / 1000);

      const arr = Array.from(Array(seconds).keys());
      const sum = arr.reduce((acc, v) => {
        const fee = v === 0 ? 50 : v <= 2 ? 30 : 10;
        return acc + fee;
      }, 0);

      return acc + sum;
    }

    return acc;
  }, 0);

  return (
    <div className={styles.root}>
      <h5>Earnings</h5>
      <div className={styles.total}>
        <div>NOK</div>
        <div>
          <NumericFormat value={totalSum} displayType="text" thousandSeparator=" " suffix={",-"} />
        </div>
      </div>
      {tickets && tickets.length > 0 && (
        <div className={styles.button}>
          <Button
            text={showTickets ? "Hide tickets" : "Show tickets"}
            icon={showTickets ? <FaAngleUp /> : <FaAngleDown />}
            size="small"
            variant="secondary"
            onClick={handleShowTickets}
          />
        </div>
      )}
      {showTickets && (
        <div className={styles.tickets}>
          <div className={styles.ticket}>
            <div>Pos</div>
            <div>Start</div>
            <div>End</div>
          </div>
          {tickets &&
            tickets.map((ticket, index) => {
              return (
                <div key={index} className={styles.ticket}>
                  <div>
                    F{ticket.floorNumber} S{ticket.spotNumber}
                  </div>
                  <div>{ticket.startTime.toFormat("HH:mm:ss")}</div>
                  <div>{ticket.endTime ? ticket.endTime?.toFormat("HH:mm:ss") : <FaClock />}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default EarningsCard;
