# HubspotDataStudio SDK exists test

import pytest
from hubspotdatastudio_sdk import HubspotDataStudioSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HubspotDataStudioSDK.test(None, None)
        assert testsdk is not None
