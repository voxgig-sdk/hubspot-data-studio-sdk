-- Typed models for the HubspotDataStudio SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Advanced
---@field config table
---@field datasourceName? string

---@class AdvancedCreateData
---@field config table
---@field datasourceName? string

---@class Basic

---@class BasicCreateData

---@class BasicRemoveMatch
---@field datasource_id number

---@class DatasourceIngestionDataPush
---@field data table
---@field datasourceId string
---@field datasourceName string
---@field previewLink string

---@class DatasourceIngestionDataPushCreateData
---@field ["2026_09_id"] number
---@field data table
---@field datasourceId string
---@field datasourceName string
---@field previewLink string

---@class DatasourceIngestionDataSourceGet
---@field columns table
---@field createdAt string
---@field datasourceId string
---@field datasourceName string
---@field datasourceType string
---@field lastIngestionStatus string

---@class DatasourceIngestionDataSourceGetLoadMatch
---@field datasource_id number

---@class Json
---@field config? table
---@field createdAt? string
---@field datasourceId string
---@field datasourceName string
---@field previewLink string
---@field updatedAt? string

---@class JsonUpdateData
---@field ["2026_09_id"] number
---@field config? table
---@field createdAt? string
---@field datasourceId? string
---@field datasourceName? string
---@field previewLink? string
---@field updatedAt? string

---@class N202609
---@field createdAt? string
---@field datasourceId string
---@field datasourceName string
---@field previewLink string
---@field updatedAt? string

---@class N202609UpdateData
---@field datasource_id number
---@field createdAt? string
---@field datasourceId? string
---@field datasourceName? string
---@field previewLink? string
---@field updatedAt? string

local M = {}

return M
