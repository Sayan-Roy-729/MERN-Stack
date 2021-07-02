import { Fragment } from "react-is";
import { useRouter } from 'next/router';
import head from "next/head";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const AllEvents = (props) => {
    const router = useRouter();
    const {events} = props;

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta name='description' content = 'Find a lot of events that allow you to evolve...'/>
            </Head>
            <EventsSearch onSearch = {findEventsHandler}/>
            <EventList items = {events}/>
        </Fragment>
    );
};

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events,
        },
        revalidate: 60,
    };
}

export default AllEvents;