
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { HubspotDataStudioSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HubspotDataStudioSDK.test()
    equal(null !== testsdk, true)
  })

})
