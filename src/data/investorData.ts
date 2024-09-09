export interface Report {
  title: string;
  year: number;
  fileUrl: string;
}

export interface StockData {
  date: string;
  price: number;
}

export interface Event {
  date: string;
  description: string;
}

export const reports: Report[] = [
  {
    title: "Annual Report",
    year: 2023,
    fileUrl: "/pdf/Annual_Report.pdf",
  },
  {
    title: "Quarterly Report Q1",
    year: 2023,
    fileUrl: "/pdf/Quarterly_Report.pdf",
  },
  {
    title: "Quarterly Report Q2",
    year: 2023,
    fileUrl: "/pdf/Quarterly_Report.pdf",
  },
];

export const stockData: StockData[] = [
  { date: "2023-01-01", price: 150 },
  { date: "2023-02-01", price: 155 },
  { date: "2023-03-01", price: 160 },
  { date: "2023-04-01", price: 162 },
  { date: "2023-05-01", price: 158 },
  { date: "2023-06-01", price: 165 },
];

export const events: Event[] = [
  {
    date: "2023-09-15",
    description: "Earnings Call Q3 2023",
  },
  {
    date: "2023-11-01",
    description: "Annual General Meeting",
  },
  {
    date: "2023-12-10",
    description: "Investor Day Presentation",
  },
];
