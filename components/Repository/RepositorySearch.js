import { useRouter } from "next/router";
import { useRef } from "react";
import Card from "../ui/Card";

import classes from "./RepositorySearch.module.css";

function RepositorySearch(props) {
  const router = useRouter();
  const searchQuery = useRef();

  function submitHandler(event) {
    event.preventDefault();
    if (searchQuery.current.value.trim() === "") {
      return;
    }
    props.searchHandler(searchQuery.current.value.trim());
  }

  function buttonHandler() {
    router.push("/");
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="gitSearch">Search Github Repository</label>
          <input
            type="text"
            name="gitSearch"
            id="gitSearch"
            ref={searchQuery}
          />
        </div>

        <div className={classes.actions}>
          <button type="submit">Search</button>

          {router.pathname === "/search" && (
            <button type="button" onClick={buttonHandler}>
              Home
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default RepositorySearch;
