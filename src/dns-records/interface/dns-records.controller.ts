import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  Controller,
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { TYPES as SHARED_TYPES } from '../../shared/infrastructure/dependency-injection/types';
import { QueryBus } from '../../shared/infrastructure/query-bus/query-bus';
import { DnsLookupQuery } from '../application/queries/dns-lookup.query';

@controller('/rrTypes/:rrType/dnsRecords')
export class FooController implements Controller {
  constructor(
    @inject(SHARED_TYPES.QueryBus)
    private queryBus: QueryBus,
  ) {}

  @httpGet('/:domain')
  async listResources(@request() req: Request, @response() res: Response) {
    const query = new DnsLookupQuery({
      ...(req.params as any),
    });
    const result = await this.queryBus.execute(query);
    res.status(200).send(result);
  }
}
