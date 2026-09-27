# HubspotDataStudio PHP SDK



The PHP SDK for the HubspotDataStudio API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Advanced()` — with named operations (`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hubspot-data-studio-sdk/releases](https://github.com/voxgig-sdk/hubspot-data-studio-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'hubspotdatastudio_sdk.php';

$client = new HubspotDataStudioSDK([
    "apikey" => getenv("HUBSPOT_DATA_STUDIO_APIKEY"),
]);
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Advanced record.
$created = $client->Advanced()->create(["config" => []]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $datasourceingestiondatasourceget = $client->DatasourceIngestionDataSourceGet()->load(["datasource_id" => 1]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = HubspotDataStudioSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$datasourceingestiondatasourceget = $client->DatasourceIngestionDataSourceGet()->load(["datasource_id" => 1]);
print_r($datasourceingestiondatasourceget->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new HubspotDataStudioSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE
HUBSPOT_DATA_STUDIO_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### HubspotDataStudioSDK

```php
require_once 'hubspotdatastudio_sdk.php';
$client = new HubspotDataStudioSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = HubspotDataStudioSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### HubspotDataStudioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Advanced` | `($data): AdvancedEntity` | Create an Advanced entity instance. |
| `Basic` | `($data): BasicEntity` | Create a Basic entity instance. |
| `DatasourceIngestionDataPush` | `($data): DatasourceIngestionDataPushEntity` | Create a DatasourceIngestionDataPush entity instance. |
| `DatasourceIngestionDataSourceGet` | `($data): DatasourceIngestionDataSourceGetEntity` | Create a DatasourceIngestionDataSourceGet entity instance. |
| `Json` | `($data): JsonEntity` | Create a Json entity instance. |
| `N202609` | `($data): N202609Entity` | Create a N202609 entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$advanced = $client->Advanced();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `array` |  |
| `datasourceName` | `string` | Name of datasource |

#### Example: Create

```php
$advanced = $client->Advanced()->create([
    "config" => null, // array
]);
```


### Basic

Create an instance: `$basic = $client->Basic();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Example: Create

```php
$basic = $client->Basic()->create([
]);
```


### DatasourceIngestionDataPush

Create an instance: `$datasource_ingestion_data_push = $client->DatasourceIngestionDataPush();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` | Data |
| `datasourceId` | `string` | Identifier of the datasource |
| `datasourceName` | `string` | Name of the datasource |
| `previewLink` | `string` | Link to preview the datasource |

#### Example: Create

```php
$datasource_ingestion_data_push = $client->DatasourceIngestionDataPush()->create([
    "datasource_id" => null, // int
    "data" => null, // array
    "datasourceId" => null, // string
    "datasourceName" => null, // string
    "previewLink" => null, // string
]);
```


### DatasourceIngestionDataSourceGet

Create an instance: `$datasource_ingestion_data_source_get = $client->DatasourceIngestionDataSourceGet();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `columns` | `array` | An array of FileColumn objects representing the columns in the data source. |
| `createdAt` | `string` | The creation date and time of the data source, represented as a string. |
| `datasourceId` | `string` | The unique identifier for the data source, represented as a 64-bit integer. |
| `datasourceName` | `string` | The name of the data source, represented as a string. |
| `datasourceType` | `string` | The type of the data source, which is a string with a valid value of 'FILE'. |
| `lastIngestionStatus` | `string` | The status of the last data ingestion process, represented as a string. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DatasourceIngestionDataSourceGet record (throws on error).
$datasource_ingestion_data_source_get = $client->DatasourceIngestionDataSourceGet()->load(["datasource_id" => 1]);
```


### Json

Create an instance: `$json = $client->Json();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `array` |  |
| `createdAt` | `string` | Timestamp when the datasource was created. |
| `datasourceId` | `string` | The unique identifier for the data source. |
| `datasourceName` | `string` | The name of the data source. |
| `previewLink` | `string` | A URL string that provides a preview link for the data source. |
| `updatedAt` | `string` | Timestamp when the datasource was updated. |


### N202609

Create an instance: `$n2026_09 = $client->N202609();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the datasource was created. |
| `datasourceId` | `string` | The unique identifier for the data source. |
| `datasourceName` | `string` | The name of the data source. |
| `previewLink` | `string` | A URL string that provides a preview link for the data source. |
| `updatedAt` | `string` | Timestamp when the datasource was updated. |

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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── hubspotdatastudio_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`hubspotdatastudio_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$datasourceingestiondatasourceget = $client->DatasourceIngestionDataSourceGet();
$datasourceingestiondatasourceget->load(["datasource_id" => 1]);

// $datasourceingestiondatasourceget->data_get() now returns the datasourceingestiondatasourceget data from the last load
// $datasourceingestiondatasourceget->match_get() returns the last match criteria
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
