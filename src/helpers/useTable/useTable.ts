import { IPage } from "@/types/types";

const set = new Set("");
export const useTable = (
  activePageId: string,
  element: IPage,
  pages: Record<string, IPage>
) => {
  const isPageActive = activePageId === element.id;
  const isParent = set.has(element.id);
  const level = element.level;

  const isActiveParent = element.id === pages[activePageId]?.parentId;
  let mod = "";
  if (isParent || isPageActive) {
    if (level >= 1 && (isPageActive || isActiveParent)) {
      mod = "dark";
    } else {
      mod = "light";
    }
  }

  return { mod, isPageActive, set, isParent };
};
