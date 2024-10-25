import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { OmitType } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseType } from './common/types/response/response.type';

class ResponseException extends OmitType(ResponseType<null>, ['content']) {
  path: string;
  response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let responseException: ResponseException = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      path: request.url,
      dateTime: new Date(),
      response: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      responseException = {
        ...responseException,
        statusCode: exception.getStatus(),
        message: exception.message,
        response: exception.getResponse(),
      };
    }

    response.status(responseException.statusCode).json(responseException);
    super.catch(exception, host);
  }
}
