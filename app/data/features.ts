export interface Feature {
  ic: 'compass' | 'wallet' | 'route' | 'calendar' | 'luggage' | 'train';
  t: string;
  d: string;
}

/** Lucide icons, inlined 24x24 stroke. Ports the ICONS map from js/script.js. */
export const ICONS: Record<Feature['ic'], string> = {
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  calendar:
    '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
  luggage:
    '<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 20v2"/><path d="M14 20v2"/>',
  train:
    '<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>',
};

/** Ports the FEATURES array from js/script.js. */
export const FEATURES: Feature[] = [
  { ic: 'compass', t: 'Scored for fit, not hype', d: 'Every place is scored on weather, reach time, crowds and how well it fits your dates, never ranked by ad spend.' },
  { ic: 'wallet', t: 'Real budgets, broken down', d: 'All-in costs split across stay, food, transport and activities, so a trip never drifts past what you planned.' },
  { ic: 'route', t: 'Multi-stop journeys', d: 'Curated routes mapped stop by stop: the order, distance, drive time and road conditions on every leg.' },
  { ic: 'calendar', t: 'Best time to go', d: 'Month-by-month seasonality for every place: what’s good right now, what’s better in winter, what’s just opening up.' },
  { ic: 'luggage', t: 'Packing & care points', d: 'Exactly what to carry and what to watch (heat, altitude, fuel gaps, network blackouts), flagged before you leave.' },
  { ic: 'train', t: 'Train or car, every leg', d: 'See how you’ll actually travel: train or road, with time and distance from your first stop to your last.' },
];
