import { useState } from "react";
import { useRouter } from "next/navigation";
import { CgSearch } from "react-icons/cg";
import styles from "./Search.module.scss";

export default function Search({ refetch, defaultValue = "" }: any) {
  const router = useRouter();
  const [search, setSearch] = useState(defaultValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push(search ? `?search=${search}` : "/");
    search && refetch();
  };

  function handleClear(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value.length) {
      router.push("/");
      refetch();
    }
  }

  return (
    <form className={styles.form}>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
          handleClear(e);
        }}
        type="search"
        placeholder="Search..."
        className={styles.input}
        value={search}
      />
      <button
        className={styles.button}
        onClick={handleClick}
        type="submit"
        name="search"
      >
        <CgSearch />
      </button>
    </form>
  );
}
