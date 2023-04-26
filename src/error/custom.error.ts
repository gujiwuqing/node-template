// src/error/custom.error.ts
import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

export class CustomHttpError extends MidwayHttpError {
  constructor(msg: string, status = 400) {
    super(msg, status || HttpStatus.BAD_REQUEST);
  }
}
