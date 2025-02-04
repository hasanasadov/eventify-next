"use client";

import EventItem from "./EventItem";
import { getEvents } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

// const ITEMS_PER_PAGE = 8;
// const ITEMS_PER_SCROLL = 4;

const EventsPage = () => {
  const {
    data: events,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 min-h-[70vh]">
        <h2 className="text-lg font-bold text-center">Something went wrong</h2>
        <p className="text-sm text-center">
          We could not fetch the events at the moment. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading || !events) {
    return (
      <div className=" min-h-[70vh] flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gray-50  py-8 px-6">
      <div className="flex  items-center justify-center">
        <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54]">
          Explore Events
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((item) => (
          <EventItem key={item.id} event={item} />
        ))}
      </div>

      {/* {hasMore && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm font-medium">
                {events.length - displayedEvents.length} more events available.
                Scroll down to load more!
              </p>
            </div>
          )}

          {loadingMore && (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
              <p className="ml-4 text-green-500 font-semibold">
                Loading more events...
              </p>
            </div>
          )}

          {!loadingMore && !hasMore && (
            <div className="text-center text-gray-600 mt-8">
              <p className="text-lg font-semibold text-gray-500">
                🎉 You{"'"}ve reached the end! No more events available.
              </p>
            </div>
          )}

          {!loadingMore && events.length === 0 && (
            <div className="text-center text-gray-600 mt-16">
              <p>No events available at the moment. Please check back later!</p>
            </div>
          )} */}
    </div>
  );
};

export default EventsPage;

// const handleLoadMore = () => {
//   if (!hasMore || loadingMore) return;

//   setLoadingMore(true);
//   setTimeout(() => {
//     const nextBatch = displayedVenues.length + ITEMS_PER_SCROLL;
//     if (nextBatch >= venues.length) {
//       setDisplayedVenues(venues);
//       setHasMore(false);
//     } else {
//       setDisplayedVenues(venues.slice(0, nextBatch));
//     }
//     setLoadingMore(false);
//   }, 500);
// };

// const handleScroll = () => {
//   if (
//     window.innerHeight + window.scrollY >=
//     document.body.offsetHeight - 100
//   ) {
//     handleLoadMore();
//   }
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, [displayedVenues, hasMore, loadingMore]);
