package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/hubspot-data-studio-sdk/go"
	"github.com/voxgig-sdk/hubspot-data-studio-sdk/go/core"

	vs "github.com/voxgig-sdk/hubspot-data-studio-sdk/go/utility/struct"
)

func TestDatasourceIngestionDataSourceGetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DatasourceIngestionDataSourceGet(nil)
		if ent == nil {
			t.Fatal("expected non-nil DatasourceIngestionDataSourceGetEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := datasource_ingestion_data_source_getBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "datasource_ingestion_data_source_get." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		datasourceIngestionDataSourceGetRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.datasource_ingestion_data_source_get")))
		var datasourceIngestionDataSourceGetRef01Data map[string]any
		if len(datasourceIngestionDataSourceGetRef01DataRaw) > 0 {
			datasourceIngestionDataSourceGetRef01Data = core.ToMapAny(datasourceIngestionDataSourceGetRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = datasourceIngestionDataSourceGetRef01Data

		// LOAD
		datasourceIngestionDataSourceGetRef01Ent := client.DatasourceIngestionDataSourceGet(nil)
		datasourceIngestionDataSourceGetRef01MatchDt0 := map[string]any{}
		datasourceIngestionDataSourceGetRef01DataDt0Loaded, err := datasourceIngestionDataSourceGetRef01Ent.Load(datasourceIngestionDataSourceGetRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if datasourceIngestionDataSourceGetRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func datasource_ingestion_data_source_getBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "datasource_ingestion_data_source_get", "DatasourceIngestionDataSourceGetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read datasource_ingestion_data_source_get test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse datasource_ingestion_data_source_get test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"datasource_ingestion_data_source_get01", "datasource_ingestion_data_source_get02", "datasource_ingestion_data_source_get03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID": idmap,
		"HUBSPOT_DATA_STUDIO_TEST_LIVE":      "FALSE",
		"HUBSPOT_DATA_STUDIO_TEST_EXPLAIN":   "FALSE",
		"HUBSPOT_DATA_STUDIO_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HUBSPOT_DATA_STUDIO_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["HUBSPOT_DATA_STUDIO_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewHubspotDataStudioSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HUBSPOT_DATA_STUDIO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HUBSPOT_DATA_STUDIO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
