-- HubspotDataStudio SDK exists test

local sdk = require("hubspot-data-studio_sdk")

describe("HubspotDataStudioSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
