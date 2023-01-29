import React from "react";
import styles from "./button.module.scss";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  icon?: JSX.Element;
  disabled?: boolean;
  variant?: "primary" | "secondary" | undefined;
};

const Button = (props: ButtonProps) => {
  const { onClick, text, icon, variant = "primary", disabled = false } = props;

  return (
    <button className={`${styles.root} ${styles[variant]}`} onClick={onClick} disabled={disabled}>
      {icon && icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
