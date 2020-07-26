import React from "react";
import { Button, ITouchEvent } from "@tarojs/components";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: (event: ITouchEvent) => unknown;
  className?: string;
};

/**
 * 蓝色的最大的那个 button
 */
const PrimaryButton = ({ onClick, children, className }: Props) => (
  <Button onClick={onClick} className={`${styles.primaryButton} ${className}`}>
    {children}
  </Button>
);

export default PrimaryButton;
