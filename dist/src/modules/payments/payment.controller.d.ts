import { Request, Response, NextFunction } from "express";
export declare const paymentControllers: {
    createPaymentIntent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map