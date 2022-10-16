import { inject, injectable } from 'inversify';
import { DnsLookup } from '../../domain/dns-lookup';
import { TYPES } from '../../infrastructure/dependency-injection/types';
import { DnsLookupHandler } from './dns-lookup.interface';
import { DnsLookupQuery } from './dns-lookup.query';
import { DnsLookupResult } from './dns-lookup.result';

@injectable()
export class DnsLookupHandlerImpl implements DnsLookupHandler {
  constructor(
    @inject(TYPES.DnsLookup)
    private dnsLookup: DnsLookup,
  ) {}

  async handle(query: DnsLookupQuery): Promise<DnsLookupResult> {
    const dnsResult = await this.dnsLookup.resolve(query.domain, query.rrType);

    console.log('⭐', dnsResult);

    const result = new DnsLookupResult(dnsResult);

    return result;
  }
}
