export interface IResponse {
  entities: {
    pages: Record<string, IPage>;
  };
  topLevelIds: string[];
}

export interface IPage {
  id: string;
  title: string;
  url: string;
  parentId: string;
  level: number;
  tabIndex: number;
  pages: string[];
  isActive?: boolean;
}
