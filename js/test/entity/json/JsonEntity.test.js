
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { HubspotDataStudioSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('JsonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_DATA_STUDIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotDataStudioSDK.test()
    const ent = testsdk.Json()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":false,"t":"`$OBJECT`","key$":"config","index$":0},"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the datasource was created.","t":"`$STRING`","key$":"createdAt","index$":1},"datasourceId":{"a":true,"h":"Datasource Id","n":"datasourceId","r":true,"sh":"The unique identifier for the data source.","t":"`$STRING`","key$":"datasourceId","index$":2},"datasourceName":{"a":true,"h":"Datasource Name","n":"datasourceName","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The name of the data source.","t":"`$STRING`","key$":"datasourceName","index$":3},"previewLink":{"a":true,"h":"Preview Link","n":"previewLink","r":true,"sh":"A URL string that provides a preview link for the data source.","t":"`$STRING`","key$":"previewLink","index$":4},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the datasource was updated.","t":"`$STRING`","key$":"updatedAt","index$":5}},"name":"json","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /data-studio/data-source/2026-09/{datasourceId}/json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":null,"k":"param","n":"datasource_id","or":"datasource_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/data-studio/data-source/2026-09/{datasourceId}/json","q":{"exist":["datasource_id"]},"r":{"param":{"datasourceId":"datasource_id"}},"s":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"var":"datasource_id"},{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"json","name__orig":"json","Name":"Json","name_":"json","name-":"json","NAME":"JSON","index$":4}, {"active":true,"entity":"json","key$":"BasicJsonFlow","kind":"basic","name":"BasicJsonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"json_ref01","srcdatavar":"json_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-json_ref01"}}],"v":[],"index$":0}]}, 'Json', {"PUT /data-studio/data-source/2026-09/{datasourceId}/json":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"config":{"type":"object","properties":{"file":{"required":["columns","headerRowIndex","sheetIndex"],"type":"object","properties":{"columns":{},"headerRowIndex":{},"sheetIndex":{}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionFileStructureRequest"},"json":{"required":["columns","data"],"type":"object","properties":{"columns":{},"data":{},"recordId":{}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionJsonDataRequest"}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionDataSourceConfig","key$":"config"},"datasourceName":{"type":"string","description":"New name of the datasource","example":null,"key$":"datasourceName"}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionDataSourceUpdateRequest","index$":1},"example":null}},"required":true},"parameters":[{"name":"datasourceId","in":"path","description":"Identifier of the datasource","required":true,"style":"simple","explode":false,"schema":{"type":"integer","format":"int64","example":null},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let json_ref01_data = Object.values(setup.data.existing.json)[0]

    // UPDATE
    const json_ref01_ent = client.Json()
    const json_ref01_data_up0 = {}

    const json_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-json_ref01_' + setup.now }
    json_ref01_data_up0 [json_ref01_markdef_up0.name] = json_ref01_markdef_up0.value

    const json_ref01_resdata_up0 = (await json_ref01_ent.update(json_ref01_data_up0)).data()
    assert(null != json_ref01_resdata_up0)

    assert(json_ref01_resdata_up0[json_ref01_markdef_up0.name] === json_ref01_markdef_up0.value)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/json/JsonTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HubspotDataStudioSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['json01','json02','json03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_DATA_STUDIO_TEST_JSON_ENTID': idmap,
    'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
    'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_DATA_STUDIO_APIKEY': '',
  })

  idmap = env['HUBSPOT_DATA_STUDIO_TEST_JSON_ENTID']

  const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_JSON_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HubspotDataStudioSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HUBSPOT_DATA_STUDIO_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
