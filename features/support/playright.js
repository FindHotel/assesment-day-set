// @flow
/*
 * Playwright integration with Cucumber-js.
 */
import {chromium} from 'playwright'
import {BeforeAll, Before, After, AfterAll} from 'cucumber'
import {config} from 'dotenv-flow'

// Create a global browser for the test session.
BeforeAll({timeout: 10000}, async function () {
  config()

  global.browser = await chromium.launch({
    headless: true,
    slowMo: 30,
    devtools: false
  })
})

AfterAll(async function () {
  await global.browser.close()
})

// Create a new incognito context and page for each scenario.
Before({timeout: 10000}, async function () {
  this.context = await global.browser.newContext()
  this.page = await this.context.newPage()
  this.tab = null
})

After(async function () {
  await this.page.close()
  await this.context.close()
})
