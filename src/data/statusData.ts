export interface Release {
  date: string;
  version: string;
  description: string;
}

export interface Incident {
  date: string;
  description: string;
  resolution: string;
}

export const upcomingReleases: Release[] = [
  {
    date: "2024-09-01",
    version: "1.2.0",
    description: "New features and performance improvements",
  },
  {
    date: "2024-10-15",
    version: "1.3.0",
    description: "Major update with new functionalities",
  },
];

export const recentReleases: Release[] = [
  {
    date: "2024-08-15",
    version: "1.1.0",
    description: "Bug fixes and minor updates",
  },
];

export const incidents: Incident[] = [
  {
    date: "2024-08-10",
    description: "API downtime",
    resolution: "Resolved after 1 hour",
  },
];
