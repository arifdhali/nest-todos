
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalFiltersFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    let message: string | string[] = "Internal server error";

    if (exceptionResponse !== null && typeof exceptionResponse === "object") {
      const body = exceptionResponse as Record<string, unknown>;

      if (typeof body.message === "string" || Array.isArray(body.message)) {
        message = body.message as string | string[];
      } else if (typeof body.error === "string") {
        message = body.error;
      }
    }

    if (exception instanceof Error) {
      console.error("Stack trace:", exception.stack);
    }


    response.status(status).json({
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message[0] : message,
      error: exception instanceof Error ? exception.name : "Error",
      timestamp: new Date().toISOString(),
    });
  }
}
