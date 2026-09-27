
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


describe('N202609Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_DATA_STUDIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotDataStudioSDK.test()
    const ent = testsdk.N202609()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the datasource was created.","t":"`$STRING`","key$":"createdAt","index$":0},"datasourceId":{"a":true,"h":"Datasource Id","n":"datasourceId","r":true,"sh":"The unique identifier for the data source.","t":"`$STRING`","key$":"datasourceId","index$":1},"datasourceName":{"a":true,"h":"Datasource Name","n":"datasourceName","r":true,"sh":"The name of the data source.","t":"`$STRING`","key$":"datasourceName","index$":2},"previewLink":{"a":true,"h":"Preview Link","n":"previewLink","r":true,"sh":"A URL string that provides a preview link for the data source.","t":"`$STRING`","key$":"previewLink","index$":3},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the datasource was updated.","t":"`$STRING`","key$":"updatedAt","index$":4}},"name":"n2026_09","op":{"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /data-studio/data-source/2026-09/{datasourceId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":null,"k":"param","n":"datasource_id","or":"datasource_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/data-studio/data-source/2026-09/{datasourceId}","q":{"exist":["datasource_id"]},"r":{"param":{"datasourceId":"datasource_id"}},"s":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"var":"datasource_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /data-studio/data-source/2026-09/{datasourceId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":null,"k":"param","n":"datasource_id","or":"datasource_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/data-studio/data-source/2026-09/{datasourceId}","q":{"exist":["datasource_id"]},"r":{"param":{"datasourceId":"datasource_id"}},"s":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"var":"datasource_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"n2026_09","name__orig":"n2026_09","Name":"N202609","name_":"n2026_09","name-":"n2026-09","NAME":"N2026_09","index$":5}, {"active":true,"entity":"n2026_09","key$":"BasicN202609Flow","kind":"basic","name":"BasicN202609Flow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"n2026_09_ref01","srcdatavar":"n2026_09_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-n2026_09_ref01"}}],"v":[],"index$":0}]}, 'N202609', {"PATCH /data-studio/data-source/2026-09/{datasourceId}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["datasourceName"],"type":"object","properties":{"datasourceName":{"type":"string","description":"New name of datasource. Name cannot be used by another datasource.","example":null,"key$":"datasourceName"}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionDataSourceRenameRequest","index$":1},"example":null}},"required":true},"parameters":[{"name":"datasourceId","in":"path","description":"Identifier of the datasource.","required":true,"style":"simple","explode":false,"schema":{"type":"integer","format":"int64","example":null},"index$":0}]},"PUT /data-studio/data-source/2026-09/{datasourceId}":{"protocol":"http","requestBody":{"content":{"multipart/form-data":{"schema":{"type":"object","properties":{"file":{"type":"string","format":"binary","example":null},"request":{"type":"string","example":null}},"example":null},"example":null}}},"parameters":[{"name":"datasourceId","in":"path","description":"The ID of the datasource.","required":true,"style":"simple","explode":false,"schema":{"type":"integer","format":"int64","example":null},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let n2026_09_ref01_data = Object.values(setup.data.existing.n2026_09)[0]

    // UPDATE
    const n2026_09_ref01_ent = client.N202609()
    const n2026_09_ref01_data_up0 = {}

    const n2026_09_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-n2026_09_ref01_' + setup.now }
    n2026_09_ref01_data_up0 [n2026_09_ref01_markdef_up0.name] = n2026_09_ref01_markdef_up0.value

    const n2026_09_ref01_resdata_up0 = (await n2026_09_ref01_ent.update(n2026_09_ref01_data_up0)).data()
    assert(null != n2026_09_ref01_resdata_up0)

    assert(n2026_09_ref01_resdata_up0[n2026_09_ref01_markdef_up0.name] === n2026_09_ref01_markdef_up0.value)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/n2026_09/N202609TestData.json')

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
    ['n2026_0901','n2026_0902','n2026_0903'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID': idmap,
    'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
    'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_DATA_STUDIO_APIKEY': '',
  })

  idmap = env['HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID']

  const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_N2026_09_ENTID']
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
  
