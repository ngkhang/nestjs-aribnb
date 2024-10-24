import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { TransformResponseInterceptor } from '../interceptors/transform-response.interceptor';

export function TransformResponse<T>(dto: ClassConstructor<T>) {
  return applyDecorators(
    UseInterceptors(new TransformResponseInterceptor(dto))
  );
}
