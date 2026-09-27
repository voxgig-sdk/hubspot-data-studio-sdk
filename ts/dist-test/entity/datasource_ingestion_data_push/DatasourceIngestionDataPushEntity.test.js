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
(0, node_test_1.describe)('DatasourceIngestionDataPushEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_DATA_STUDIO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotDataStudioSDK.test();
        const ent = testsdk.DatasourceIngestionDataPush();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_DATA_STUDIO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'datasource_ingestion_data_push.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "sh": "Data", "t": "`$ARRAY`", "key$": "data", "index$": 0 }, "datasourceId": { "a": true, "h": "Datasource Id", "n": "datasourceId", "r": true, "sh": "Identifier of the datasource", "t": "`$STRING`", "key$": "datasourceId", "index$": 1 }, "datasourceName": { "a": true, "h": "Datasource Name", "n": "datasourceName", "r": true, "sh": "Name of the datasource", "t": "`$STRING`", "key$": "datasourceName", "index$": 2 }, "previewLink": { "a": true, "h": "Preview Link", "n": "previewLink", "r": true, "sh": "Link to preview the datasource", "t": "`$STRING`", "key$": "previewLink", "index$": 3 } }, "name": "datasource_ingestion_data_push", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /data-studio/data-source/2026-09/{datasourceId}/data-push", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "datasource_id", "or": "datasource_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/data-studio/data-source/2026-09/{datasourceId}/data-push", "q": { "exist": ["datasource_id"] }, "r": { "param": { "datasourceId": "datasource_id" } }, "s": [{ "lit": "data-studio" }, { "lit": "data-source" }, { "lit": "2026-09" }, { "var": "datasource_id" }, { "lit": "data-push" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "datasource_ingestion_data_push", "name__orig": "datasource_ingestion_data_push", "Name": "DatasourceIngestionDataPush", "name_": "datasource_ingestion_data_push", "name-": "datasource-ingestion-data-push", "NAME": "DATASOURCE_INGESTION_DATA_PUSH", "index$": 2 }, { "active": true, "entity": "datasource_ingestion_data_push", "key$": "BasicDatasourceIngestionDataPushFlow", "kind": "basic", "name": "BasicDatasourceIngestionDataPushFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "datasource_ingestion_data_push_ref01" }, "m": { "datasource_id": "datasource01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'DatasourceIngestionDataPush', { "POST /data-studio/data-source/2026-09/{datasourceId}/data-push": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "required": ["data"], "type": "object", "properties": { "data": { "type": "array", "description": "Data ", "example": null, "items": { "type": "object", "additionalProperties": { "type": "object", "properties": {}, "example": null }, "example": null }, "key$": "data" } }, "example": null, "x-ref": "#/components/schemas/DatasourceIngestionDataPushRequest", "index$": 1 }, "example": null } }, "required": true }, "parameters": [{ "name": "datasourceId", "in": "path", "description": "Identifier of datasource", "required": true, "style": "simple", "explode": false, "schema": { "type": "integer", "format": "int64", "example": null }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const datasource_ingestion_data_push_ref01_ent = client.DatasourceIngestionDataPush();
        let datasource_ingestion_data_push_ref01_data = setup.data.new.datasource_ingestion_data_push['datasource_ingestion_data_push_ref01'];
        datasource_ingestion_data_push_ref01_data['datasource_id'] = setup.idmap['datasource01'];
        datasource_ingestion_data_push_ref01_data = (await datasource_ingestion_data_push_ref01_ent.create(datasource_ingestion_data_push_ref01_data)).data();
        (0, node_assert_1.default)(null != datasource_ingestion_data_push_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/datasource_ingestion_data_push/DatasourceIngestionDataPushTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotDataStudioSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['datasource_ingestion_data_push01', 'datasource_ingestion_data_push02', 'datasource_ingestion_data_push03', 'datasource01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_PUSH_ENTID': idmap,
        'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
        'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_DATA_STUDIO_APIKEY': '',
    });
    idmap = env['HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_PUSH_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_PUSH_ENTID'];
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
//# sourceMappingURL=DatasourceIngestionDataPushEntity.test.js.map