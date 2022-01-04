import { NextSeo } from "next-seo";
import PropTypes from "prop-types";

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */
const Seo = ({ seo, url }) => {
  const {
    title,
    metaDesc,
    opengraphDescription,
    opengraphType,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
  } = seo;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={url}
      noindex={false}
      nofollow={false}
      openGraph={{
        type: opengraphType,
        locale: "en_NG",
        url: url,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.mediaItemUrl,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      twitter={{
        handle: "@omo__anifowose",
        site: "@omo__anifowose",
        cardType: "summary_large_image",
      }}
    />
  );
};

Seo.propTypes = {
  seo: PropTypes.object,
};

Seo.defaultProps = {
  seo: {
    canonical: "",
    title: "Anifowose - EnterTainment Site, Music Download, Quotes",
    metaDesc: `Your number one site to download music and motivational quotes
Get all entertainment news, trending celebrities update - local and international`,
    opengraphDescription: `Your number one site to download music and motivational quotes
Get all entertainment news, trending celebrities update - local and international`,
    opengraphTitle: "Anifowose - EnterTainment Site, Music Download, Quotes",
    opengraphImage: {
      mediaItemUrl: "/opengraph.png",
    },
    opengraphUrl: "https://omoanifowose.com",
    opengraphSiteName: "Anifowose",
    opengraphType: "website",
  },
};

export default Seo;
