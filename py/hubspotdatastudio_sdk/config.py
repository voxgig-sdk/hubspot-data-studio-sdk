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
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "datasourceName",
            "short": "Name of datasource",
            "type": "`$STRING`",
          },
        ],
        "name": "advanced",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "json",
                ],
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
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "2026_09",
            ],
          ],
        },
      },
      "datasource_ingestion_data_push": {
        "fields": [
          {
            "name": "data",
            "req": True,
            "short": "Data",
            "type": "`$ARRAY`",
          },
          {
            "name": "datasourceId",
            "req": True,
            "short": "Identifier of the datasource",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceName",
            "req": True,
            "short": "Name of the datasource",
            "type": "`$STRING`",
          },
          {
            "name": "previewLink",
            "req": True,
            "short": "Link to preview the datasource",
            "type": "`$STRING`",
          },
        ],
        "name": "datasource_ingestion_data_push",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}/data-push",
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                  "data-push",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "2026_09",
            ],
          ],
        },
      },
      "datasource_ingestion_data_source_get": {
        "fields": [
          {
            "name": "columns",
            "req": True,
            "short": "An array of FileColumn objects representing the columns in the data source.",
            "type": "`$ARRAY`",
          },
          {
            "name": "createdAt",
            "req": True,
            "short": "The creation date and time of the data source, represented as a string.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceId",
            "req": True,
            "short": "The unique identifier for the data source, represented as a 64-bit integer.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceName",
            "req": True,
            "short": "The name of the data source, represented as a string.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceType",
            "req": True,
            "short": "The type of the data source, which is a string with a valid value of 'FILE'.",
            "type": "`$STRING`",
          },
          {
            "name": "lastIngestionStatus",
            "req": True,
            "short": "The status of the last data ingestion process, represented as a string.",
            "type": "`$STRING`",
          },
        ],
        "name": "datasource_ingestion_data_source_get",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "2026_09",
            ],
          ],
        },
      },
      "json": {
        "fields": [
          {
            "name": "config",
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "short": "Timestamp when the datasource was created.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceId",
            "req": True,
            "short": "The unique identifier for the data source.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceName",
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "The name of the data source.",
            "type": "`$STRING`",
          },
          {
            "name": "previewLink",
            "req": True,
            "short": "A URL string that provides a preview link for the data source.",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "short": "Timestamp when the datasource was updated.",
            "type": "`$STRING`",
          },
        ],
        "name": "json",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}/json",
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                  "json",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "2026_09",
            ],
          ],
        },
      },
      "n2026_09": {
        "fields": [
          {
            "name": "createdAt",
            "short": "Timestamp when the datasource was created.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceId",
            "req": True,
            "short": "The unique identifier for the data source.",
            "type": "`$STRING`",
          },
          {
            "name": "datasourceName",
            "req": True,
            "short": "The name of the data source.",
            "type": "`$STRING`",
          },
          {
            "name": "previewLink",
            "req": True,
            "short": "A URL string that provides a preview link for the data source.",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "short": "Timestamp when the datasource was updated.",
            "type": "`$STRING`",
          },
        ],
        "name": "n2026_09",
        "op": {
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "datasource_id",
                      "orig": "datasource_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/data-studio/data-source/2026-09/{datasourceId}",
                "rename": {
                  "param": {
                    "datasourceId": "datasource_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "datasource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "2026_09",
            ],
          ],
        },
      },
    },
    }
