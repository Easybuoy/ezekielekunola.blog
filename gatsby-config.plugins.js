const feedPlugin = require("./gatsby-config.plugins.feed");

module.exports = [
  "gatsby-plugin-react-helmet",
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp",
  "gatsby-plugin-less",
  "gatsby-plugin-offline",
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "Ezekiel Ekunola Blog",
      short_name: "EE",
      start_url: "/",
      background_color: "#f5f5f5",
      theme_color: "#343434",
      display: "standalone",
      icon: "src/images/logo.png", // This path is relative to the root of the site.
      legacy: true // this will add apple-touch-icon links to <head>. Required for versions prior to iOS 11.3.
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/content`
    }
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1000,
            quality: 80,
            showCaptions: true,
            linkImagesToOriginal: false
          }
        },
        "gatsby-remark-prismjs",
        "gatsby-remark-copy-linked-files"
      ]
    }
  },
  feedPlugin,
  `gatsby-plugin-sitemap`,
  `gatsby-plugin-robots-txt`
];
