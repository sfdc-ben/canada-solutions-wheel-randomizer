import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`

      /* Avant Garde */
      @font-face {
        font-family: 'ITC Avant Garde Gothic';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/ITCAvantGarde.woff') format('woff');
      }
      @font-face {
        font-family: 'ITC Avant Garde Gothic LT Bold';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/ITCAvantGardeGothicLTBold.woff') format('woff');
      }

      /* Salesforce */
      @font-face {
        font-family: 'Salesforce Light';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/SalesforceSans-Light.woff') format('woff');
      }
      @font-face {
        font-family: 'Salesforce Regular';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/SalesforceSans-Regular.woff') format('woff');
      }
      @font-face {
        font-family: 'Salesforce Bold';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/SalesforceSans-Bold.woff') format('woff');
      }

      /* Trailhead */
      @font-face {
        font-family: 'Trailhead Regular';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/TrailheadMedium.woff') format('woff');
      }
      @font-face {
        font-family: 'Trailhead Bold';
        font-style: normal;
        font-display: swap;
        src: url('./fonts/TrailheadBold.woff') format('woff');
      }
      
      `}
  />
)

export default Fonts