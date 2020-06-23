// @flow
import {When, Then, setDefaultTimeout} from 'cucumber'
import expect from 'expect'

import format from 'date-fns/format'
import addMonths from 'date-fns/add_months'
import addDays from 'date-fns/add_days'
import startOfMonth from 'date-fns/start_of_month'
import startOfToday from 'date-fns/start_of_today'
import isLastDayOfMonth from 'date-fns/is_last_day_of_month'

export const REDIRECT_TIMEOUT = 50000

let shouldNavigateToNextMonth = false

const generateRandomDate = () => {
  const tomorrow = addDays(startOfToday(), 1)

  if (isLastDayOfMonth(tomorrow)) {
    shouldNavigateToNextMonth = true

    return addDays(startOfMonth(addMonths(new Date(), 1)), 2)
  }

  return tomorrow
}

setDefaultTimeout(50 * 1000)

When('I go to the Home Page', async function () {
  await this.page.goto(process.env.SEARCH_BASE_URI)
})

Then('I type on destination field {string}', async function (destination) {
  await this.page.type("[data-test-id='DestinationInput']", destination)
  // Click to close box
  await this.page.click("[data-test-id='HomeHeading']")
})

Then('I select a check-in date', async function () {
  const checkInDate = format(generateRandomDate(), 'ddd MMM D YYYY')

  await this.page.waitForTimeout(2000)
  await this.page.click("[data-test-id='DatePicker--checkIn']")

  if (shouldNavigateToNextMonth) {
    await this.page.click("[aria-label='Next Month']")
  }

  await this.page.click(`[aria-label='${checkInDate}']`)
  // Click to close box
  await this.page.click("[data-test-id='HomeHeading']")
})

Then('I click on the Search button', async function () {
  await this.page.click("[data-test-id='SearchButton']")
})

Then(
  'I should see the Search Results Page',
  async function () {
    await this.page.waitForLoadState('domcontentloaded')
    const pageTitle = await this.page.title()

    expect(pageTitle).toEqual(
      'FindHotel: We help you find the right hotel at the best price!'
    )
  },
  REDIRECT_TIMEOUT
)
