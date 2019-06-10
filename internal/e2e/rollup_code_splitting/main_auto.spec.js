const fs = require('fs');
const exportedTest1 = 'dep1 fn,lib2 fn,dep2 fn';
const exportedTest2 = 'dep4 fn';
const exportedTest3 = 'lib1 fn,dep3 fn,lib2 fn,dep2 fn';
const path = __dirname;

describe('bundling main entry point', () => {
  async function checkAllTests(main_auto) {
    expect(main_auto.test()).toEqual(exportedTest1);
    const actualTest2 = await main_auto.test2();
    expect(actualTest2).toEqual(exportedTest2);
    const actualTest3 = await main_auto.test3();
    expect(actualTest3).toEqual(exportedTest3);
  }

  // Disabled since native ESModules can't be loaded in nodejs yet
  // https://github.com/bazelbuild/rules_nodejs/issues/593
  xit('bundle_auto_chunks_es6 should work', async () => {
    const main_auto = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_auto_chunks_es6/main_auto.js');
    await checkAllTests(main_auto);
  });

  it('bundle_auto_chunks should work', async () => {
    const main_auto = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_auto_chunks/main_auto.js');
    await checkAllTests(main_auto);
  });

  it('bundle_auto_chunks_min should work', async () => {
    const main_auto = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_auto_chunks_min/main_auto.js');
    await checkAllTests(main_auto);
  });

  it('bundle_auto_chunks_min_debug should work', async () => {
    const main_auto = require(
        'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_auto_chunks_min_debug/main_auto.js');
    await checkAllTests(main_auto);
  });

  it('should have a license header', () => {
    const content = fs.readFileSync(
        require.resolve(
            'build_bazel_rules_nodejs/internal/e2e/rollup_code_splitting/bundle_auto_chunks_min/main_auto.js'),
        {encoding: 'utf-8'});
    expect(content).toContain('dummy license banner');
  });
});

describe('bundling additional entry point', () => {
  it('should work', () => {
    check(path, 'bundle_auto.min.js', 'goldens/bundle_auto.min.js_');
  });
});
