import { Container } from 'inversify';
import { DnsLookupHandler } from '../../application/queries/dns-lookup.interface';
import { DnsLookupHandlerImpl } from '../../application/queries/dns-lookup.handler';
import { TYPES } from './types';
import { registerQueries } from './register-queries';
import { DnsLookup } from '../../domain/dns-lookup';
import { DnsLookupImpl } from '../dns-lookup.ts/dns-lookup';

const setQueryHandlers = (container: Container): void => {
  container
    .bind<DnsLookupHandler>(TYPES.DnsLookupHandler)
    .to(DnsLookupHandlerImpl);
};

const setApplication = (container: Container): void => {
  setQueryHandlers(container);
  registerQueries();
};

const setInfrastructure = (container: Container): void => {
  container.bind<DnsLookup>(TYPES.DnsLookup).to(DnsLookupImpl);
};

export const setDnsRecordsModule = (container: Container): void => {
  setApplication(container);
  setInfrastructure(container);
};
