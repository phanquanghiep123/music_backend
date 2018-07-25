import { RoutingDashboardModule } from './routing-dashboard.module';

describe('RoutingDashboardModule', () => {
  let routingDashboardModule: RoutingDashboardModule;

  beforeEach(() => {
    routingDashboardModule = new RoutingDashboardModule();
  });

  it('should create an instance', () => {
    expect(routingDashboardModule).toBeTruthy();
  });
});
