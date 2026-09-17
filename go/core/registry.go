package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAdvancedEntityFunc func(client *HubspotDataStudioSDK, entopts map[string]any) HubspotDataStudioEntity

var NewBasicEntityFunc func(client *HubspotDataStudioSDK, entopts map[string]any) HubspotDataStudioEntity

var NewDatasourceIngestionDataPushEntityFunc func(client *HubspotDataStudioSDK, entopts map[string]any) HubspotDataStudioEntity

var NewDatasourceIngestionDataSourceGetEntityFunc func(client *HubspotDataStudioSDK, entopts map[string]any) HubspotDataStudioEntity

var NewJsonEntityFunc func(client *HubspotDataStudioSDK, entopts map[string]any) HubspotDataStudioEntity

var NewN202609EntityFunc func(client *HubspotDataStudioSDK, entopts map[string]any) HubspotDataStudioEntity

