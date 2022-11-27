import { Request, Response } from 'express';
import {
  Controller,
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { dnsLookup } from './dns-records.port';

@controller('/rrTypes/:rrType/dnsRecords')
export class DnsRecordsController implements Controller {
  @httpGet('/:domain')
  async dnsLookup(@request() req: Request, @response() res: Response) {
    const result = await dnsLookup({ ...req.params, ...req.body });
    res.status(200).send(result);
  }
}
