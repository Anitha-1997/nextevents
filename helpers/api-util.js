export async function getAllEvents() {
  const response = await fetch(
    "https://nextevents-506b9-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformedData = [];

  for (let key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    });
  }
  return transformedData;
}
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  console.log("id", id);
  return allEvents.find((event) => event.id === id);
}
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}