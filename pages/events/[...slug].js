import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { useRouter } from "next/router";
// import { getFilteredEvents } from "@/helpers/api-util";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filteredData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextevents-506b9-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  useEffect(() => {
    if (data) {
      const events = [];

      for (let key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  // const {
  //   events,
  //   date: { numMonth, numYear },
  // } = props;

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2023 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values.</p>
        </ErrorAlert>
        <Button link="/events">Show all events</Button>
      </div>
    );
  }
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  if (filteredEvents.length === 0 || !filteredEvents) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No Events found for chosen filter!</p>
        </ErrorAlert>
        <Button link="/events">Show all events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`Filtered events for ${numMonth} in ${numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filteredData = params.slug;
//   const numYear = +filteredData[0];
//   const numMonth = +filteredData[1];

//   if (
//     isNaN(numMonth) ||
//     isNaN(numYear) ||
//     numYear > 2023 ||
//     numYear < 2020 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         numYear: numYear,
//         numMonth: numMonth,
//       },
//     },
//   };
// }
