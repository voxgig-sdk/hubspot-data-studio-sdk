import { HubspotDataStudioEntityBase } from '../HubspotDataStudioEntityBase';
import type { HubspotDataStudioSDK } from '../HubspotDataStudioSDK';
import type { Control } from '../types';
import type { Advanced, AdvancedCreateData } from '../HubspotDataStudioTypes';
declare class AdvancedEntity extends HubspotDataStudioEntityBase<Advanced> {
    constructor(client: HubspotDataStudioSDK, entopts: any);
    make(this: AdvancedEntity): AdvancedEntity;
    create(this: any, reqdata?: AdvancedCreateData, ctrl?: Control): Promise<AdvancedEntity>;
}
export { AdvancedEntity };
