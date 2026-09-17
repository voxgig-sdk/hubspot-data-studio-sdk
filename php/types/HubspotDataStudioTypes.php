<?php
declare(strict_types=1);

// Typed models for the HubspotDataStudio SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Advanced entity data model. */
class Advanced
{
    public array $config;
    public ?string $datasourceName = null;
}

/** Request payload for Advanced#create. */
class AdvancedCreateData
{
    public array $config;
    public ?string $datasourceName = null;
}

/** Basic entity data model. */
class Basic
{
}

/** Request payload for Basic#create. */
class BasicCreateData
{
}

/** Request payload for Basic#remove. */
class BasicRemoveMatch
{
    public int $datasource_id;
}

/** DatasourceIngestionDataPush entity data model. */
class DatasourceIngestionDataPush
{
    public array $data;
    public string $datasourceId;
    public string $datasourceName;
    public string $previewLink;
}

/** Request payload for DatasourceIngestionDataPush#create. */
class DatasourceIngestionDataPushCreateData
{
    public array $data;
    public string $datasourceId;
    public string $datasourceName;
    public string $previewLink;
}

/** DatasourceIngestionDataSourceGet entity data model. */
class DatasourceIngestionDataSourceGet
{
    public array $columns;
    public string $createdAt;
    public string $datasourceId;
    public string $datasourceName;
    public string $datasourceType;
    public string $lastIngestionStatus;
}

/** Request payload for DatasourceIngestionDataSourceGet#load. */
class DatasourceIngestionDataSourceGetLoadMatch
{
    public int $datasource_id;
}

/** Json entity data model. */
class Json
{
    public ?array $config = null;
    public ?string $createdAt = null;
    public string $datasourceId;
    public string $datasourceName;
    public string $previewLink;
    public ?string $updatedAt = null;
}

/** Request payload for Json#update. */
class JsonUpdateData
{
    public ?array $config = null;
    public ?string $createdAt = null;
    public ?string $datasourceId = null;
    public ?string $datasourceName = null;
    public ?string $previewLink = null;
    public ?string $updatedAt = null;
}

/** N202609 entity data model. */
class N202609
{
    public ?string $createdAt = null;
    public string $datasourceId;
    public string $datasourceName;
    public string $previewLink;
    public ?string $updatedAt = null;
}

/** Request payload for N202609#update. */
class N202609UpdateData
{
    public int $datasource_id;
    public ?string $createdAt = null;
    public ?string $datasourceId = null;
    public ?string $datasourceName = null;
    public ?string $previewLink = null;
    public ?string $updatedAt = null;
}

