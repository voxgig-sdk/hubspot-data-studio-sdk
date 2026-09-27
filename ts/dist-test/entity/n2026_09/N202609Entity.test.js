"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('N202609Entity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_DATA_STUDIO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotDataStudioSDK.test();
        const ent = testsdk.N202609();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_DATA_STUDIO_TEST_LIVE;
        for (const op of ['update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'n2026_09.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "h": "Created At", "n": "createdAt", "r": false, "sh": "Timestamp when the datasource was created.", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "datasourceId": { "a": true, "h": "Datasource Id", "n": "datasourceId", "r": true, "sh": "The unique identifier for the data source.", "t": "`$STRING`", "key$": "datasourceId", "index$": 1 }, "datasourceName": { "a": true, "h": "Datasource Name", "n": "datasourceName", "r": true, "sh": "The name of the data source.", "t": "`$STRING`", "key$": "datasourceName", "index$": 2 }, "previewLink": { "a": true, "h": "Preview Link", "n": "previewLink", "r": true, "sh": "A URL string that provides a preview link for the data source.", "t": "`$STRING`", "key$": "previewLink", "index$": 3 }, "updatedAt": { "a": true, "h": "Updated At", "n": "updatedAt", "r": false, "sh": "Timestamp when the datasource was updated.", "t": "`$STRING`", "key$": "updatedAt", "index$": 4 } }, "name": "n2026_09", "op": { "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /data-studio/data-source/2026-09/{datasourceId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "datasource_id", "or": "datasource_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/data-studio/data-source/2026-09/{datasourceId}", "q": { "exist": ["datasource_id"] }, "r": { "param": { "datasourceId": "datasource_id" } }, "s": [{ "lit": "data-studio" }, { "lit": "data-source" }, { "lit": "2026-09" }, { "var": "datasource_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /data-studio/data-source/2026-09/{datasourceId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "datasource_id", "or": "datasource_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/data-studio/data-source/2026-09/{datasourceId}", "q": { "exist": ["datasource_id"] }, "r": { "param": { "datasourceId": "datasource_id" } }, "s": [{ "lit": "data-studio" }, { "lit": "data-source" }, { "lit": "2026-09" }, { "var": "datasource_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "n2026_09", "name__orig": "n2026_09", "Name": "N202609", "name_": "n2026_09", "name-": "n2026-09", "NAME": "N2026_09", "index$": 5 }, { "active": true, "entity": "n2026_09", "key$": "BasicN202609Flow", "kind": "basic", "name": "BasicN202609Flow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "n2026_09_ref01", "srcdatavar": "n2026_09_ref01_data", "suffix": "_up0", "textfield": "createdAt" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-n2026_09_ref01" } }], "v": [], "index$": 0 }] }, 'N202609', { "PATCH /data-studio/data-source/2026-09/{datasourceId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "required": ["datasourceName"], "type": "object", "properties": { "datasourceName": { "type": "string", "description": "New name of datasource. Name cannot be used by another datasource.", "example": null, "key$": "datasourceName" } }, "example": null, "x-ref": "#/components/schemas/DatasourceIngestionDataSourceRenameRequest", "index$": 1 }, "example": null } }, "required": true }, "parameters": [{ "name": "datasourceId", "in": "path", "description": "Identifier of the datasource.", "required": true, "style": "simple", "explode": false, "schema": { "type": "integer", "format": "int64", "example": null }, "index$": 0 }] }, "PUT /data-studio/data-source/2026-09/{datasourceId}": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "type": "object", "properties": { "file": { "type": "string", "format": "binary", "example": null }, "request": { "type": "string", "example": null } }, "example": null }, "example": null } } }, "parameters": [{ "name": "datasourceId", "in": "path", "description": "The ID of the datasource.", "required": true, "style": "simple", "explode": false, "schema": { "type": "integer", "format": "int64", "example": null }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let n2026_09_ref01_data = Object.values(setup.data.existing.n2026_09)[0];
        // UPDATE
        const n2026_09_ref01_ent = client.N202609();
        const n2026_09_ref01_data_up0 = {};
        const n2026_09_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-n2026_09_ref01_' + setup.now };
        n2026_09_ref01_data_up0[n2026_09_ref01_markdef_up0.name] = n2026_09_ref01_markdef_up0.value;
        const n2026_09_ref01_resdata_up0 = (await n2026_09_ref01_ent.update(n2026_09_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != n2026_09_ref01_resdata_up0);
        (0, node_assert_1.default)(n2026_09_ref01_resdata_up0[n2026_09_ref01_markdef_up0.name] === n2026_09_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/n2026_09/N202609TestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotDataStudioSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['n2026_0901', 'n2026_0902', 'n2026_0903'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID': idmap,
        'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
        'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_DATA_STUDIO_APIKEY': '',
    });
    idmap = env['HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HubspotDataStudioSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.HUBSPOT_DATA_STUDIO_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=N202609Entity.test.js.map