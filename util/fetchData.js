const API_URL = "https://api.github.com/graphql";

// to search for list of repositories based on keyword
export async function searchRepositories(keyword) {
  const query = `
    query {
      search(query: "${keyword}", type: REPOSITORY, first: 100) {
        edges {
          node {
            ... on Repository {
                id
              description
              nameWithOwner
            }
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return response;
}

// to search for a specific repository based on id
export async function findRepository(repositoryId) {
  const query = `
      query {
        node(id: "${repositoryId}") {
          ... on Repository {
            nameWithOwner
            url
            createdAt
            pushedAt
            description
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            repositoryTopics(first: 5){
                edges{
                    node{
                        topic{
                            name
                        }
                    }
                }
            }
            primaryLanguage {
              name
            }
          }
        }
      }      
    `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return response;
}
