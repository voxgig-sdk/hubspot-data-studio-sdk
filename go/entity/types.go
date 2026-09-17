// Typed models for the HubspotDataStudio SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hubspot-data-studio-sdk/go/core"
)

// Advanced is the typed data model for the advanced entity.
type Advanced struct {
	Config map[string]any `json:"config"`
	DatasourceName *string `json:"datasourceName,omitempty"`
}

// AdvancedCreateData is the typed request payload for Advanced.CreateTyped.
type AdvancedCreateData struct {
	Config map[string]any `json:"config"`
	DatasourceName *string `json:"datasourceName,omitempty"`
}

// Basic is the typed data model for the basic entity.
type Basic struct {
}

// BasicCreateData is the typed request payload for Basic.CreateTyped.
type BasicCreateData struct {
}

// BasicRemoveMatch is the typed request payload for Basic.RemoveTyped.
type BasicRemoveMatch struct {
	DatasourceId int `json:"datasource_id"`
}

// DatasourceIngestionDataPush is the typed data model for the datasource_ingestion_data_push entity.
type DatasourceIngestionDataPush struct {
	Data []any `json:"data"`
	DatasourceId string `json:"datasourceId"`
	DatasourceName string `json:"datasourceName"`
	PreviewLink string `json:"previewLink"`
}

// DatasourceIngestionDataPushCreateData is the typed request payload for DatasourceIngestionDataPush.CreateTyped.
type DatasourceIngestionDataPushCreateData struct {
	F202609Id int `json:"2026_09_id"`
	Data []any `json:"data"`
	DatasourceId string `json:"datasourceId"`
	DatasourceName string `json:"datasourceName"`
	PreviewLink string `json:"previewLink"`
}

// DatasourceIngestionDataSourceGet is the typed data model for the datasource_ingestion_data_source_get entity.
type DatasourceIngestionDataSourceGet struct {
	Columns []any `json:"columns"`
	CreatedAt string `json:"createdAt"`
	DatasourceId string `json:"datasourceId"`
	DatasourceName string `json:"datasourceName"`
	DatasourceType string `json:"datasourceType"`
	LastIngestionStatus string `json:"lastIngestionStatus"`
}

// DatasourceIngestionDataSourceGetLoadMatch is the typed request payload for DatasourceIngestionDataSourceGet.LoadTyped.
type DatasourceIngestionDataSourceGetLoadMatch struct {
	DatasourceId int `json:"datasource_id"`
}

// Json is the typed data model for the json entity.
type Json struct {
	Config *map[string]any `json:"config,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	DatasourceId string `json:"datasourceId"`
	DatasourceName string `json:"datasourceName"`
	PreviewLink string `json:"previewLink"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// JsonUpdateData is the typed request payload for Json.UpdateTyped.
type JsonUpdateData struct {
	F202609Id int `json:"2026_09_id"`
	Config *map[string]any `json:"config,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	DatasourceId *string `json:"datasourceId,omitempty"`
	DatasourceName *string `json:"datasourceName,omitempty"`
	PreviewLink *string `json:"previewLink,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// N202609 is the typed data model for the n2026_09 entity.
type N202609 struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	DatasourceId string `json:"datasourceId"`
	DatasourceName string `json:"datasourceName"`
	PreviewLink string `json:"previewLink"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// N202609UpdateData is the typed request payload for N202609.UpdateTyped.
type N202609UpdateData struct {
	DatasourceId int `json:"datasource_id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	DatasourceId2 *string `json:"datasourceId,omitempty"`
	DatasourceName *string `json:"datasourceName,omitempty"`
	PreviewLink *string `json:"previewLink,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
