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
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "datasourceName",
            ["short"] = "Name of datasource",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "advanced",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "json",
                },
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
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = nil,
                      ["kind"] = "param",
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "2026_09",
            },
          },
        },
      },
      ["datasource_ingestion_data_push"] = {
        ["fields"] = {
          {
            ["name"] = "data",
            ["req"] = true,
            ["short"] = "Data",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "datasourceId",
            ["req"] = true,
            ["short"] = "Identifier of the datasource",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceName",
            ["req"] = true,
            ["short"] = "Name of the datasource",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "previewLink",
            ["req"] = true,
            ["short"] = "Link to preview the datasource",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "datasource_ingestion_data_push",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = nil,
                      ["kind"] = "param",
                      ["name"] = "2026_09_id",
                      ["orig"] = "datasource_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}/data-push",
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "2026_09_id",
                  },
                },
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
                    ["var"] = "2026_09_id",
                  },
                  {
                    ["lit"] = "data-push",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "2026_09_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{2026_09_id}",
                  "data-push",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "2026_09",
            },
          },
        },
      },
      ["datasource_ingestion_data_source_get"] = {
        ["fields"] = {
          {
            ["name"] = "columns",
            ["req"] = true,
            ["short"] = "An array of FileColumn objects representing the columns in the data source.",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "createdAt",
            ["req"] = true,
            ["short"] = "The creation date and time of the data source, represented as a string.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceId",
            ["req"] = true,
            ["short"] = "The unique identifier for the data source, represented as a 64-bit integer.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceName",
            ["req"] = true,
            ["short"] = "The name of the data source, represented as a string.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceType",
            ["req"] = true,
            ["short"] = "The type of the data source, which is a string with a valid value of 'FILE'.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lastIngestionStatus",
            ["req"] = true,
            ["short"] = "The status of the last data ingestion process, represented as a string.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "datasource_ingestion_data_source_get",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = nil,
                      ["kind"] = "param",
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "2026_09",
            },
          },
        },
      },
      ["json"] = {
        ["fields"] = {
          {
            ["name"] = "config",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "createdAt",
            ["short"] = "Timestamp when the datasource was created.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceId",
            ["req"] = true,
            ["short"] = "The unique identifier for the data source.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceName",
            ["op"] = {
              ["update"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["short"] = "The name of the data source.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "previewLink",
            ["req"] = true,
            ["short"] = "A URL string that provides a preview link for the data source.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updatedAt",
            ["short"] = "Timestamp when the datasource was updated.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "json",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = nil,
                      ["kind"] = "param",
                      ["name"] = "2026_09_id",
                      ["orig"] = "datasource_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}/json",
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "2026_09_id",
                  },
                },
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
                    ["var"] = "2026_09_id",
                  },
                  {
                    ["lit"] = "json",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "2026_09_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{2026_09_id}",
                  "json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "2026_09",
            },
          },
        },
      },
      ["n2026_09"] = {
        ["fields"] = {
          {
            ["name"] = "createdAt",
            ["short"] = "Timestamp when the datasource was created.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceId",
            ["req"] = true,
            ["short"] = "The unique identifier for the data source.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "datasourceName",
            ["req"] = true,
            ["short"] = "The name of the data source.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "previewLink",
            ["req"] = true,
            ["short"] = "A URL string that provides a preview link for the data source.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updatedAt",
            ["short"] = "Timestamp when the datasource was updated.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "n2026_09",
        ["op"] = {
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = nil,
                      ["kind"] = "param",
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = nil,
                      ["kind"] = "param",
                      ["name"] = "datasource_id",
                      ["orig"] = "datasource_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/data-studio/data-source/2026-09/{datasourceId}",
                ["rename"] = {
                  ["param"] = {
                    ["datasourceId"] = "datasource_id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "datasource_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "data-studio",
                  "data-source",
                  "2026-09",
                  "{datasource_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "2026_09",
            },
          },
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
