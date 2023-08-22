import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableItem from "./TableItem";
import { IPage } from "@/types/types";

const element = {
  id: "page-1",
  level: 1,
  pages: ["dd"],
  title: "-",
  url: "-",
  parentId: "-",
  tabIndex: 1,
} as IPage;

const props = {
  element,
  onClick: jest.fn(),
  isActive: true,
  isParent: false,
  isOpen: false,
  mod: "dark",
};

describe("TableItem", () => {
  it("should render correctly", () => {
    const { getByText, container } = render(
      <TableItem {...props}>Content</TableItem>
    );

    const contentElement = getByText("Content");
    expect(contentElement).toBeInTheDocument();

    const listItemElement = container.querySelector("li");
    expect(listItemElement).toHaveClass("dark");
    expect(listItemElement).toHaveClass("activeItem");
  });

  it("should trigger onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <TableItem {...props} onClick={onClickMock}>
        Content
      </TableItem>
    );

    const contentElement = getByText("Content");
    fireEvent.click(contentElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should render without icon when element has no children", () => {
    const { queryByTestId } = render(
      // @ts-ignore
      <TableItem {...props} element={{ ...element, pages: undefined }}>
        Content
      </TableItem>
    );

    const iconElement = queryByTestId("icon");
    expect(iconElement).not.toBeInTheDocument();
  });
});
