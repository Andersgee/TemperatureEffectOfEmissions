require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    defaultTitle: `ClimateTargetExplorer`,
    titleTemplate: "%s - ClimateTargetExplorer",
    defaultDescription: `See temperature contribution for your emissions of different gases. Upload your own excel file.`,
    lang: `en`,
    siteUrl: "https://www.climatetargetexplorer.info",
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
        name: `ClimateTargetExplorer`,
        short_name: `ClimateTargetExplorer`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/assets/images/andyfx.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`${process.env.GTAG_MEASUREMENT_ID}`],
        gtagConfig: {
          anonymize_ip: true,
          cookie_flags: "SameSite=None;Secure",
          cookie_domain: "www.climatetargetexplorer.info",
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          //exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
  ],
};
