import { getQueryHandlersMap } from '../../../shared/infrastructure/dependency-injection/register-queries';
import { DnsLookupQuery } from '../../application/queries/dns-lookup.query';
import { TYPES } from './types';

export const registerQueries = (): void => {
  const queryHandlersMap = getQueryHandlersMap();

  queryHandlersMap.set(DnsLookupQuery, TYPES.DnsLookupHandler);
};
