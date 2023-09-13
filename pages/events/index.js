import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const allEvents = getAllEvents();
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
