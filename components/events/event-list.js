import EventListItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventListItem
          key={event.id}
          id={event.id}
          location={event.location}
          date={event.date}
          title={event.title}
          image={event.image}
        />
      ))}
    </ul>
  );
}
