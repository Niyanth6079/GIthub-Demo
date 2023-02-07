import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { searchRepositories } from "@/util/fetchData";
import RepositoryList from "@/components/Repository/RepositoryList";
import RepositorySearch from "@/components/Repository/RepositorySearch";

import classes from "../../styles/RepositoryPage.module.css";
import Head from "next/head";
import Custom404 from "../404";

function RepositoryListPage(props) {
  const [repositoryList, setReposioryList] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { keyword } = useRouter().query;

  const data = props.data.data.search.edges;

  useEffect(() => {
    setReposioryList(data);
  }, [data]);

  // render custom page when we get error when fetching data
  if (props.errorCode) {
    return <Custom404 statusCode={props.errorCode} />;
  }

  function pageHandler(index) {
    setPage(index);
  }

  function searchRepositoryHandler(searchKeyword) {
    if (keyword === searchKeyword) {
      return;
    }
    router.push(
      `/search?keyword=${searchKeyword}`,
      `/search?keyword=${searchKeyword}`,
      { shallow: false }
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Search: {keyword}</title>
      </Head>

      <div className={classes.search}>
        <RepositorySearch searchHandler={searchRepositoryHandler} />
      </div>

      <div className={classes.searchKeyword}>
        <h4>Showing Results for: {keyword}</h4>
      </div>

      {/* rendering 10 results per page */}
      <RepositoryList data={repositoryList.slice(page * 10 - 10, page * 10)} />

      {/* logic for showing pagination on the screen */}
      {repositoryList.length > 0 && (
        <div className={classes.pagination}>
          {!(page === 1) && (
            <span onClick={() => pageHandler(page - 1)}>Prev</span>
          )}

          {/* showing upto 10 pages based on results length */}
          {[...Array(Math.ceil(repositoryList.length / 10))].map((_, index) => {
            return (
              <span
                key={index}
                onClick={() => pageHandler(index + 1)}
                className={page == index + 1 ? classes.active : ""}
              >
                {index + 1}
              </span>
            );
          })}

          {!(page === Math.ceil(repositoryList.length / 10)) && (
            <span onClick={() => pageHandler(page + 1)}>Next</span>
          )}
        </div>
      )}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { keyword } = context.query;

  // if no keyword is found in query parameter return to homepage is called
  if (!keyword) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await searchRepositories(keyword);

  // setting error code if we have different status code
  const errorCode = response.ok ? false : response.status;

  const data = await response.json();

  return {
    props: {
      data,
      errorCode,
    },
  };
}

export default RepositoryListPage;
