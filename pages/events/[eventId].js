import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getAllEvents } from "@/helpers/api-util";
import Head from "next/head";

export default function EventDetailPage(props) {
  const { event } = props;

  if (!event)
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
        <Comments eventId={event.id} />
      </EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const event = await getEventById(params.eventId);
  return {
    props: { event: event },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const paramArray = allEvents.map((param) => ({
    params: { eventId: param.id },
  }));
  return {
    paths: paramArray,
    fallback: "blocking",
  };
}
