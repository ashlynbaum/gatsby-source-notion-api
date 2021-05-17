<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Notion Source API Gatsby Plugin
</h1>

# gatsby-source-notion-api
This plugin reads a notion table, and renders the contents of the pages and properties in the table.



## 🚀 Quick start


If you already have a Gatsby site, you can use it. Otherwise, you can [create a new Gatsby site](https://www.gatsbyjs.com/tutorial/part-zero/#create-a-gatsby-site) to test your plugin.

Your directory structure will look similar to this:

```text
/my-gatsby-site
├── gatsby-config.js
└── /src
    └── /pages
        └── /index.js
/my-plugin
├── gatsby-browser.js
├── gatsby-node.js
├── gatsby-ssr.js
├── index.js
├── package.json
└── README.md
```

With `my-gatsby-site` being your Gatsby site, and `my-plugin` being your plugin. You could also include the plugin in your [site's `plugins` folder](https://www.gatsbyjs.com/docs/loading-plugins-from-your-local-plugins-folder/).

2. Include the plugin in a Gatsby site

Inside of the `gatsby-config.js` file of your site (in this case, `my-gatsby-site`), include the plugin in the `plugins` array:

```javascript
module.exports = {
  plugins: [{
    resolve: require.resolve(`../gatsby-source-notion-api`),
    options: {
      tableID: "67873ebd7f5e4b8a968cb69909a889a1",
      notionKey: "secret_Ba6SXUWEUb5iRqfWWkRjR9UgKjnsFkpxED1iwrk0aa1"
    }
  }],
}
}
```

Replace the `tableID` and `notionKey` with your own
The line `require.resolve('../my-plugin')` is what accesses the plugin based on its filepath on your computer, and adds it as a plugin when Gatsby runs.


3. Verify the plugin was added correctly

The plugin added by the starter implements a single Gatsby API in the `gatsby-node` that logs a message to the console. When you run `gatsby develop` or `gatsby build` in the site that implements your plugin, you should see this message.

You can verify your plugin was added to your site correctly by running `gatsby develop` for the site.

You should now see a message logged to the console in the preinit phase of the Gatsby build process:

```shell
$ gatsby develop
success open and validate gatsby-configs - 0.033s
success load plugins - 0.074s
Loaded gatsby-starter-plugin
success onPreInit - 0.016s
...
```

## 🎓 Learning Gatsby

If you're looking for more guidance on plugins, how they work, or what their role is in the Gatsby ecosystem, check out some of these resources:

- The [Creating Plugins](https://www.gatsbyjs.com/docs/creating-plugins/) section of the docs has information on authoring and maintaining plugins yourself.
- The conceptual guide on [Plugins, Themes, and Starters](https://www.gatsbyjs.com/docs/plugins-themes-and-starters/) compares and contrasts plugins with other pieces of the Gatsby ecosystem. It can also help you [decide what to choose between a plugin, starter, or theme](https://www.gatsbyjs.com/docs/plugins-themes-and-starters/#deciding-which-to-use).
- The [Gatsby plugin library](https://www.gatsbyjs.com/plugins/) has over 1750 official as well as community developed plugins that can get you up and running faster and borrow ideas from.

