# HubspotDataStudio SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HubspotDataStudio",
            "slug": "hubspot-data-studio",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.hubapi.com",
            "auth": {
                "prefix": "",
                "in": "query",
                "name": "hapikey",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "advanced": {},
                "basic": {},
                "datasource_ingestion_data_push": {},
                "datasource_ingestion_data_source_get": {},
                "json": {},
                "n2026_09": {},
            },
        },
        "entity": {
      "advanced": {
        "fields": [
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "datasourceName",
            "title": "Datasource Name",
            "type": "`$STRING`",
            "short": "Name of datasource",
          },
        ],
        "name": "advanced",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/data-studio/data-source/2026-09/json",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "json",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "basic": {
        "fields": [],
        "name": "basic",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/data-studio/data-source/2026-09",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "var": "datasource_id",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": None,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "datasource_ingestion_data_push": {
        "fields": [
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Data",
          },
          {
            "name": "datasourceId",
            "title": "Datasource Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Identifier of the datasource",
          },
          {
            "name": "datasourceName",
            "title": "Datasource Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the datasource",
          },
          {
            "name": "previewLink",
            "title": "Preview Link",
            "type": "`$STRING`",
            "req": True,
            "short": "Link to preview the datasource",
          },
        ],
        "name": "datasource_ingestion_data_push",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}/data-push",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "var": "datasource_id",
                  },
                  {
                    "lit": "data-push",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                  "data-push",
                ],
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": None,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "datasource_ingestion_data_source_get": {
        "fields": [
          {
            "name": "columns",
            "title": "Columns",
            "type": "`$ARRAY`",
            "req": True,
            "short": "An array of FileColumn objects representing the columns in the data source.",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "short": "The creation date and time of the data source, represented as a string.",
          },
          {
            "name": "datasourceId",
            "title": "Datasource Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier for the data source, represented as a 64-bit integer.",
          },
          {
            "name": "datasourceName",
            "title": "Datasource Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The name of the data source, represented as a string.",
          },
          {
            "name": "datasourceType",
            "title": "Datasource Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The type of the data source, which is a string with a valid value of 'FILE'.",
          },
          {
            "name": "lastIngestionStatus",
            "title": "Last Ingestion Status",
            "type": "`$STRING`",
            "req": True,
            "short": "The status of the last data ingestion process, represented as a string.",
          },
        ],
        "name": "datasource_ingestion_data_source_get",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "var": "datasource_id",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": None,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "json": {
        "fields": [
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the datasource was created.",
          },
          {
            "name": "datasourceId",
            "title": "Datasource Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier for the data source.",
          },
          {
            "name": "datasourceName",
            "title": "Datasource Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "short": "The name of the data source.",
          },
          {
            "name": "previewLink",
            "title": "Preview Link",
            "type": "`$STRING`",
            "req": True,
            "short": "A URL string that provides a preview link for the data source.",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the datasource was updated.",
          },
        ],
        "name": "json",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}/json",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "var": "datasource_id",
                  },
                  {
                    "lit": "json",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                  "json",
                ],
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": None,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "n2026_09": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the datasource was created.",
          },
          {
            "name": "datasourceId",
            "title": "Datasource Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier for the data source.",
          },
          {
            "name": "datasourceName",
            "title": "Datasource Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The name of the data source.",
          },
          {
            "name": "previewLink",
            "title": "Preview Link",
            "type": "`$STRING`",
            "req": True,
            "short": "A URL string that provides a preview link for the data source.",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the datasource was updated.",
          },
        ],
        "name": "n2026_09",
        "op": {
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "var": "datasource_id",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": None,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "segments": [
                  {
                    "lit": "data-studio",
                  },
                  {
                    "lit": "data-source",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "var": "datasource_id",
                  },
                ],
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": None,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
