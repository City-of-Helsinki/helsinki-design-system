import { getCriticalHdsRules } from './index';
import { bodyHtml } from './test-data/bodyHtml';
import { hdsStyles } from './test-data/hdsStyles';

describe('getCriticalHdsRules', () => {
  it('should collect critical styles successfully', async () => {
    const criticalHdsStyles = await getCriticalHdsRules(bodyHtml, hdsStyles);

    expect(criticalHdsStyles).toMatchSnapshot();
  });
});
