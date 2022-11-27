import { Logger } from '../domain/logger';
import { BadRequest } from '../domain/errors/bad-request.error';
import { Forbidden } from '../domain/errors/forbidden.error';
import { NotFound } from '../domain/errors/not-found.error';
import { Unauthorized } from '../domain/errors/unauthorized.error';
import { App } from '../infrastructure/dependency-injection/app';
import { TYPES as SHARED_TYPES } from '../infrastructure/dependency-injection/types';

export const handleErrors = async (callback: () => Promise<any>) => {
  try {
    return await callback();
  } catch (error: any) {
    if (error instanceof BadRequest) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/json' },
        body: JSON.stringify({
          error: error.message,
        }),
      };
    } else if (error instanceof Unauthorized) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'text/json' },
        body: JSON.stringify({
          error: error.message,
        }),
      };
    } else if (error instanceof Forbidden) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'text/json' },
        body: JSON.stringify({
          error: error.message,
        }),
      };
    } else if (error instanceof NotFound) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/json' },
        body: JSON.stringify({
          error: error.message,
        }),
      };
    }
    const logger = App.getInstance()
      .getContainer()
      .get<Logger>(SHARED_TYPES.Logger);

    logger.error(error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
    };
  }
};
