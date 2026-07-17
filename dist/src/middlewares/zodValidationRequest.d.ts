import { NextFunction, Request, Response } from "express";
declare const validateRequest: (schema: any) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;
export default validateRequest;
//# sourceMappingURL=zodValidationRequest.d.ts.map