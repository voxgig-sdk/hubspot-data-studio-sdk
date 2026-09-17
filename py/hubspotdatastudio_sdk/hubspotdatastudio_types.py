# Typed models for the HubspotDataStudio SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AdvancedRequired(TypedDict):
    config: dict


class Advanced(AdvancedRequired, total=False):
    datasourceName: str


class AdvancedCreateDataRequired(TypedDict):
    config: dict


class AdvancedCreateData(AdvancedCreateDataRequired, total=False):
    datasourceName: str


class Basic(TypedDict):
    pass


class BasicCreateData(TypedDict):
    pass


class BasicRemoveMatch(TypedDict):
    datasource_id: int


class DatasourceIngestionDataPush(TypedDict):
    data: list
    datasourceId: str
    datasourceName: str
    previewLink: str


class DatasourceIngestionDataPushCreateData(TypedDict):
    datasource_id: int
    data: list
    datasourceId: str
    datasourceName: str
    previewLink: str


class DatasourceIngestionDataSourceGet(TypedDict):
    columns: list
    createdAt: str
    datasourceId: str
    datasourceName: str
    datasourceType: str
    lastIngestionStatus: str


class DatasourceIngestionDataSourceGetLoadMatch(TypedDict):
    datasource_id: int


class JsonRequired(TypedDict):
    datasourceId: str
    datasourceName: str
    previewLink: str


class Json(JsonRequired, total=False):
    config: dict
    createdAt: str
    updatedAt: str


class JsonUpdateDataRequired(TypedDict):
    datasource_id: int


class JsonUpdateData(JsonUpdateDataRequired, total=False):
    config: dict
    createdAt: str
    datasourceId: str
    datasourceName: str
    previewLink: str
    updatedAt: str


class N202609Required(TypedDict):
    datasourceId: str
    datasourceName: str
    previewLink: str


class N202609(N202609Required, total=False):
    createdAt: str
    updatedAt: str


class N202609UpdateDataRequired(TypedDict):
    datasource_id: int


class N202609UpdateData(N202609UpdateDataRequired, total=False):
    createdAt: str
    datasourceId: str
    datasourceName: str
    previewLink: str
    updatedAt: str
