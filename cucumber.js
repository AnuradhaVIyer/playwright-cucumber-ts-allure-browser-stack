const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  default: `--require-module ts-node/register \
            --require hooks/**/*.ts \
            --require step-definitions/**/*.ts \
            --format progress \
            --format json:reports/cucumber-report.json \
            --format html:reports/cucumber-report.html \
            --format allure-cucumberjs/reporter \
            --require global-setup.js \
            --require global-teardown.js \
            ${process.env.FEATURE_FILES || 'features/**/*.feature'}`
};