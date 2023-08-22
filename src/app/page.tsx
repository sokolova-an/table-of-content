"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getData } from "@/helpers/getData";
import Loader from "@/components/loader/Loader";
import ContentTable from "@/components/content-table/ContentTable";
import { PagesContext } from "@/helpers/PageContext";
import Search from "@/components/search/Search";
import { IResponse } from "@/types/types";
import styles from "./page.module.scss";

export default function App() {
  const searchParams = useSearchParams();

  const { data, isLoading, isError, refetch } = useQuery<IResponse>(
    ["data", searchParams.get("search")],
    getData
  );

  const [activePageId, setActivePageId] = useState("");

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <Search refetch={refetch} />
        {isLoading ? (
          <Loader />
        ) : (
          <PagesContext.Provider
            value={{
              pages: data.entities.pages,
              activePageId,
              setActivePageId,
            }}
          >
            {data.topLevelIds.map((item) => (
              <ul key={item + "-ul"}>
                <ContentTable pageId={item} />
              </ul>
            ))}
          </PagesContext.Provider>
        )}
      </aside>
      <main className={styles.main}>Page</main>
    </div>
  );
}
