import React from "react";
import { RxTriangleRight } from "react-icons/rx";
import { useSpring, animated } from "react-spring";
import styles from "./TableItem.module.scss";
import { IPage } from "@/types/types";

interface ITableItem {
  element: IPage;
  mod: string;
  isOpen: boolean;
  isParent: boolean;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TableItem = ({
  element,
  onClick,
  isActive,
  isParent,
  isOpen,
  mod,
  children,
}: ITableItem) => {
  const hasChildren = !!element.pages;
  const paddingLeft = (element.level + 1) * 16 - (hasChildren ? 20 : 0);

  const springs = useSpring({
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform:
        (isActive && isOpen) || isParent ? `rotate(90deg)` : `rotate(0deg)`,
    },
    delay: 100,
  });

  return (
    <li
      key={element.id}
      onClick={onClick}
      className={`${styles.item} ${styles[mod]} ${
        isActive && styles.activeItem
      }`}
      style={{ paddingLeft }}
    >
      {hasChildren && (
        <animated.i className={styles.icon} style={{ ...springs }}>
          <RxTriangleRight />
        </animated.i>
      )}
      <span>{children}</span>
    </li>
  );
};
export default TableItem;
