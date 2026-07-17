import httpStatus from "http-status";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";
export const globalErrorHandler = (err, req, res, next) => {
    console.log("Error : ", err);
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorName = err.name || "Internal Server Error";
    let errorMessage = err.message || "Internal Server Error";
    let errorSources = [{ path: "", message: errorMessage }];
    if (err instanceof ZodError) {
        statusCode = httpStatus.BAD_REQUEST;
        errorName = "ZodError";
        errorMessage = "Validation Error";
        errorSources = err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
    }
    else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.BAD_REQUEST;
        errorName = "PrismaClientValidationError";
        errorMessage = "You have provided incorrect field type or missing fields";
        errorSources = [{ path: "", message: errorMessage }];
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        errorName = "PrismaClientKnownRequestError";
        if (err.code === "P2002") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Duplicate Key Error";
        }
        else if (err.code === "P2003") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Foreign key constraint failed";
        }
        else if (err.code === "P2025") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage =
                "An operation failed because it depends on one or more records that were required but not found.";
        }
        else {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Database request error";
        }
        errorSources = [{ path: "", message: errorMessage }];
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        errorName = "PrismaClientInitializationError";
        if (err.errorCode === "P1000") {
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage =
                "Authentication failed against database server. Please Check Your Credentials";
        }
        else if (err.errorCode === "P1001") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Can't reach database server";
        }
        else {
            statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = "Database initialization error";
        }
        errorSources = [{ path: "", message: errorMessage }];
    }
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        errorName = "PrismaClientUnknownRequestError";
        errorMessage = "Error occurred during query execution";
        errorSources = [{ path: "", message: errorMessage }];
    }
    else {
        errorSources = [{ path: "", message: errorMessage }];
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        name: errorName,
        message: errorMessage,
        errorSources,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
//# sourceMappingURL=globalErrorHandler.js.map