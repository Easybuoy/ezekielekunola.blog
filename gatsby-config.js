module.exports = {
  siteMetadata: {
    title: `Ezekiel Ekunola`,
    name: `easybuoy`,
    siteUrl: `https://blog.ezekielekunola.com`,
    description: `Tech Digests by Ezekiel Ekunola`,
    hero: {
      heading: `Welcome to Tech Digests by Ezekiel`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/easybuoy`,
      },
      {
        name: `github`,
        url: `https://github.com/easybuoy/`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/easybuoy19`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/easybuoy/`,
      }
    ],
  },
  plugins: [
    "gatsby-plugin-offline",
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ezekiel Ekunola Blog`,
        short_name: `EE`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `##111216`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.ANALYTICS_ID,
        head: true
      }
    },
  ],
};
