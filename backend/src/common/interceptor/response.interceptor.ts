import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// from controller response
export interface MetaResponse<T = any> {
  message: string;
  data?: T;
}

// total sending response to the client.
export interface GlobalReponseFormat<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, GlobalReponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<GlobalReponseFormat<T>> {

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(map((result) => ({
      success: true,
      statusCode: response.statusCode,
      message: result?.message ?? "Global msg",
      data: result?.data ?? {}
    })));
  }
}
