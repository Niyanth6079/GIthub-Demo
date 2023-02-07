import Head from "next/head";
import { useRouter } from "next/router";

import RepositorySearch from "@/components/Repository/RepositorySearch";

import classes from "../styles/HomePage.module.css";
import { Fragment } from "react";

function HomePage() {
  const router = useRouter();

  function searchRepositoryHandler(keyword) {
    router.push(`/search?keyword=${keyword}`);
  }

  return ( <Fragment>
    <Head>
      <title>Home Page</title>
    </Head>
    <div className={classes.search}>
      <RepositorySearch searchHandler={searchRepositoryHandler} />
    </div>
  </Fragment>
    
  );
}

export default HomePage;
