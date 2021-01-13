# Integration tests

This is a package to perform e2e tests for FindHotel website during the assessment day.

## Prerequisites

Install the following:

- Node.js 10.x
- NPM 6.x

## Installing

After cloning the project or pulling the latest changes:

```bash
npm install
```

## How to use

### Setup

You should have an `.env` file with the variables pointing to the environment you target on your test:

```env
SEARCH_BASE_URI = 'https://search.findhotel.net/'
HOTEL_PAGES_URI = 'https://secure.findhotel.net/'
```

### Running

```bash
npm test
```
