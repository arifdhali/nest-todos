import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

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
    const request = context.switchToHttp().getRequest();

    let HIT_API = request.route.path;

    console.count(`${HIT_API} is hit `)
    const startTime = Date.now();
    return next.handle().pipe(tap((data) => {
      const duration = Date.now() - startTime;
      console.log(`3. Executed AFTER the handler. Response time: ${duration}ms`);
      console.log('Response Data:', data);
    }), map((result) => ({
      success: true,
      statusCode: response.statusCode,
      message: result?.message ?? "Global msg",
      data: result?.data ?? {}
    })));
  }
}
