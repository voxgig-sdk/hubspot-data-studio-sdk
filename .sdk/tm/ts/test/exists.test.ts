
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HubspotDataStudioSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HubspotDataStudioSDK.test()
    equal(testsdk instanceof HubspotDataStudioSDK, true,
      'HubspotDataStudioSDK.test() must return a client synchronously')
  })

})
