

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HubspotDataStudioSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


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

    const live = 'TRUE' === process.env.HUBSPOT_DATA_STUDIO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'datasource_ingestion_data_source_get.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"columns","req":true,"short":"An array of FileColumn objects representing the columns in the data source.","type":"`$ARRAY`","index$":0},{"active":true,"name":"createdAt","req":true,"short":"The creation date and time of the data source, represented as a string.","type":"`$STRING`","index$":1},{"active":true,"name":"datasourceId","req":true,"short":"The unique identifier for the data source, represented as a 64-bit integer.","type":"`$STRING`","index$":2},{"active":true,"name":"datasourceName","req":true,"short":"The name of the data source, represented as a string.","type":"`$STRING`","index$":3},{"active":true,"name":"datasourceType","req":true,"short":"The type of the data source, which is a string with a valid value of 'FILE'.","type":"`$STRING`","index$":4},{"active":true,"name":"lastIngestionStatus","req":true,"short":"The status of the last data ingestion process, represented as a string.","type":"`$STRING`","index$":5}],"name":"datasource_ingestion_data_source_get","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":null,"kind":"param","name":"datasource_id","orig":"datasource_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /data-studio/data-source/2026-09/{datasourceId}","json":"{\"operationId\":\"get-/data-studio/data-source/2026-09/{datasourceId}\",\"parameters\":[{\"description\":\"The ID of the datasource.\",\"explode\":false,\"in\":\"path\",\"name\":\"datasourceId\",\"required\":true,\"schema\":{\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"columns\":{\"description\":\"An array of FileColumn objects representing the columns in the data source.\",\"example\":null,\"items\":{\"example\":null,\"properties\":{\"name\":{\"description\":\"The name of the column, represented as a string.\",\"example\":null,\"type\":\"string\"},\"type\":{\"description\":\"The data type of the column, represented as a string.\",\"example\":null,\"type\":\"string\"}},\"required\":[\"name\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"createdAt\":{\"description\":\"The creation date and time of the data source, represented as a string.\",\"example\":null,\"type\":\"string\"},\"datasourceId\":{\"description\":\"The unique identifier for the data source, represented as a 64-bit integer.\",\"example\":null,\"type\":\"string\"},\"datasourceName\":{\"description\":\"The name of the data source, represented as a string.\",\"example\":null,\"type\":\"string\"},\"datasourceType\":{\"description\":\"The type of the data source, which is a string with a valid value of 'FILE'.\",\"enum\":[\"FILE\",\"JSON\"],\"example\":null,\"type\":\"string\"},\"lastIngestionStatus\":{\"description\":\"The status of the last data ingestion process, represented as a string. Valid values include 'SUCCESSFUL', 'IN_PROGRESS', and 'FAILED'.\",\"enum\":[\"FAILED\",\"IN_PROGRESS\",\"SUCCESSFUL\"],\"example\":null,\"type\":\"string\"}},\"required\":[\"columns\",\"createdAt\",\"datasourceId\",\"datasourceName\",\"datasourceType\",\"lastIngestionStatus\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"*/*\":{\"example\":null,\"schema\":{\"description\":\"Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.\",\"example\":{\"category\":\"VALIDATION_ERROR\",\"correlationId\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"links\":{\"knowledge-base\":\"https://www.hubspot.com/products/service/knowledge-base\"},\"message\":\"Invalid input (details will vary based on the error)\"},\"properties\":{\"category\":{\"description\":\"The error category\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{invalidPropertyName=[propertyValue], missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"correlationId\":{\"description\":\"A unique identifier for the request. Include this value with any error reports or support tickets\",\"example\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"format\":\"uuid\",\"type\":\"string\"},\"errors\":{\"description\":\"further information about the error\",\"example\":null,\"items\":{\"description\":\"Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.\",\"example\":null,\"properties\":{\"code\":{\"description\":\"The status code associated with the error detail\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"in\":{\"description\":\"The name of the field or parameter in which the error was found.\",\"example\":null,\"type\":\"string\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":null,\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A map of link names to associated URIs containing documentation about the error or recommended remediation steps\",\"example\":null,\"type\":\"object\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":\"An error occurred\",\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"category\",\"correlationId\",\"message\"],\"type\":\"object\"}}},\"description\":\"\"}},\"security\":[{\"oauth2\":[\"data_integration.data_source.file.read\"]},{\"oauth2\":[\"data-integration-json-datasource-read\"]}],\"securitySchemes\":{\"developer_hapikey\":{\"in\":\"query\",\"name\":\"hapikey\",\"type\":\"apiKey\"},\"oauth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://app.hubspot.com/oauth/authorize\",\"scopes\":{\"data-integration-json-datasource-read\":\"\",\"data-integration-json-datasource-write\":\"\",\"data_integration.data_source.file.read\":\"\",\"data_integration.data_source.file.write\":\"\"},\"tokenUrl\":\"https://api.hubapi.com/oauth/v1/token\"}},\"type\":\"oauth2\"},\"private_apps\":{\"in\":\"header\",\"name\":\"private-app\",\"type\":\"apiKey\"},\"private_apps_legacy\":{\"in\":\"header\",\"name\":\"private-app-legacy\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data-studio/data-source/2026-09/{datasourceId}","rename":{"param":{"datasourceId":"datasource_id"}},"segments":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"var":"datasource_id"}],"select":{"exist":["datasource_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["2026_09"]]},"key$":"datasource_ingestion_data_source_get","name__orig":"datasource_ingestion_data_source_get","Name":"DatasourceIngestionDataSourceGet","name_":"datasource_ingestion_data_source_get","name-":"datasource-ingestion-data-source-get","NAME":"DATASOURCE_INGESTION_DATA_SOURCE_GET","index$":3}, {"active":true,"entity":"datasource_ingestion_data_source_get","key$":"BasicDatasourceIngestionDataSourceGetFlow","kind":"basic","name":"BasicDatasourceIngestionDataSourceGetFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"datasource_ingestion_data_source_get_ref01","srcdatavar":"datasource_ingestion_data_source_get_ref01_data","suffix":"_dt0"},"match":{"id":"datasource_ingestion_data_source_get01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-datasource_ingestion_data_source_get_ref01"}}],"index$":0}]}, 'DatasourceIngestionDataSourceGet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let datasource_ingestion_data_source_get_ref01_data = Object.values(setup.data.existing.datasource_ingestion_data_source_get)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const datasource_ingestion_data_source_get_ref01_ent = client.DatasourceIngestionDataSourceGet()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
    ['datasource_ingestion_data_source_get01','datasource_ingestion_data_source_get02','datasource_ingestion_data_source_get03','2026_0901','2026_0902','2026_0903'],
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
