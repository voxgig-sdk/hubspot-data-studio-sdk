import { HubspotDataStudioEntityBase } from '../HubspotDataStudioEntityBase';
import type { HubspotDataStudioSDK } from '../HubspotDataStudioSDK';
import type { Control } from '../types';
import type { Json, JsonUpdateData } from '../HubspotDataStudioTypes';
declare class JsonEntity extends HubspotDataStudioEntityBase<Json> {
    constructor(client: HubspotDataStudioSDK, entopts: any);
    make(this: JsonEntity): JsonEntity;
    update(this: any, reqdata?: JsonUpdateData, ctrl?: Control): Promise<JsonEntity>;
}
export { JsonEntity };
