class ResponseError extends Error {
  status: unknown;
  constructor(status: unknown, message: string) {
    super(message);
    this.status = status;
  }
}

export { ResponseError };
