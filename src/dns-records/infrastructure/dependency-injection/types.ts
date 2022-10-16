const QUERY_HANDLERS = {
  DnsLookupHandler: Symbol.for('DnsLookupHandler'),
};

const APPLICATION = {
  ...QUERY_HANDLERS,
};

const INFRASTRUCTURE = {
  DnsLookup: Symbol.for('DnsLookup'),
};

export const TYPES = {
  ...APPLICATION,
  ...INFRASTRUCTURE,
};
