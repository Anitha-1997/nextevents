import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function FeaturedEventsPage(props) {
  const { featuredEvents } = props;
  return (
    <div>
      <Head>
        <title>Next.js events</title>
        <meta name="description" content="Find a lot of events" />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const data = await getFeaturedEvents();
  return {
    props: { featuredEvents: data },
  };
}
