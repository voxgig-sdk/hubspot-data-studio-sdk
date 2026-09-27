

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AdvancedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_DATA_STUDIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_DATA_STUDIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotDataStudioSDK.test()
    const ent = testsdk.Advanced()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUBSPOT_DATA_STUDIO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'advanced.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$OBJECT`","key$":"config","index$":0},"datasourceName":{"a":true,"h":"Datasource Name","n":"datasourceName","r":false,"sh":"Name of datasource","t":"`$STRING`","key$":"datasourceName","index$":1}},"name":"advanced","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /data-studio/data-source/2026-09/json","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/data-studio/data-source/2026-09/json","q":{},"r":{},"s":[{"lit":"data-studio"},{"lit":"data-source"},{"lit":"2026-09"},{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"advanced","name__orig":"advanced","Name":"Advanced","name_":"advanced","name-":"advanced","NAME":"ADVANCED","index$":0}, {"active":true,"entity":"advanced","key$":"BasicAdvancedFlow","kind":"basic","name":"BasicAdvancedFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"advanced_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Advanced', {"POST /data-studio/data-source/2026-09/json":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["config"],"type":"object","properties":{"config":{"type":"object","properties":{"file":{"required":["columns","headerRowIndex","sheetIndex"],"type":"object","properties":{"columns":{},"headerRowIndex":{},"sheetIndex":{}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionFileStructureRequest"},"json":{"required":["columns","data"],"type":"object","properties":{"columns":{},"data":{},"recordId":{}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionJsonDataRequest"}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionDataSourceConfig","key$":"config"},"datasourceName":{"type":"string","description":"Name of datasource","example":null,"key$":"datasourceName"}},"example":null,"x-ref":"#/components/schemas/DatasourceIngestionDataSourceCreateRequest","index$":1},"example":null}},"required":true},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const advanced_ref01_ent = client.Advanced()
    let advanced_ref01_data = setup.data.new.advanced['advanced_ref01']

    advanced_ref01_data = (await advanced_ref01_ent.create(advanced_ref01_data)).data()
    assert(null != advanced_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/advanced/AdvancedTestData.json')

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
    ['advanced01','advanced02','advanced03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_DATA_STUDIO_TEST_ADVANCED_ENTID': idmap,
    'HUBSPOT_DATA_STUDIO_TEST_LIVE': 'FALSE',
    'HUBSPOT_DATA_STUDIO_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_DATA_STUDIO_APIKEY': '',
  })

  idmap = env['HUBSPOT_DATA_STUDIO_TEST_ADVANCED_ENTID']

  const live = 'TRUE' === env.HUBSPOT_DATA_STUDIO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_DATA_STUDIO_TEST_ADVANCED_ENTID']
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
  
