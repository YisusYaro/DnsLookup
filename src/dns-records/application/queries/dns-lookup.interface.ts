import { QueryHandler } from '../../../shared/application/queries/query.handler';
import { DnsLookupQuery } from './dns-lookup.query';
import { DnsLookupResult } from './dns-lookup.result';

export interface DnsLookupHandler
  extends QueryHandler<DnsLookupQuery, DnsLookupResult> {
  handle(query: DnsLookupQuery): Promise<DnsLookupResult>;
}
