export interface IRentalItemInput {
  gearId: string;
  quantity: number;
  startDate: string | Date; // Date from frontend (e.g., "2026-07-15")
  endDate: string | Date; // Date from frontend (e.g., "2026-07-20")
}

export interface IRentalOrderInput {
  items: IRentalItemInput[];
}
