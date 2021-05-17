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
const PAGE_NODE_TYPE = `Page`




exports.sourceNodes = async ({
		actions,
		createContentDigest,
		createNodeId,
		getNodesByType,
		},
		pluginOptions
	) => {
		const { createNode } = actions
		const notion = new Client({ auth: pluginOptions.notionKey });
		const databaseId = pluginOptions.tableID;
			
		const client = await notion.databases.retrieve({ database_id: databaseId });
		// console.log(client);

		const database = await notion.databases.query({
			database_id: databaseId,
			// filter: {
			// 	or: [
			// 		{
			// 			property: 'In stock',
			// 			checkbox: {
			// 				equals: true,
			// 			},
			// 		},
			// 		{
			// 			property: 'Cost of next trip',
			// 			number: {
			// 				greater_than_or_equal_to: 2,
			// 			},
			// 		},
			// 	],
			// },
			// sorts: [
			// 	{
			// 		property: 'Last ordered',
			// 		direction: 'ascending',
			// 	},
			// ],
		});
		// console.log(database);


// update so that query matches client properties keys
// [{properties: {key: value}}] 

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



		// console.log(database.results);
		database.results.forEach( page =>
			createNode({
				id: createNodeId(`${PAGE_NODE_TYPE}-${page.ID}`),
				parent: null,
				children: [],
				internal: {
					type: PAGE_NODE_TYPE,
					content: JSON.stringify(page),
					contentDigest: createContentDigest(page),
				},
			});

			console.log(page);
					//  grab page data
					// create node per page


		)

  return
}

// update Images to support remote images

  // called each time a node is created
	// exports.onCreateNode = async ({
  //   node, // the node that was just created
  //   actions: { createNode },
  //   createNodeId,
  //   getCache,
  // }) => {
  //   if (node.internal.type === POST_NODE_TYPE) {
  //     const fileNode = await createRemoteFileNode({
  //       // the url of the remote image to generate a node for
  //       url: node.imgUrl,
  //       parentNodeId: node.id,
  //       createNode,
  //       createNodeId,
  //       getCache,
  //     })
  //     if (fileNode) {
  //       node.remoteImage___NODE = fileNode.id
  //     }
  //   }
  // }
