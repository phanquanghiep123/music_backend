import { RoutingInvoicesModule } from './routing-invoices.module';

describe('RoutingInvoicesModule', () => {
  let routingInvoicesModule: RoutingInvoicesModule;

  beforeEach(() => {
    routingInvoicesModule = new RoutingInvoicesModule();
  });

  it('should create an instance', () => {
    expect(routingInvoicesModule).toBeTruthy();
  });
});
