// TODO: Custom Response format

export class ResponseType<T> {
  statusCode: number;
  content: T;
  message: string;
  dateTime: Date;
}
