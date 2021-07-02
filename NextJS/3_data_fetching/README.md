# Data Fetching (Backend side code):
NextJS helps with building **fullstack React apps**. ➡️ By default, NextJS pre-renders all pages (~ **server-side rendering**: *SSR*). The problem with react app is that if you visit the page source code, there is no content. That decrease the seo ranking and other search engine effects. NextJS solves this problem by a concept **`Page Pre-Rendering`**.</br>
NextJS returns pre-render page to the user where the contents is already fetched before the user visits. So you can see the contents in the page source. NextJS not only send back the contents to the site visitor to see the contents, it also send the javascript code to interact. This is called `Hydrate with React code once loaded.` This pre-rendering only effects the initial load.</br></br>
**`NextJS has two forms of pre-rendering:`**
- Static Generation (Recommended)
- Server-side Rendering

## Static Generation:
Pre-generate a page (with data prepared on the server-side) **during build time.** Then pages are prepared ahead to time and can be cached by the server / CDN serving the app. The below methods should export only page component, not any other react component. These below code is for home page. Though nextJS pre-renders by default. 

### `getStaticProps`:
```js
import path from 'path';
import fs from 'fs/promises';

const HomePage = (props) => {
    const { products } = props;

    return (
        <ul>
            {products.map(product => <li key = {product.id}>{product.title}</li>)}
        </ul>
    );
};

// This method is called before any page rendering to the client and
// code is server side code. This code can't be seen from the client side.
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return {
        props: {
            products: data.products,
        },
    };
}

export default HomePage;
```

### Incremental Static Generation:
If the data passed through props, changes frequently (e.g. shop app) then this will change the content after pre-defined time and the contents will change in the server.

```js
import path from 'path';
import fs from 'fs/promises';

const HomePage = (props) => {
    const { products } = props;

    return (
        <ul>
            {products.map(product => <li key = {product.id}>{product.title}</li>)}
        </ul>
    );
};

export async function getStaticProps() {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return {
        props: {
            products: data.products,
        },
        // Tell to change the content in every x seconds, e.g. here 10 seconds
        revalidate: 10
    };
}

export default HomePage;
```

### `getStaticProps` with `context` & other configure options:
```js
import path from 'path';
import fs from 'fs/promises';

const HomePage = (props) => {
    const { products } = props;

    return (
        <ul>
            {products.map(product => <li key = {product.id}>{product.title}</li>)}
        </ul>
    );
};

export async function getStaticProps(context) {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    
    // If failed to load the data, then show the 404 Page not found by setting
    // notFound and if another use case to redirect to another route.
    if (!data) {
        return {
            redirect: {
                destination: '/no-data',
            },
        };
    }

    if (data.products.length === 0) {
        return { notFound: true };
    }
    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
        // notFound: true,
        // redirect: 
    };
}

export default HomePage;
```

### Working with Dynamic Parameters | `getStaticPaths()`:
Dynamic pages ([id].js etc) don't just need data: You also need to know which **[id]** values will be available because for this dynamic routing, there will be countless pages and ids.</br>
Multiple concrete [id] page instances (e.g. id = 1. id = 2 etc.) are pre-generated.</br></br>
Our example: In out side, there are two pages like www.example.com/ for home page and www.example.com/p1 for product details page.
- Home Page
```js
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

const HomePage = (props) => {
    const { products } = props;

    return (
        <ul>
            {products.map(product => <li key = {product.id}><Link href = {`/${product.id}`}>{product.title}</Link></li>)}
        </ul>
    );
};

export async function getStaticProps(context) {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if (!data) {
        return {
            redirect: {
                destination: '/no-data',
            },
        };
    }

    if (data.products.length === 0) {
        return { notFound: true };
    }
    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
    };
}

export default HomePage;
``` 
- Product Details Page
```js
import path from 'path';
import fs from 'fs/promises';
import { Fragment } from "react";

const ProductDetailPage = (props) => {
    const { loadedProduct } = props;

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
};

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId);

    return {
        props: {
            loadedProduct: product
        },
    };
}

// Already pass the required id for this page
export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } },
        ],
        fallback: false, 
    };
}

export default ProductDetailPage;
```
### Working with the Fallback Pages:
If there is millions of products like amazon, then this is not the right way. Because it will cache millions pages and clients will get delay. For that `fallback: true` is required. Only pass the most visited product ids. And when client visit the page, then NextJS automatically fetch the data and will display the content. But for that, you have to write code for loading when the data is fetching.

```js
import path from 'path';
import fs from 'fs/promises';
import { Fragment } from "react";

const ProductDetailPage = (props) => {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
};

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId);

    return {
        props: {
            loadedProduct: product
        },
    };
}

// Don't require to pass all the id s od the products
export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: 'p1' } },
        ],
        fallback: true,
    };
}

export default ProductDetailPage;
```
But if you add `fallback: 'blocking`, then the extra loading render is not required. Then it will not throw error and it will fetch data and the display the page to the client.
```js
import path from 'path';
import fs from 'fs/promises';
import { Fragment } from "react";

const ProductDetailPage = (props) => {
    const { loadedProduct } = props;

    // if (!loadedProduct) {
    //     return <p>Loading...</p>;
    // }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
};

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId);

    return {
        props: {
            loadedProduct: product
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: 'p1' } },
        ],
        // fallback: true,
        fallback: 'blocking',
    };
}

export default ProductDetailPage;
```

### Loading Paths Dynamically:
In the previous codes, the passed ids of the products is not realistic because you don't know the ids for a real application. For that below code will work.

```js
import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

const ProductDetailPage = (props) => {
    const { loadedProduct } = props;

    // if (!loadedProduct) {
    //     return <p>Loading...</p>;
    // }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
};

// Fetch the data from the same data source
async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;
    const data = await getData();
    const product = data.products.find((product) => product.id === productId);

    return {
        props: {
            loadedProduct: product,
        },
    };
}

export async function getStaticPaths() {
    const data = await getData();
    // Extract the ids of the products and create dynamic paths for all
    // possible products.
    const ids = data.products.map((product) => product.id);
    const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathsWithParams,
        fallback: false,
    };
}

export default ProductDetailPage;
```

### Fallback Pages & **Not Found** Pages:
What will happened when the possible data is passed and also passed the `fallBack: true`? If you manually visit the site by the url, then for fallback true and the loading part, you will see the loading for a while and can see the page. But if the id you passed through url, is not valid then? Then NextJS throws error because it can't get the required product. For that, if there is no product found, then pass that in `getStaticProps`. Then if there is no valid id, then you will see a 404 page not found.

```js
import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

const ProductDetailPage = (props) => {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
};

async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;
    const data = await getData();
    const product = data.products.find((product) => product.id === productId);

    // Activate the 404 page if there is no valid id is passed
    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product,
        },
    };
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map((product) => product.id);
    const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathsWithParams,
        fallback: true,
    };
}

export default ProductDetailPage;
```

## Server-Side Rendering:
Sometimes, you need to pre-render for every request OR you need access to the request object (e.g. for cookies). NextJS allows you to run *real server-side code* as well.

### `getServerSideProps()`:
This is execute into the server only after the deployment and also out development server. This will not create pre-generated pages. All the options with 404PageNotFound can configure like `getStaticProps()`. One thing that can;t use is `revalidate: 10` because this is executed in server and always change according to the request. 

```js
function UserProfilePage(props) {
    return (
        <h1>{props.username}</h1>
    );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
    // These request and response are default node server-side objects
    const { params, req, res } = context;
    console.log(req);
    console.log(res);

    return {
        props: {
            username: 'Sayan'
        },
    };
}
```

### `getServerSideProps()` for Dynamic Pages:
Here I am using [uid].js file for dynamic routing. This getServerSideProps is executed to the server, that's why there is no required one extra function.

```js
function UserIdPage(props) {
    return (
        <h1>{props.id}</h1>
    );
}

export default UserIdPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const userId = params.uid;

    return {
        props: {
            id: 'userid-' + userId,
        },
    };
}
```

## Client-Side Data Fetching:
Some data doesn't need to be pre-rendered
- Data changing with high frequency (e.g. stock data)
- Highly user-specific data (e.g. last orders in an online shop)
- Partial data (e.g. data that's only used on a pert of an page)
</br>
Sometimes pre-fetching the data for page generation might not work or be required. For that -> *Traditional* client-sde data fetching (e.g. useEffect() with fetch() is fine.)

```js
import { useEffect, useState } from "react";

const LastSalesPage = () => {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://demoproject-f-default-rtdb.firebaseio.com/sales.json")
            .then((response) => response.json())
            .then((data) => {
                const transformSales = [];
                for (const key in data) {
                    transformSales.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume,
                    });
                }

                setSales(transformSales);
                setIsLoading(false);
            })
            .catch((error) => console.log(error.message));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!sales) {
        return <p>No data yet</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
};

export default LastSalesPage;
```

### `useSWR` NextJS Hook:
For more details click [here](https://swr.vercel.app/) for official documentation.</br>
Install the package
```
npm install swr
```
Then below code
```js
import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = () => {
    const [sales, setSales] = useState();

    const { data, error } = useSWR(
        "https://demoproject-f-default-rtdb.firebaseio.com/sales.json"
    );

    useEffect(() => {
        if (data) {
            const transformSales = [];
            for (const key in data) {
                transformSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            setSales(transformSales);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load</p>;
    }

    if (!data || !sales) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
};

export default LastSalesPage;
```

## Combining Pre-Fetching With Client-Side Fetching:
```js
import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);

    const { data, error } = useSWR(
        "https://demoproject-f-default-rtdb.firebaseio.com/sales.json"
    );

    useEffect(() => {
        if (data) {
            const transformSales = [];
            for (const key in data) {
                transformSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            setSales(transformSales);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load</p>;
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
};

export async function getStaticProps() {
    const response = await fetch(
        "https://demoproject-f-default-rtdb.firebaseio.com/sales.json"
    );
    const data = await response.json();
    const transformSales = [];
    for (const key in data) {
        transformSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return { props: { sales: transformSales }, revalidate: 10 };
}

export default LastSalesPage;
```

# Optimizing Apps:

## `head` Metadata:
### Add meta description & title
```js
import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

const HomePage = (props) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name='description' content = 'Find a lot of events that allow you to evolve...'/>
            </Head>
            <EventList items = {props.events}/>
        </div>
    );
};

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    };
}

export default HomePage;
```

### Dynamic `head` Content:
```js
<Head>
    <title>{ event.title }</title>
    <meta name='description' content = {event.description}/>
</Head>
```

### Reusing Logic Inside A Component:
If there is multiple check inside a page, then have to add the head to the every return jsx code. For that see the below code

```js
import { Fragment, useEffect, useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import useSWR from "swr";

import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = (props) => {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();

    const filterDate = router.query.slug;

    const { data, error } = useSWR(
        "https://demoproject-f-default-rtdb.firebaseio.com/events.json"
    );

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({ id: key, ...data[key] });
            }
            setLoadedEvents(events);
        }
    }, [data]);

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content = 'List of filtered events'/>
        </Head>
    );

    if (!loadedEvents) {
        return (
            <Fragment>
                {pageHeadData}
                <p className="center">Loading...</p>
            </Fragment>
        );
    }

    const filteredYear = filterDate[0];
    const filteredMonth = filterDate[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content = {`All events for ${numMonth}/${numYear}`}/>
        </Head>
    );

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 || error
    ) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
};
```

### Working with the `_app.js` File:
This is the root app component of our project.
```js
import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name = "viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
```

## `_document.js` File:
This is a special and important file in NextJS that has to be added directly to the `pages` folder. `_app.js` is the application shell. It is like root component inside of the body section of the html document. `_document.js` allows to customize the entire html document. This file is required if you want to configure the general document of the html.

```js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    {/* This div is to show that here I can also add out custom div outside the NextJS */}
                    <div id='overload'/>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
```

## Optimise The Images:
NextJS will create multiple versions of the image on the fly when the requests are coming in optimise according to the operating systems and the device size that are making the request. Then the generated images will be cached for future request to similar devices.

```js
import Image from 'next/image';

const ImageComponent = props => {
    return (
        <div>
            <Image src = {'url.jpg'} alt = {'this is alt of the image'} width={250} height={160}/>
        </div>
    );
};
```
Here width and height is the height of the image dimension, that height and width is not the same when is showing in browser.   For more optimization, look the official [documentation](https://nextjs.org/docs/api-reference/next/image).