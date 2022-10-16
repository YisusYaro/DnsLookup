import { Result } from '../../../shared/application/result';
import { AnyRecord, MxRecord, NaptrRecord, SoaRecord, SrvRecord } from 'dns';

export class DnsLookupResult implements Result {
  constructor(properties: {
    [rrType: string]:
      | string[]
      | SoaRecord
      | MxRecord[]
      | SrvRecord[]
      | string[][]
      | NaptrRecord[]
      | AnyRecord[];
  }) {
    Object.assign(this, properties);
  }
}
