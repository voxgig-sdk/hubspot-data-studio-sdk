import { AdvancedEntity } from './entity/AdvancedEntity';
import { BasicEntity } from './entity/BasicEntity';
import { DatasourceIngestionDataPushEntity } from './entity/DatasourceIngestionDataPushEntity';
import { DatasourceIngestionDataSourceGetEntity } from './entity/DatasourceIngestionDataSourceGetEntity';
import { JsonEntity } from './entity/JsonEntity';
import { N202609Entity } from './entity/N202609Entity';
export type * from './HubspotDataStudioTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HubspotDataStudioEntityBase } from './HubspotDataStudioEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class HubspotDataStudioSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Advanced(entopts?: Record<string, any>): AdvancedEntity;
    Basic(entopts?: Record<string, any>): BasicEntity;
    DatasourceIngestionDataPush(entopts?: Record<string, any>): DatasourceIngestionDataPushEntity;
    DatasourceIngestionDataSourceGet(entopts?: Record<string, any>): DatasourceIngestionDataSourceGetEntity;
    Json(entopts?: Record<string, any>): JsonEntity;
    N202609(entopts?: Record<string, any>): N202609Entity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HubspotDataStudioSDK;
    tester(testopts?: any, sdkopts?: any): HubspotDataStudioSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HubspotDataStudioSDK;
export { stdutil, config, BaseFeature, HubspotDataStudioEntityBase, HubspotDataStudioSDK, SDK, };
