import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
  {
    allFile(filter: { relativeDirectory: { eq: "images" } }) {
      nodes {
        name
        childImageSharp {
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
`;

function vec2obj(vec) {
  //using "name" as key
  let obj = {};
  for (let v of vec) {
    obj[v.name] = v.childImageSharp.fluid;
  }
  return obj;
}

export default function useImages() {
  const { allFile } = useStaticQuery(query);
  return vec2obj(allFile.nodes);
}
