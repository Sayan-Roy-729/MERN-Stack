import { Provider } from "next-auth/client";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

// pageProps are the props for the pages. And it is mixed with getStaticProps & getServerSideProps
function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
