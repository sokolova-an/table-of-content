import { useState } from "react";
import { useRouter } from "next/navigation";
import { CgSearch } from "react-icons/cg";
import styles from "./Search.module.scss";

export default function Search({ refetch }: any) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push(search ? `?search=${search}` : "/");
    search && refetch();
  };

  return (
    <form className={styles.form}>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="search"
        placeholder="Search..."
        className={styles.input}
      />
      <button className={styles.button} onClick={handleClick} type="submit">
        <CgSearch />
      </button>
    </form>
  );
}
