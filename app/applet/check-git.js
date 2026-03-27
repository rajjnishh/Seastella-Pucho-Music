const { execSync } = require('child_process');
try {
  console.log(execSync('git status').toString());
  console.log(execSync('git ls-files src/assets').toString());
} catch (e) {
  console.error(e.toString());
}
