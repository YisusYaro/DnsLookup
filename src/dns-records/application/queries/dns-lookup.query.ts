import { Query } from '../../../shared/application/query';

class Properties {
  domain: string;
  rrType: string;
}

export class DnsLookupQuery extends Properties implements Query {
  constructor(properties: Properties) {
    super();
    Object.assign(this, properties);
  }
}
