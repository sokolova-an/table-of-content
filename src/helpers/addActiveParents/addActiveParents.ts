import { IPage } from "@/types/types";

export const addActiveParents = (
  set: Set<string>,
  pages: Record<string, IPage>,
  element: IPage
): void => {
  let parentId = element.parentId;

  set.clear();
  while (parentId !== "ij") {
    set.add(parentId);
    parentId = pages[parentId].parentId;
  }
};
