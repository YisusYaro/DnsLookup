import { App } from '../../shared/infrastructure/dependency-injection/app';
import { TYPES as SHARED_TYPES } from '../../shared/infrastructure/dependency-injection/types';
import { QueryBus } from '../../shared/infrastructure/query-bus/query-bus';
import { DnsLookupQuery } from '../application/queries/dns-lookup.query';

App.getInstance().setSharedModule();
App.getInstance().setDnsRecordsModule();

const queryBus: QueryBus = App.getInstance()
  .getContainer()
  .get(SHARED_TYPES.QueryBus);

export const dnsLookup = async (request: any) => {
  const query = new DnsLookupQuery(request);
  return await queryBus.execute(query);
};
