package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestN202609Entity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.N202609(nil)
		if ent == nil {
			t.Fatal("expected non-nil N202609Entity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := n2026_09BasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "n2026_09." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		n202609Ref01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.n2026_09")))
		var n202609Ref01Data map[string]any
		if len(n202609Ref01DataRaw) > 0 {
			n202609Ref01Data = core.ToMapAny(n202609Ref01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = n202609Ref01Data

		// UPDATE
		n202609Ref01Ent := client.N202609(nil)
		n202609Ref01DataUp0Up := map[string]any{
		}

		n202609Ref01MarkdefUp0Name := "createdAt"
		n202609Ref01MarkdefUp0Value := fmt.Sprintf("Mark01-n2026_09_ref01_%d", setup.now)
		n202609Ref01DataUp0Up[n202609Ref01MarkdefUp0Name] = n202609Ref01MarkdefUp0Value

		n202609Ref01ResdataUp0Result, err := n202609Ref01Ent.Update(n202609Ref01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		n202609Ref01ResdataUp0 := core.ToMapAny(entityData(n202609Ref01ResdataUp0Result))
		if n202609Ref01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if n202609Ref01ResdataUp0[n202609Ref01MarkdefUp0Name] != n202609Ref01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", n202609Ref01MarkdefUp0Name, n202609Ref01ResdataUp0[n202609Ref01MarkdefUp0Name])
		}

	})
}

func n2026_09BasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "n2026_09", "N202609TestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read n2026_09 test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse n2026_09 test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"n2026_0901", "n2026_0902", "n2026_0903"},
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
	entidEnvRaw := os.Getenv("HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID": idmap,
		"HUBSPOT_DATA_STUDIO_TEST_LIVE":      "FALSE",
		"HUBSPOT_DATA_STUDIO_TEST_EXPLAIN":   "FALSE",
		"HUBSPOT_DATA_STUDIO_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID"])
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
