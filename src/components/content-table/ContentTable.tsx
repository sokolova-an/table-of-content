import React, { useContext, useState } from "react";
import { useSpring, animated } from "react-spring";
import { PagesContext } from "@/helpers/PageContext";
import TableItem from "../table-item/TableItem";
import { useTable } from "@/helpers/useTable/useTable";
import { addActiveParents } from "@/helpers/addActiveParents/addActiveParents";
import styles from "./ContentTable.module.scss";

export default function ContentTable({ pageId }: { pageId: string }) {
  const { pages, activePageId, setActivePageId } = useContext(PagesContext);
  const element = pages[pageId];
  const { mod, isPageActive, set, isParent } = useTable(
    activePageId,
    element,
    pages
  );
  const [isOpen, setIsOpen] = useState(element?.isActive || isParent || false);

  const animation = useSpring({
    from: {
      opacity: 0,
      transform: "scaleY(0)",
      transformOrigin: "top",
    },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "scaleY(1)" : "scaleY(0)",
      transformOrigin: "top",
      transition: "opacity 100ms, transform 50ms",
    },
  });

  const handleClick = () => {
    addActiveParents(set, pages, element);
    setIsOpen((prevState) => !prevState);
    setActivePageId(element.id);
  };

  return (
    <>
      <TableItem
        onClick={handleClick}
        element={element}
        isActive={isPageActive}
        key={element.id}
        mod={mod}
        isParent={isParent}
        isOpen={isOpen}
      >
        {element.title}
      </TableItem>
      {element.pages && isOpen && (
        <animated.ul
          id={element.id}
          className={`${styles.list} ${styles[mod]}`}
          style={{
            ...animation,
          }}
        >
          {element.pages.map(
            (innerPageId) =>
              pages[innerPageId] && (
                <ContentTable pageId={innerPageId} key={innerPageId} />
              )
          )}
        </animated.ul>
      )}
    </>
  );
}
