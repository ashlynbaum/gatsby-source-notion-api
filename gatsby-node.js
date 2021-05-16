const { ApolloClient, InMemoryCache, gql, split, HttpLink } = require("@apollo/client")
const { WebSocketLink } = require("@apollo/client/link/ws")
const { getMainDefinition } = require("@apollo/client/utilities")
const WebSocket = require("ws")
const fetch = require("node-fetch")


exports.onPreInit = () => console.log("Loaded gatsby-source-notion-api")

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Post`

const client = new ApolloClient({
    link: split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        )
      },
      new WebSocketLink({
        uri: `ws://gatsby-source-plugin-api.glitch.me/`,
        options: {
          reconnect: true,
        },
        webSocketImpl: WebSocket,
      }),
      new HttpLink({
        uri: "https://gatsby-source-plugin-api.glitch.me/",
        fetch,
      })
    ),
    cache: new InMemoryCache(),
  })

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const { data } = await client.query({
    query: gql`
      query {
        posts {
          id
          description
          slug
          imgUrl
          imgAlt
          author {
            id
            name
          }
        }
        authors {
          id
          name
        }
      }
    `,
  })

  // loop through data and create Gatsby nodes
  data.posts.forEach(post =>
    createNode({
      ...post,
      id: createNodeId(`${POST_NODE_TYPE}-${post.id}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    })
  )

  return
}
