const { ApolloClient, InMemoryCache, gql, split, HttpLink } = require("@apollo/client")
const { WebSocketLink } = require("@apollo/client/link/ws")
const { getMainDefinition } = require("@apollo/client/utilities")
const WebSocket = require("ws")
const fetch = require("node-fetch")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { Client } = require('@notionhq/client');



// exports.onPreInit = () => console.log("Loaded gatsby-source-notion-api")
exports.onPreInit = (_, pluginOptions) => {
  console.log(
    `Your notion key is: ${pluginOptions.notionKey} \n Your database ID is ${pluginOptions.tableID}`
  )
}

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Post`


// const client = new ApolloClient({
//     link: split(
//       ({ query }) => {
//         const definition = getMainDefinition(query)
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         )
//       },
//       new WebSocketLink({
//         uri: `ws://gatsby-source-plugin-api.glitch.me/`,
//         options: {
//           reconnect: true,
//         },
//         webSocketImpl: WebSocket,
//       }),
//       new HttpLink({
//         uri: "https://api.notion.com/v1/databases/${pluginOptions.tableID}",
// 				credentials: "pluginOptions.notionKey",
//         fetch,
//       })
//     ),
//     cache: new InMemoryCache(),
//   })

	exports.sourceNodes = async ({
		actions,
		createContentDigest,
		createNodeId,
		getNodesByType,
		},
		pluginOptions
	) => {
		// const { createNode } = actions
		const notion = new Client({ auth: pluginOptions.notionKey });

		(async () => {
			const databaseId = pluginOptions.tableID;
			const client = await notion.databases.retrieve({ database_id: databaseId });
			console.log(client);
		})()
		// const { data } = await client.query({
		// 	query: gql`
		// 		query {
		// 			posts {
		// 				id
		// 				description
		// 				slug
		// 				imgUrl
		// 				imgAlt
		// 				author {
		// 					id
		// 					name
		// 				}
		// 			}
		// 			authors {
		// 				id
		// 				name
		// 			}
		// 		}
		// 	`,
		// })

		// loop through data and create Gatsby nodes
		// data.posts.forEach(post =>
		// 	createNode({
		// 		...post,
		// 		id: createNodeId(`${POST_NODE_TYPE}-${post.id}`),
		// 		parent: null,
		// 		children: [],
		// 		internal: {
		// 			type: POST_NODE_TYPE,
		// 			content: JSON.stringify(post),
		// 			contentDigest: createContentDigest(post),
		// 		},
		// 	})
		// )

  return
}

  // called each time a node is created
	exports.onCreateNode = async ({
    node, // the node that was just created
    actions: { createNode },
    createNodeId,
    getCache,
  }) => {
    if (node.internal.type === POST_NODE_TYPE) {
      const fileNode = await createRemoteFileNode({
        // the url of the remote image to generate a node for
        url: node.imgUrl,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      })
      if (fileNode) {
        node.remoteImage___NODE = fileNode.id
      }
    }
  }
