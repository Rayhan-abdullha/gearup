import { NextFunction, Request, Response } from "express";
export declare const providerController: {
    createGear: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateGear: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteGear: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getGearOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateGearOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOverview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=provider.controller.d.ts.map