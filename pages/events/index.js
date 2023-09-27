import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";

export default function AllEventsPage(props) {
  const allEvents = props.allEvents;
  const router = useRouter();

  function onSearch(year, month) {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  }
  return (
    <>
      <EventsSearch onSearch={onSearch} />
      <EventList items={allEvents} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents: allEvents,
    },
    revalidate: 60,
  };
}
