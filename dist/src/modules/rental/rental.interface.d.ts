export interface IRentalItemInput {
    gearId: string;
    quantity: number;
    startDate: string | Date;
    endDate: string | Date;
}
export interface IRentalOrderInput {
    items: IRentalItemInput[];
}
//# sourceMappingURL=rental.interface.d.ts.map