package voxgighubspotdatastudiosdk

import (
	"github.com/voxgig-sdk/hubspot-data-studio-sdk/go/core"
	"github.com/voxgig-sdk/hubspot-data-studio-sdk/go/entity"
	"github.com/voxgig-sdk/hubspot-data-studio-sdk/go/feature"
	_ "github.com/voxgig-sdk/hubspot-data-studio-sdk/go/utility"
)

// Type aliases preserve external API.
type HubspotDataStudioSDK = core.HubspotDataStudioSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HubspotDataStudioEntity = core.HubspotDataStudioEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HubspotDataStudioError = core.HubspotDataStudioError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAdvancedEntityFunc = func(client *core.HubspotDataStudioSDK, entopts map[string]any) core.HubspotDataStudioEntity {
		return entity.NewAdvancedEntity(client, entopts)
	}
	core.NewBasicEntityFunc = func(client *core.HubspotDataStudioSDK, entopts map[string]any) core.HubspotDataStudioEntity {
		return entity.NewBasicEntity(client, entopts)
	}
	core.NewDatasourceIngestionDataPushEntityFunc = func(client *core.HubspotDataStudioSDK, entopts map[string]any) core.HubspotDataStudioEntity {
		return entity.NewDatasourceIngestionDataPushEntity(client, entopts)
	}
	core.NewDatasourceIngestionDataSourceGetEntityFunc = func(client *core.HubspotDataStudioSDK, entopts map[string]any) core.HubspotDataStudioEntity {
		return entity.NewDatasourceIngestionDataSourceGetEntity(client, entopts)
	}
	core.NewJsonEntityFunc = func(client *core.HubspotDataStudioSDK, entopts map[string]any) core.HubspotDataStudioEntity {
		return entity.NewJsonEntity(client, entopts)
	}
	core.NewN202609EntityFunc = func(client *core.HubspotDataStudioSDK, entopts map[string]any) core.HubspotDataStudioEntity {
		return entity.NewN202609Entity(client, entopts)
	}
}

// Constructor re-exports.
var NewHubspotDataStudioSDK = core.NewHubspotDataStudioSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHubspotDataStudioSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *HubspotDataStudioSDK  { return NewHubspotDataStudioSDK(nil) }
func Test() *HubspotDataStudioSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
