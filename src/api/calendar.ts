import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

// import { endpoints } from 'src/utils/axios';
import { ICalendarEvent } from 'src/types/calendar';

// ----------------------------------------------------------------------

// const url = endpoints.calendar;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(() => {
    const events = data?.events.map((event: ICalendarEvent) => ({
      ...event,
      textColor: event.color,
    }));

    return {
      events: (events as ICalendarEvent[]) || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.events.length,
    };
  }, [data?.events, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(eventData: ICalendarEvent) {
  /**
   * Work on server
   */
  // const data = { eventData };
  // await axios.post(URL, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const events: ICalendarEvent[] = [...currentData.events, eventData];

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateEvent(eventData: Partial<ICalendarEvent>) {
  /**
   * Work on server
   */
  // const data = { eventData };
  // await axios.put(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const events: ICalendarEvent[] = currentData.events.map((event: ICalendarEvent) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export function useViewEvent() {
  const userId = 'sahildarji1610@gmail.com';
  const startDate = '2024-06-17';
  const URL = `/planned-ai/executed-by/${userId}/${startDate}`;

  // Fetch data using SWR
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  // Transform the fetched data
  const memoizedValue = useMemo(() => {
    const events = data?.map((event: { aiId: any; name: any; description: any; note: any; estimatedTime: any; startDate: any; startTime: any; endDate: any; endTime: any; createdBy: any; ownedBy: any; executedBy: any; state: any; status: any; }) => ({
      id: event.aiId,
      title: event.name,
      description: event.description,
      note: event.note,
      estimatedTime: event.estimatedTime,
      start: `${event.startDate}T${event.startTime}`,
      end: `${event.endDate}T${event.endTime}`,
      color: '#0070f3', // default color
      createdBy: event.createdBy,
      ownedBy: event.ownedBy,
      executedBy: event.executedBy,
      state: event.state,
      status: event.status,
    }));

    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export async function deleteEvent(eventId: string) {
  /**
   * Work on server
   */
  // const data = { eventId };
  // await axios.patch(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const events: ICalendarEvent[] = currentData.events.filter(
        (event: ICalendarEvent) => event.id !== eventId
      );

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}
