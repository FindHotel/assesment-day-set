// @flow
import {Then, setDefaultTimeout} from 'cucumber'
import expect from 'expect'

setDefaultTimeout(50 * 1000)

const PROVIDER_OFFER = "[data-test-id='ProviderOffer']"

Then('I click in a provider offer', async function () {
  const [popup] = await Promise.all([
    new Promise(resolve => this.page.once('popup', resolve)),
    await this.page.click(PROVIDER_OFFER)
  ])

  this.tab = popup
})

Then("I should be redirected to {string} provider's page", async function (
  destination
) {
  await this.tab.waitForLoadState('load')
  await this.tab.waitForTimeout(10000)

  const actual = await this.tab.evaluate(text => window.find(text), destination)
  const expected = true

  expect(actual).toBe(expected)
})
