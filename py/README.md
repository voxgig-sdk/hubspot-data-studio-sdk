# HubspotDataStudio Python SDK



The Python SDK for the HubspotDataStudio API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Advanced()` — each
carrying a small, uniform set of operations (`load`, `create`, `update`, `remove`, `patch`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hubspot-data-studio-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from hubspotdatastudio_sdk import HubspotDataStudioSDK

client = HubspotDataStudioSDK({
    "apikey": os.environ.get("HUBSPOT_DATA_STUDIO_APIKEY"),
})
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Advanced().create({"config": {}})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    datasourceingestiondatasourceget = client.DatasourceIngestionDataSourceGet().load({"datasource_id": 1})
    print(datasourceingestiondatasourceget)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = HubspotDataStudioSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
datasourceingestiondatasourceget = client.DatasourceIngestionDataSourceGet().load({"datasource_id": 1})
# datasourceingestiondatasourceget contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = HubspotDataStudioSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE
HUBSPOT_DATA_STUDIO_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### HubspotDataStudioSDK

```python
from hubspotdatastudio_sdk import HubspotDataStudioSDK

client = HubspotDataStudioSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = HubspotDataStudioSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### HubspotDataStudioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Advanced` | `(data) -> AdvancedEntity` | Create an Advanced entity instance. |
| `Basic` | `(data) -> BasicEntity` | Create a Basic entity instance. |
| `DatasourceIngestionDataPush` | `(data) -> DatasourceIngestionDataPushEntity` | Create a DatasourceIngestionDataPush entity instance. |
| `DatasourceIngestionDataSourceGet` | `(data) -> DatasourceIngestionDataSourceGetEntity` | Create a DatasourceIngestionDataSourceGet entity instance. |
| `Json` | `(data) -> JsonEntity` | Create a Json entity instance. |
| `N202609` | `(data) -> N202609Entity` | Create a N202609 entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Advanced

| Field | Description |
| --- | --- |
| `config` |  |
| `datasourceName` | Name of datasource |

Operations: Create.

API path: `/data-studio/data-source/2026-09/json`

#### Basic

| Field | Description |
| --- | --- |

Operations: Create, Remove.

API path: `/data-studio/data-source/2026-09`

#### DatasourceIngestionDataPush

| Field | Description |
| --- | --- |
| `data` | Data |
| `datasourceId` | Identifier of the datasource |
| `datasourceName` | Name of the datasource |
| `previewLink` | Link to preview the datasource |

Operations: Create.

API path: `/data-studio/data-source/2026-09/{datasourceId}/data-push`

#### DatasourceIngestionDataSourceGet

| Field | Description |
| --- | --- |
| `columns` | An array of FileColumn objects representing the columns in the data source. |
| `createdAt` | The creation date and time of the data source, represented as a string. |
| `datasourceId` | The unique identifier for the data source, represented as a 64-bit integer. |
| `datasourceName` | The name of the data source, represented as a string. |
| `datasourceType` | The type of the data source, which is a string with a valid value of 'FILE'. |
| `lastIngestionStatus` | The status of the last data ingestion process, represented as a string. |

Operations: Load.

API path: `/data-studio/data-source/2026-09/{datasourceId}`

#### Json

| Field | Description |
| --- | --- |
| `config` |  |
| `createdAt` | Timestamp when the datasource was created. |
| `datasourceId` | The unique identifier for the data source. |
| `datasourceName` | The name of the data source. |
| `previewLink` | A URL string that provides a preview link for the data source. |
| `updatedAt` | Timestamp when the datasource was updated. |

Operations: Update.

API path: `/data-studio/data-source/2026-09/{datasourceId}/json`

#### N202609

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp when the datasource was created. |
| `datasourceId` | The unique identifier for the data source. |
| `datasourceName` | The name of the data source. |
| `previewLink` | A URL string that provides a preview link for the data source. |
| `updatedAt` | Timestamp when the datasource was updated. |

Operations: Patch, Update.

API path: `/data-studio/data-source/2026-09/{datasourceId}`



## Entities


### Advanced

Create an instance: `advanced = client.Advanced()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` |  |
| `datasourceName` | `str` | Name of datasource |

#### Example: Create

```python
advanced = client.Advanced().create({
    "config": {},  # dict
})
```


### Basic

Create an instance: `basic = client.Basic()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Example: Create

```python
basic = client.Basic().create({
})
```


### DatasourceIngestionDataPush

Create an instance: `datasource_ingestion_data_push = client.DatasourceIngestionDataPush()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` | Data |
| `datasourceId` | `str` | Identifier of the datasource |
| `datasourceName` | `str` | Name of the datasource |
| `previewLink` | `str` | Link to preview the datasource |

#### Example: Create

```python
datasource_ingestion_data_push = client.DatasourceIngestionDataPush().create({
    "datasource_id": 1,  # int
    "data": [],  # list
    "datasourceId": "example_datasourceId",  # str
    "datasourceName": "example_datasourceName",  # str
    "previewLink": "example_previewLink",  # str
})
```


### DatasourceIngestionDataSourceGet

Create an instance: `datasource_ingestion_data_source_get = client.DatasourceIngestionDataSourceGet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `columns` | `list` | An array of FileColumn objects representing the columns in the data source. |
| `createdAt` | `str` | The creation date and time of the data source, represented as a string. |
| `datasourceId` | `str` | The unique identifier for the data source, represented as a 64-bit integer. |
| `datasourceName` | `str` | The name of the data source, represented as a string. |
| `datasourceType` | `str` | The type of the data source, which is a string with a valid value of 'FILE'. |
| `lastIngestionStatus` | `str` | The status of the last data ingestion process, represented as a string. |

#### Example: Load

```python
datasource_ingestion_data_source_get = client.DatasourceIngestionDataSourceGet().load({"datasource_id": 1})
```


### Json

Create an instance: `json = client.Json()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` |  |
| `createdAt` | `str` | Timestamp when the datasource was created. |
| `datasourceId` | `str` | The unique identifier for the data source. |
| `datasourceName` | `str` | The name of the data source. |
| `previewLink` | `str` | A URL string that provides a preview link for the data source. |
| `updatedAt` | `str` | Timestamp when the datasource was updated. |


### N202609

Create an instance: `n2026_09 = client.N202609()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Timestamp when the datasource was created. |
| `datasourceId` | `str` | The unique identifier for the data source. |
| `datasourceName` | `str` | The name of the data source. |
| `previewLink` | `str` | A URL string that provides a preview link for the data source. |
| `updatedAt` | `str` | Timestamp when the datasource was updated. |

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── hubspotdatastudio_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`hubspotdatastudio_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
datasourceingestiondatasourceget = client.DatasourceIngestionDataSourceGet()
datasourceingestiondatasourceget.load({"datasource_id": 1})

# datasourceingestiondatasourceget.data_get() now returns the datasourceingestiondatasourceget data from the last load
# datasourceingestiondatasourceget.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
