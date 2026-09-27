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
(0, node_test_1.describe)('AdvancedEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_DATA_STUDIO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotDataStudioSDK.test();
        const ent = testsdk.Advanced();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_DATA_STUDIO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'advanced.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "config": { "a": true, "h": "Config", "n": "config", "r": true, "t": "`$OBJECT`", "key$": "config", "index$": 0 }, "datasourceName": { "a": true, "h": "Datasource Name", "n": "datasourceName", "r": false, "sh": "Name of datasource", "t": "`$STRING`", "key$": "datasourceName", "index$": 1 } }, "name": "advanced", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /data-studio/data-source/2026-09/json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/data-studio/data-source/2026-09/json", "q": {}, "r": {}, "s": [{ "lit": "data-studio" }, { "lit": "data-source" }, { "lit": "2026-09" }, { "lit": "json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "advanced", "name__orig": "advanced", "Name": "Advanced", "name_": "advanced", "name-": "advanced", "NAME": "ADVANCED", "index$": 0 }, { "active": true, "entity": "advanced", "key$": "BasicAdvancedFlow", "kind": "basic", "name": "BasicAdvancedFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "advanced_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Advanced', { "POST /data-studio/data-source/2026-09/json": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "required": ["config"], "type": "object", "properties": { "config": { "type": "object", "properties": { "file": { "required": ["columns", "headerRowIndex", "sheetIndex"], "type": "object", "properties": { "columns": {}, "headerRowIndex": {}, "sheetIndex": {} }, "example": null, "x-ref": "#/components/schemas/DatasourceIngestionFileStructureRequest" }, "json": { "required": ["columns", "data"], "type": "object", "properties": { "columns": {}, "data": {}, "recordId": {} }, "example": null, "x-ref": "#/components/schemas/DatasourceIngestionJsonDataRequest" } }, "example": null, "x-ref": "#/components/schemas/DatasourceIngestionDataSourceConfig", "key$": "config" }, "datasourceName": { "type": "string", "description": "Name of datasource", "example": null, "key$": "datasourceName" } }, "example": null, "x-ref": "#/components/schemas/DatasourceIngestionDataSourceCreateRequest", "index$": 1 }, "example": null } }, "required": true }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const advanced_ref01_ent = client.Advanced();
        let advanced_ref01_data = setup.data.new.advanced['advanced_ref01'];
        advanced_ref01_data = (await advanced_ref01_ent.create(advanced_ref01_data)).data();
        (0, node_assert_1.default)(null != advanced_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/advanced/AdvancedTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotDataStudioSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['advanced01', 'advanced02', 'advanced03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_DATA_STUDIO_TEST_ADVANCED_ENTID': idmap,
        'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
        'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_DATA_STUDIO_APIKEY': '',
    });
    idmap = env['HUBSPOT_DATA_STUDIO_TEST_ADVANCED_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_ADVANCED_ENTID'];
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
//# sourceMappingURL=AdvancedEntity.test.js.map