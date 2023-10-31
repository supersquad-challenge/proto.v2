export const GA_TRACKING_ID = 'G-TR65WBQ76L'; // G-TR65WBQ76L

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams,
) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
};

export function useGtag() {
  throw new Error('Function not implemented.');
}