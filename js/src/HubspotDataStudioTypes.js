// Typed models for the HubspotDataStudio SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Advanced
 * @property {Object} config
 * @property {string} [datasourceName]
 */

/**
 * @typedef {Object} AdvancedCreateData
 * @property {Object} config
 * @property {string} [datasourceName]
 */

/**
 * @typedef {Object} Basic
 */

/**
 * @typedef {Object} BasicCreateData
 */

/**
 * @typedef {Object} BasicRemoveMatch
 * @property {number} datasource_id
 */

/**
 * @typedef {Object} DatasourceIngestionDataPush
 * @property {Array} data
 * @property {string} datasourceId
 * @property {string} datasourceName
 * @property {string} previewLink
 */

/**
 * @typedef {Object} DatasourceIngestionDataPushCreateData
 * @property {number} datasource_id
 * @property {Array} data
 * @property {string} datasourceId
 * @property {string} datasourceName
 * @property {string} previewLink
 */

/**
 * @typedef {Object} DatasourceIngestionDataSourceGet
 * @property {Array} columns
 * @property {string} createdAt
 * @property {string} datasourceId
 * @property {string} datasourceName
 * @property {string} datasourceType
 * @property {string} lastIngestionStatus
 */

/**
 * @typedef {Object} DatasourceIngestionDataSourceGetLoadMatch
 * @property {number} datasource_id
 */

/**
 * @typedef {Object} Json
 * @property {Object} [config]
 * @property {string} [createdAt]
 * @property {string} datasourceId
 * @property {string} datasourceName
 * @property {string} previewLink
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} JsonUpdateData
 * @property {number} datasource_id
 * @property {Object} [config]
 * @property {string} [createdAt]
 * @property {string} [datasourceId]
 * @property {string} [datasourceName]
 * @property {string} [previewLink]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} N202609
 * @property {string} [createdAt]
 * @property {string} datasourceId
 * @property {string} datasourceName
 * @property {string} previewLink
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} N202609UpdateData
 * @property {number} datasource_id
 * @property {string} [createdAt]
 * @property {string} [datasourceId]
 * @property {string} [datasourceName]
 * @property {string} [previewLink]
 * @property {string} [updatedAt]
 */

