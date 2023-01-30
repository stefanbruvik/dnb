import { NumericFormat } from "react-number-format";
import type { Ticket } from "types";
import styles from "./earnings.module.scss";

type EarningsCardProps = {
  tickets: Ticket[];
};

const EarningsCard = (props: EarningsCardProps) => {
  const { tickets } = props;

  const totalSum = tickets?.reduce((acc, ticket) => {
    if (ticket.endTime) {
      const diff = ticket.endTime.toMillis() - ticket.startTime.toMillis();
      const dur = Math.ceil(diff / 1000);

      const arr = Array.from(Array(dur).keys());
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
          <NumericFormat value={totalSum} displayType="text" thousandSeparator=" " />
        </div>
      </div>
      {/* {tickets &&
        tickets.map((ticket, index) => {
          return (
            <div key={index}>
              Ticket {ticket.floorNumber} {ticket.spotNumber} {ticket.startTime.toFormat("HH:mm:ss")} -{" "}
              {ticket.endTime?.toFormat("HH:mm:ss")}
            </div>
          );
        })} */}
      {/* Sum: {totalSum} */}
    </div>
  );
};

export default EarningsCard;
