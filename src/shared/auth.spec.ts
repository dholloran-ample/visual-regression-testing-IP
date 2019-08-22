import { Auth } from './auth';

describe(Auth, () => {
  it('should return gateway URL', () => {
    expect(Auth.getMPIssuerEndpoint('int')).toBe('https://gatewayint.crossroads.net/gateway/api/login');
    expect(Auth.getMPIssuerEndpoint('demo')).toBe('https://gatewaydemo.crossroads.net/gateway/api/login');
    expect(Auth.getMPIssuerEndpoint('prod')).toBe('https://gateway.crossroads.net/gateway/api/login');
    expect(Auth.getMPIssuerEndpoint('production')).toBe('https://gateway.crossroads.net/gateway/api/login');
    expect(Auth.getMPIssuerEndpoint('master')).toBe('https://gateway.crossroads.net/gateway/api/login');
  });
});
