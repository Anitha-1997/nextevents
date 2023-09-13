import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FilteredEventsPage() {
  const router = useRouter();
  const query = router.query.slug;

  if (!query) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +query[0];
  const numMonth = +query[1];

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2023 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div className="center">
        <ErrorAlert><p>Invalid Filter. Please adjust your values.</p></ErrorAlert>
        <Button link="/events">Show all events</Button>
      </div>
    );
  }
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (filteredEvents.length === 0 || !filteredEvents) {
    return (
      <div className="center">
        <ErrorAlert><p>No Events found for chosen filter!</p></ErrorAlert>
        <Button link="/events">Show all events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}
