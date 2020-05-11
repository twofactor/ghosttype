import App from "next/app";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../styles/theme";

import "react-quill/dist/quill.bubble.css";
import "../styles/postcontent.css";

function GhostApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ColorModeProvider>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default GhostApp;
