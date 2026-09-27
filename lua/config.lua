-- HubspotDataStudio SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "HubspotDataStudio",
      slug = "hubspot-data-studio",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.hubapi.com",
      auth = {
        prefix = "",
        ["in"] = "query",
        name = "hapikey",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["advanced"] = {},
        ["basic"] = {},
        ["datasource_ingestion_data_push"] = {},
        ["datasource_ingestion_data_source_get"] = {},
        ["json"] = {},
        ["n2026_09"] = {},
      },
    },
    entity = {
      ["advanced"] = {
        ["fields"] = {
          {
            ["name"] = "config",
            ["title"] = "Config",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "datasourceName",
            ["title"] = "Datasource Name",
            ["type"] = "`$STRING`",
            ["short"] = "Name of datasource",
          },
        },
        ["name"] = "advanced",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data-studio/data-source/2026-09/json",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["lit"] = "json",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["basic"] = {
        ["fields"] = {},
        ["name"] = "basic",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data-studio/data-source/2026-09",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["var"] = "datasource_id",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = nil,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["datasource_ingestion_data_push"] = {
        ["fields"] = {
          {
            ["name"] = "data",
            ["title"] = "Data",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Data",
          },
          {
            ["name"] = "datasourceId",
            ["title"] = "Datasource Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Identifier of the datasource",
          },
          {
            ["name"] = "datasourceName",
            ["title"] = "Datasource Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Name of the datasource",
          },
          {
            ["name"] = "previewLink",
            ["title"] = "Preview Link",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Link to preview the datasource",
          },
        },
        ["name"] = "datasource_ingestion_data_push",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}/data-push",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["var"] = "datasource_id",
                  },
                  {
                    ["lit"] = "data-push",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                  "data-push",
                },
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = nil,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["datasource_ingestion_data_source_get"] = {
        ["fields"] = {
          {
            ["name"] = "columns",
            ["title"] = "Columns",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "An array of FileColumn objects representing the columns in the data source.",
          },
          {
            ["name"] = "createdAt",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The creation date and time of the data source, represented as a string.",
          },
          {
            ["name"] = "datasourceId",
            ["title"] = "Datasource Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The unique identifier for the data source, represented as a 64-bit integer.",
          },
          {
            ["name"] = "datasourceName",
            ["title"] = "Datasource Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The name of the data source, represented as a string.",
          },
          {
            ["name"] = "datasourceType",
            ["title"] = "Datasource Type",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The type of the data source, which is a string with a valid value of 'FILE'.",
          },
          {
            ["name"] = "lastIngestionStatus",
            ["title"] = "Last Ingestion Status",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The status of the last data ingestion process, represented as a string.",
          },
        },
        ["name"] = "datasource_ingestion_data_source_get",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["var"] = "datasource_id",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = nil,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["json"] = {
        ["fields"] = {
          {
            ["name"] = "config",
            ["title"] = "Config",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "createdAt",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the datasource was created.",
          },
          {
            ["name"] = "datasourceId",
            ["title"] = "Datasource Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The unique identifier for the data source.",
          },
          {
            ["name"] = "datasourceName",
            ["title"] = "Datasource Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["update"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The name of the data source.",
          },
          {
            ["name"] = "previewLink",
            ["title"] = "Preview Link",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "A URL string that provides a preview link for the data source.",
          },
          {
            ["name"] = "updatedAt",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the datasource was updated.",
          },
        },
        ["name"] = "json",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}/json",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["var"] = "datasource_id",
                  },
                  {
                    ["lit"] = "json",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                  "json",
                },
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = nil,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["n2026_09"] = {
        ["fields"] = {
          {
            ["name"] = "createdAt",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the datasource was created.",
          },
          {
            ["name"] = "datasourceId",
            ["title"] = "Datasource Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The unique identifier for the data source.",
          },
          {
            ["name"] = "datasourceName",
            ["title"] = "Datasource Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The name of the data source.",
          },
          {
            ["name"] = "previewLink",
            ["title"] = "Preview Link",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "A URL string that provides a preview link for the data source.",
          },
          {
            ["name"] = "updatedAt",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the datasource was updated.",
          },
        },
        ["name"] = "n2026_09",
        ["op"] = {
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["var"] = "datasource_id",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = nil,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["segments"] = {
                  {
                    ["lit"] = "data-studio",
                  },
                  {
                    ["lit"] = "data-source",
                  },
                  {
                    ["lit"] = "2026-09",
                  },
                  {
                    ["var"] = "datasource_id",
                  },
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = nil,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
