
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


describe('DatasourceIngestionDataPushEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_DATA_STUDIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotDataStudioSDK.test()
    const ent = testsdk.DatasourceIngestionDataPush()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":true,"short":"Data","type":"`$ARRAY`","index$":0},{"active":true,"name":"datasourceId","req":true,"short":"Identifier of the datasource","type":"`$STRING`","index$":1},{"active":true,"name":"datasourceName","req":true,"short":"Name of the datasource","type":"`$STRING`","index$":2},{"active":true,"name":"previewLink","req":true,"short":"Link to preview the datasource","type":"`$STRING`","index$":3}],"name":"datasource_ingestion_data_push","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"example":null,"kind":"param","name":"2026_09_id","orig":"datasource_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /data-studio/data-source/2026-09/{datasourceId}/data-push","json":"{\"operationId\":\"post-/data-studio/data-source/2026-09/{datasourceId}/data-push_/data-studio/data-source/2026-09-beta/{datasourceId}/data-push\",\"parameters\":[{\"description\":\"Identifier of datasource\",\"explode\":false,\"in\":\"path\",\"name\":\"datasourceId\",\"required\":true,\"schema\":{\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"data\":{\"description\":\"Data \",\"example\":null,\"items\":{\"additionalProperties\":{\"example\":null,\"properties\":{},\"type\":\"object\"},\"example\":null,\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"datasourceId\":{\"description\":\"Identifier of the datasource\",\"example\":null,\"type\":\"string\"},\"datasourceName\":{\"description\":\"Name of the datasource\",\"example\":null,\"type\":\"string\"},\"previewLink\":{\"description\":\"Link to preview the datasource\",\"example\":null,\"type\":\"string\"}},\"required\":[\"datasourceId\",\"datasourceName\",\"previewLink\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"*/*\":{\"example\":null,\"schema\":{\"description\":\"Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.\",\"example\":{\"category\":\"VALIDATION_ERROR\",\"correlationId\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"links\":{\"knowledge-base\":\"https://www.hubspot.com/products/service/knowledge-base\"},\"message\":\"Invalid input (details will vary based on the error)\"},\"properties\":{\"category\":{\"description\":\"The error category\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{invalidPropertyName=[propertyValue], missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"correlationId\":{\"description\":\"A unique identifier for the request. Include this value with any error reports or support tickets\",\"example\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"format\":\"uuid\",\"type\":\"string\"},\"errors\":{\"description\":\"further information about the error\",\"example\":null,\"items\":{\"description\":\"Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.\",\"example\":null,\"properties\":{\"code\":{\"description\":\"The status code associated with the error detail\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"in\":{\"description\":\"The name of the field or parameter in which the error was found.\",\"example\":null,\"type\":\"string\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":null,\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A map of link names to associated URIs containing documentation about the error or recommended remediation steps\",\"example\":null,\"type\":\"object\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":\"An error occurred\",\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"category\",\"correlationId\",\"message\"],\"type\":\"object\"}}},\"description\":\"\"}},\"security\":[{\"oauth2\":[\"data-integration-json-datasource-write\"]}],\"securitySchemes\":{\"developer_hapikey\":{\"in\":\"query\",\"name\":\"hapikey\",\"type\":\"apiKey\"},\"oauth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://app.hubspot.com/oauth/authorize\",\"scopes\":{\"data-integration-json-datasource-read\":\"\",\"data-integration-json-datasource-write\":\"\",\"data_integration.data_source.file.read\":\"\",\"data_integration.data_source.file.write\":\"\"},\"tokenUrl\":\"https://api.hubapi.com/oauth/v1/token\"}},\"type\":\"oauth2\"},\"private_apps\":{\"in\":\"header\",\"name\":\"private-app\",\"type\":\"apiKey\"},\"private_apps_legacy\":{\"in\":\"header\",\"name\":\"private-app-legacy\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/data-studio/data-source/2026-09/{datasourceId}/data-push","rename":{"param":{"datasourceId":"2026_09_id"}},"segments":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"var":"2026_09_id"},{"lit":"data-push"}],"select":{"exist":["2026_09_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["2026_09"]]},"key$":"datasource_ingestion_data_push","name__orig":"datasource_ingestion_data_push","Name":"DatasourceIngestionDataPush","name_":"datasource_ingestion_data_push","name-":"datasource-ingestion-data-push","NAME":"DATASOURCE_INGESTION_DATA_PUSH","index$":2}, {"active":true,"entity":"datasource_ingestion_data_push","key$":"BasicDatasourceIngestionDataPushFlow","kind":"basic","name":"BasicDatasourceIngestionDataPushFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"datasource_ingestion_data_push_ref01"},"match":{"2026_09_id":"2026_0901"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'DatasourceIngestionDataPush')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const datasource_ingestion_data_push_ref01_ent = client.DatasourceIngestionDataPush()
    let datasource_ingestion_data_push_ref01_data = setup.data.new.datasource_ingestion_data_push['datasource_ingestion_data_push_ref01']
    datasource_ingestion_data_push_ref01_data['2026_09_id'] = setup.idmap['2026_0901']

    datasource_ingestion_data_push_ref01_data = (await datasource_ingestion_data_push_ref01_ent.create(datasource_ingestion_data_push_ref01_data)).data()
    assert(null != datasource_ingestion_data_push_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/datasource_ingestion_data_push/DatasourceIngestionDataPushTestData.json')

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
    ['datasource_ingestion_data_push01','datasource_ingestion_data_push02','datasource_ingestion_data_push03','2026_0901','2026_0902','2026_0903'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_PUSH_ENTID': idmap,
    'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
    'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_DATA_STUDIO_APIKEY': '',
  })

  idmap = env['HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_PUSH_ENTID']

  const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_DATASOURCE_INGESTION_DATA_PUSH_ENTID']
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
  
