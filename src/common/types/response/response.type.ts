export class IResponse<D, R = null> {
  dataTransform: {
    key: string;
    value: D;
  };
  rawData?: R;
  message: string;
}

export class ResponseType<T> {
  statusCode: number;
  content: T;
  message: string;
  dateTime: Date;
}
