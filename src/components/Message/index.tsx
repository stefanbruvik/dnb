import { FaInfoCircle } from "react-icons/fa";
import styles from "./message.module.scss";

type MessageProps = {
  title: string;
  text: string;
};

const Message = (props: MessageProps) => {
  const { title, text } = props;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <FaInfoCircle /> {title}
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Message;
