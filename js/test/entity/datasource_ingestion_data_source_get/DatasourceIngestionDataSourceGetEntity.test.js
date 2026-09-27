
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


describe('DatasourceIngestionDataSourceGetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_DATA_STUDIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotDataStudioSDK.test()
    const ent = testsdk.DatasourceIngestionDataSourceGet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"columns":{"a":true,"h":"Columns","n":"columns","r":true,"sh":"An array of FileColumn objects representing the columns in the data source.","t":"`$ARRAY`","key$":"columns","index$":0},"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":true,"sh":"The creation date and time of the data source, represented as a string.","t":"`$STRING`","key$":"createdAt","index$":1},"datasourceId":{"a":true,"h":"Datasource Id","n":"datasourceId","r":true,"sh":"The unique identifier for the data source, represented as a 64-bit integer.","t":"`$STRING`","key$":"datasourceId","index$":2},"datasourceName":{"a":true,"h":"Datasource Name","n":"datasourceName","r":true,"sh":"The name of the data source, represented as a string.","t":"`$STRING`","key$":"datasourceName","index$":3},"datasourceType":{"a":true,"h":"Datasource Type","n":"datasourceType","r":true,"sh":"The type of the data source, which is a string with a valid value of 'FILE'.","t":"`$STRING`","key$":"datasourceType","index$":4},"lastIngestionStatus":{"a":true,"h":"Last Ingestion Status","n":"lastIngestionStatus","r":true,"sh":"The status of the last data ingestion process, represented as a string.","t":"`$STRING`","key$":"lastIngestionStatus","index$":5}},"name":"datasource_ingestion_data_source_get","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data-studio/data-source/2026-09/{datasourceId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":null,"k":"param","n":"datasource_id","or":"datasource_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/data-studio/data-source/2026-09/{datasourceId}","q":{"exist":["datasource_id"]},"r":{"param":{"datasourceId":"datasource_id"}},"s":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"var":"datasource_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"datasource_ingestion_data_source_get","name__orig":"datasource_ingestion_data_source_get","Name":"DatasourceIngestionDataSourceGet","name_":"datasource_ingestion_data_source_get","name-":"datasource-ingestion-data-source-get","NAME":"DATASOURCE_INGESTION_DATA_SOURCE_GET","index$":3}, {"active":true,"entity":"datasource_ingestion_data_source_get","key$":"BasicDatasourceIngestionDataSourceGetFlow","kind":"basic","name":"BasicDatasourceIngestionDataSourceGetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"datasource_ingestion_data_source_get_ref01","srcdatavar":"datasource_ingestion_data_source_get_ref01_data","suffix":"_dt0"},"m":{"id":"datasource_ingestion_data_source_get01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-datasource_ingestion_data_source_get_ref01"}}],"index$":0}]}, 'DatasourceIngestionDataSourceGet', {"GET /data-studio/data-source/2026-09/{datasourceId}":{"protocol":"http","parameters":[{"name":"datasourceId","in":"path","description":"The ID of the datasource.","required":true,"style":"simple","explode":false,"schema":{"type":"integer","format":"int64","example":null},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let datasource_ingestion_data_source_get_ref01_data = Object.values(setup.data.existing.datasource_ingestion_data_source_get)[0]

    // LOAD
    const datasource_ingestion_data_source_get_ref01_ent = client.DatasourceIngestionDataSourceGet()
    const datasource_ingestion_data_source_get_ref01_match_dt0 = {}
    const datasource_ingestion_data_source_get_ref01_data_dt0 = (await datasource_ingestion_data_source_get_ref01_ent.load(datasource_ingestion_data_source_get_ref01_match_dt0)).data()
    assert(null != datasource_ingestion_data_source_get_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/datasource_ingestion_data_source_get/DatasourceIngestionDataSourceGetTestData.json')

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
    ['datasource_ingestion_data_source_get01','datasource_ingestion_data_source_get02','datasource_ingestion_data_source_get03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID': idmap,
    'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
    'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_DATA_STUDIO_APIKEY': '',
  })

  idmap = env['HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID']

  const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_SOURCE_GET_ENTID']
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
  
