# HubSpot Data Studio API

HubSpot Data Studio API, merged from the vendor&#39;s per-API OpenAPI documents.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 8 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Advanced](docs/api/advanced.html)

SDK operations: `create`.

Key fields to recognise:

- `datasourceName`: Name of datasource

### [Basic](docs/api/basic.html)

SDK operations: `create`, `remove`.

### [DatasourceIngestionDataPush](docs/api/datasource_ingestion_data_push.html)

Results: successful operation.

SDK operations: `create`.

Key fields to recognise:

- `data`: Data
- `datasourceId`: Identifier of the datasource
- `datasourceName`: Name of the datasource
- `previewLink`: Link to preview the datasource

### [DatasourceIngestionDataSourceGet](docs/api/datasource_ingestion_data_source_get.html)

Results: successful operation.

SDK operations: `load`.

Key fields to recognise:

- `columns`: An array of FileColumn objects representing the columns in the data source.
- `createdAt`: The creation date and time of the data source, represented as a string.
- `datasourceId`: The unique identifier for the data source, represented as a 64-bit integer.
- `datasourceName`: The name of the data source, represented as a string.
- `datasourceType`: The type of the data source, which is a string with a valid value of &#39;FILE&#39;.

### [Json](docs/api/json.html)

Results: successful operation.

SDK operations: `update`.

Key fields to recognise:

- `createdAt`: Timestamp when the datasource was created.
- `datasourceId`: The unique identifier for the data source. It is an integer formatted as int64.
- `datasourceName`: The name of the data source. It is a string.
- `previewLink`: A URL string that provides a preview link for the data source.
- `updatedAt`: Timestamp when the datasource was updated.

### [N202609](docs/api/n2026_09.html)

Results: successful operation.

SDK operations: `patch`, `update`.

Key fields to recognise:

- `createdAt`: Timestamp when the datasource was created.
- `datasourceId`: The unique identifier for the data source. It is an integer formatted as int64.
- `datasourceName`: The name of the data source. It is a string.
- `previewLink`: A URL string that provides a preview link for the data source.
- `updatedAt`: Timestamp when the datasource was updated.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Advanced](docs/api/advanced.html) | `create` | `POST /data-studio/data-source/2026-09/json` | Required |
| [Basic](docs/api/basic.html) | `create` | `POST /data-studio/data-source/2026-09` | Required |
| [Basic](docs/api/basic.html) | `remove` | `DELETE /data-studio/data-source/2026-09/{datasourceId}` | Required |
| [DatasourceIngestionDataPush](docs/api/datasource_ingestion_data_push.html) | `create` | `POST /data-studio/data-source/2026-09/{datasourceId}/data-push` | Required |
| [DatasourceIngestionDataSourceGet](docs/api/datasource_ingestion_data_source_get.html) | `load` | `GET /data-studio/data-source/2026-09/{datasourceId}` | Required |
| [Json](docs/api/json.html) | `update` | `PUT /data-studio/data-source/2026-09/{datasourceId}/json` | Required |
| [N202609](docs/api/n2026_09.html) | `patch` | `PATCH /data-studio/data-source/2026-09/{datasourceId}` | Required |
| [N202609](docs/api/n2026_09.html) | `update` | `PUT /data-studio/data-source/2026-09/{datasourceId}` | Required |

## Connect to the API

- API server: `https://api.hubapi.com`

The default credential is sent in the `hapikey` query.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hubspot-data-studio_list`: List records for an entity. No active entity supports this operation.
- `hubspot-data-studio_load`: Load one record for an entity. Supported entities: `datasource_ingestion_data_source_get`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

