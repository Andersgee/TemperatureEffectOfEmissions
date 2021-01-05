require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    defaultTitle: `GasEmissionModelplot`,
    titleTemplate: "%s - GasEmissionModelplot",
    defaultDescription: `Temperature contribution of Gas Emissions`,
    lang: `en`,
    siteUrl: "https://github.com/andersgee/andywebstarter",
    defaultImage: "andyfx.png",
    author: "Anders Gustafsson",
  },
  plugins: [
    "gatsby-plugin-top-layout",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GasEmissionModelplot`,
        short_name: `GasEmissionModelplot`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/assets/images/andyfx.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
