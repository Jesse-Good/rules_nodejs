const fs = require('fs');
const exportedTest1 = 'dep1 fn,lib2 fn,dep2 fn';
const exportedTest2 = 'dep4 fn';
const exportedTest3 = 'lib1 fn,dep3 fn,lib2 fn,dep2 fn';

describe('bundling main entry point', () => {
  async function checkAllTests(main1) {
    expect(main1.test()).toEqual(exportedTest1);
    const actualTest2 = await main1.test2();
    expect(actualTest2).toEqual(exportedTest2);
    const actualTest3 = await main1.test3();
    expect(actualTest3).toEqual(exportedTest3);
  }

  // Disabled since native ESModules can't be loaded in nodejs yet
  // https://github.com/bazelbuild/rules_nodejs/issues/593
  xit('bundle_chunks_es6 should work', async () => {
    const main1 = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_chunks_es6/main1.js');
    checkAllTests(main1);
  });

  it('bundle_chunks should work', async () => {
    const main1 = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_chunks/main1.js');
    checkAllTests(main1);
  });

  it('bundle_chunks_min should work', async () => {
    const main1 = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_chunks_min/main1.js');
    checkAllTests(main1);
  });

  it('bundle_chunks_min_debug should work', async () => {
    const main1 = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_chunks_min_debug/main1.js');
    checkAllTests(main1);
  });

  it('should have a license header', () => {
    const content = fs.readFileSync(
        require.resolve(
            'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_chunks_min/main1.js'),
        {encoding: 'utf-8'});
    expect(content).toContain('dummy license banner');
  });
});
