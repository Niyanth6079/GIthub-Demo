import RepositoryDetials from "@/components/Repository/RepositoryDetails";
import Custom404 from "@/pages/404";
import { findRepository } from "@/util/fetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

import classes from "../../../styles/RepositoryDetailsPage.module.css";

function RepositoryDetailsPage(props) {
  const router = useRouter();

  const returnToHomeHandler = () => {
    router.replace("/");
  };

  // render custom page when we get error when fetching data
  if (props.errorCode) {
    return <Custom404 statusCode={props.errorCode} />;
  }

  // render this components when fetch couldn't find the repository
  if (props.data.errors) {
    return (
      <Fragment>
        <Head>
          <title>Could not find the repository</title>
        </Head>

        <div className={classes.content}>
          <h3>
            Could not find the repository with this id:{" "}
            {router.query.repositoryId}
          </h3>
          <div className={classes.action}>
            <button onClick={returnToHomeHandler} className={classes.button}>
              return to home page
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  const data = props.data.data.node;

  return (
    <Fragment>
      <Head>
        <title>{data.nameWithOwner}</title>
      </Head>
      <RepositoryDetials data={data} />;
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const repositoryId = context.params.repositoryId;

  const response = await findRepository(repositoryId);

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

export default RepositoryDetailsPage;
