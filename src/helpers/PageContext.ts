import { createContext } from "react";
import { IPage } from "@/types/types";

interface IContext {
  pages: Record<string, IPage>;
  activePageId: string;
  setActivePageId: React.Dispatch<React.SetStateAction<string>>;
}

export const PagesContext = createContext<IContext>({
  pages: {},
  activePageId: "",
  setActivePageId: () => {},
});
