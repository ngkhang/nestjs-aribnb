import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ResponseType } from '../types/response/response.type';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ResponseType<T | T[]>>
{
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseType<T | T[]>> {
    const ctx = context.switchToHttp();
    const { statusCode } = ctx.getResponse<Response>();
    return next.handle().pipe(
      map(
        ({
          dataTransform,
          message,
          rawData,
        }: {
          dataTransform: { key: string; value: T };
          // FIXME: rawDate is any type
          rawData?: any;
          message: string;
        }) => {
          // Transform data
          const { key, value } = dataTransform;

          const transformedData = {
            [key]: {
              ...(Array.isArray(value)
                ? value.map((item) =>
                    plainToClass(this.dto, item, {
                      excludeExtraneousValues: true,
                    })
                  )
                : plainToClass(this.dto, value, {
                    excludeExtraneousValues: true,
                  })),
            },
          };

          return {
            statusCode,
            content: {
              ...transformedData,
              ...rawData,
            },
            message,
            dateTime: new Date(),
          };
        }
      )
    );
  }
}
