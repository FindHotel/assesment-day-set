// @flow
import { Then, setDefaultTimeout } from 'cucumber'

export const USER_EMAIL = 'gabriel+integration@findhotel.net'
export const USER_PASSWORD = 'Test.123'
export const SIGN_IN_CTA = "[data-test-id='SignInButton']"
export const USER_WIDGET = "[data-test-id='UserWidget']"

setDefaultTimeout(100 * 1000)

Then('I navigate to the Login page', async function () {
  await Promise.all([
    this.page.waitForNavigation(),
    this.page.click(SIGN_IN_CTA)
  ])
})

Then('I type my email', async function () {
  const dataTestId = "[name='email']"
  await this.page.waitForSelector(dataTestId)
  await this.page.fill(dataTestId, USER_EMAIL)
})

Then('I type my password', async function () {
  const dataTestId = "[name='password']"
  await this.page.waitForSelector(dataTestId)
  await this.page.fill(dataTestId, USER_PASSWORD)
})

Then('I click on Log in button', async function () {
  const dataTestId = "[name='submit']"
  await this.page.waitForSelector(dataTestId)
  await this.page.click(dataTestId)
})

Then('I should see the Home Page as a logged in user', async function () {
  await this.page.waitForSelector(USER_WIDGET)
})
