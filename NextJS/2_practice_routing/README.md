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