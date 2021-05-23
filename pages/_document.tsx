import Document, { Html, Main, NextScript, Head } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import Heap from "@app/components/Heap";
import { styletron } from "@app/styles/styletron";

export default class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    // @ts-ignore
    const stylesheets = styletron.getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* @ts-ignore */}
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }} // eslint-disable-line react/no-danger
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i} // eslint-disable-line react/no-array-index-key
            />
          ))}
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.PLACES_API_KEY}&libraries=places`}
          />
          <meta charSet="utf-8" />
          <Heap redact />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
