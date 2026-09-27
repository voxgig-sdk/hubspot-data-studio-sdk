package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HubspotDataStudio",
			"slug": "hubspot-data-studio",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.hubapi.com",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "hapikey",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"advanced": map[string]any{},
				"basic": map[string]any{},
				"datasource_ingestion_data_push": map[string]any{},
				"datasource_ingestion_data_source_get": map[string]any{},
				"json": map[string]any{},
				"n2026_09": map[string]any{},
			},
		},
		"entity": map[string]any{
			"advanced": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "datasourceName",
						"title": "Datasource Name",
						"type": "`$STRING`",
						"short": "Name of datasource",
					},
				},
				"name": "advanced",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/data-studio/data-source/2026-09/json",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "json",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"basic": map[string]any{
				"fields": []any{},
				"name": "basic",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/data-studio/data-source/2026-09",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/data-studio/data-source/2026-09/{datasourceId}",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"var": "datasource_id",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"{datasource_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasourceId": "datasource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "datasource_id",
											"orig": "datasource_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"datasource_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"datasource_ingestion_data_push": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Data",
					},
					map[string]any{
						"name": "datasourceId",
						"title": "Datasource Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Identifier of the datasource",
					},
					map[string]any{
						"name": "datasourceName",
						"title": "Datasource Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the datasource",
					},
					map[string]any{
						"name": "previewLink",
						"title": "Preview Link",
						"type": "`$STRING`",
						"req": true,
						"short": "Link to preview the datasource",
					},
				},
				"name": "datasource_ingestion_data_push",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/data-studio/data-source/2026-09/{datasourceId}/data-push",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"var": "datasource_id",
									},
									map[string]any{
										"lit": "data-push",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"{datasource_id}",
									"data-push",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasourceId": "datasource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "datasource_id",
											"orig": "datasource_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"datasource_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"datasource_ingestion_data_source_get": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "columns",
						"title": "Columns",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of FileColumn objects representing the columns in the data source.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"short": "The creation date and time of the data source, represented as a string.",
					},
					map[string]any{
						"name": "datasourceId",
						"title": "Datasource Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier for the data source, represented as a 64-bit integer.",
					},
					map[string]any{
						"name": "datasourceName",
						"title": "Datasource Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the data source, represented as a string.",
					},
					map[string]any{
						"name": "datasourceType",
						"title": "Datasource Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of the data source, which is a string with a valid value of 'FILE'.",
					},
					map[string]any{
						"name": "lastIngestionStatus",
						"title": "Last Ingestion Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The status of the last data ingestion process, represented as a string.",
					},
				},
				"name": "datasource_ingestion_data_source_get",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data-studio/data-source/2026-09/{datasourceId}",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"var": "datasource_id",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"{datasource_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasourceId": "datasource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "datasource_id",
											"orig": "datasource_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"datasource_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"json": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Timestamp when the datasource was created.",
					},
					map[string]any{
						"name": "datasourceId",
						"title": "Datasource Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier for the data source.",
					},
					map[string]any{
						"name": "datasourceName",
						"title": "Datasource Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The name of the data source.",
					},
					map[string]any{
						"name": "previewLink",
						"title": "Preview Link",
						"type": "`$STRING`",
						"req": true,
						"short": "A URL string that provides a preview link for the data source.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "Timestamp when the datasource was updated.",
					},
				},
				"name": "json",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/data-studio/data-source/2026-09/{datasourceId}/json",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"var": "datasource_id",
									},
									map[string]any{
										"lit": "json",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"{datasource_id}",
									"json",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasourceId": "datasource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "datasource_id",
											"orig": "datasource_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"datasource_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"n2026_09": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Timestamp when the datasource was created.",
					},
					map[string]any{
						"name": "datasourceId",
						"title": "Datasource Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier for the data source.",
					},
					map[string]any{
						"name": "datasourceName",
						"title": "Datasource Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the data source.",
					},
					map[string]any{
						"name": "previewLink",
						"title": "Preview Link",
						"type": "`$STRING`",
						"req": true,
						"short": "A URL string that provides a preview link for the data source.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "Timestamp when the datasource was updated.",
					},
				},
				"name": "n2026_09",
				"op": map[string]any{
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/data-studio/data-source/2026-09/{datasourceId}",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"var": "datasource_id",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"{datasource_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasourceId": "datasource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "datasource_id",
											"orig": "datasource_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"datasource_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/data-studio/data-source/2026-09/{datasourceId}",
								"segments": []any{
									map[string]any{
										"lit": "data-studio",
									},
									map[string]any{
										"lit": "data-source",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"var": "datasource_id",
									},
								},
								"parts": []any{
									"data-studio",
									"data-source",
									"2026-09",
									"{datasource_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasourceId": "datasource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "datasource_id",
											"orig": "datasource_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"datasource_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
