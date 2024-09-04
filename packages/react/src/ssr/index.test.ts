import { getCriticalHdsRules, getCriticalHdsRulesSync } from './index';
import { bodyHtml } from './test-data/bodyHtml';
import { hdsStyles } from './test-data/hdsStyles';

describe('getCriticalHdsRules', () => {
  it('should collect critical styles successfully', async () => {
    const criticalHdsStyles = await getCriticalHdsRules(bodyHtml, hdsStyles);

    expect(criticalHdsStyles).toMatchSnapshot();
  });
});

describe('getCriticalHdsRulesSync', () => {
  it('should collect exactly same rules as getCriticalHdsRules()', async () => {
    const syncCriticalHdsStyles = getCriticalHdsRulesSync(bodyHtml, hdsStyles);
    const asyncCriticalHdsStyles = await getCriticalHdsRules(bodyHtml, hdsStyles);
    expect(syncCriticalHdsStyles).toBe(asyncCriticalHdsStyles);
  });
});
