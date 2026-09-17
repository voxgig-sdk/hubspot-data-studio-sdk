# HubspotDataStudio SDK feature factory

from hubspotdatastudio_sdk.feature.base_feature import HubspotDataStudioBaseFeature
from hubspotdatastudio_sdk.feature.debug_feature import HubspotDataStudioDebugFeature
from hubspotdatastudio_sdk.feature.idempotency_feature import HubspotDataStudioIdempotencyFeature
from hubspotdatastudio_sdk.feature.metrics_feature import HubspotDataStudioMetricsFeature
from hubspotdatastudio_sdk.feature.paging_feature import HubspotDataStudioPagingFeature
from hubspotdatastudio_sdk.feature.ratelimit_feature import HubspotDataStudioRatelimitFeature
from hubspotdatastudio_sdk.feature.retry_feature import HubspotDataStudioRetryFeature
from hubspotdatastudio_sdk.feature.test_feature import HubspotDataStudioTestFeature
from hubspotdatastudio_sdk.feature.timeout_feature import HubspotDataStudioTimeoutFeature


_FEATURES = {
    "base": lambda: HubspotDataStudioBaseFeature(),
    "debug": lambda: HubspotDataStudioDebugFeature(),
    "idempotency": lambda: HubspotDataStudioIdempotencyFeature(),
    "metrics": lambda: HubspotDataStudioMetricsFeature(),
    "paging": lambda: HubspotDataStudioPagingFeature(),
    "ratelimit": lambda: HubspotDataStudioRatelimitFeature(),
    "retry": lambda: HubspotDataStudioRetryFeature(),
    "test": lambda: HubspotDataStudioTestFeature(),
    "timeout": lambda: HubspotDataStudioTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
