import { HubspotDataStudioEntityBase } from '../HubspotDataStudioEntityBase';
import type { HubspotDataStudioSDK } from '../HubspotDataStudioSDK';
import type { Control } from '../types';
import type { Basic, BasicCreateData, BasicRemoveMatch } from '../HubspotDataStudioTypes';
declare class BasicEntity extends HubspotDataStudioEntityBase<Basic> {
    constructor(client: HubspotDataStudioSDK, entopts: any);
    make(this: BasicEntity): BasicEntity;
    create(this: any, reqdata?: BasicCreateData, ctrl?: Control): Promise<BasicEntity>;
    remove(this: any, reqmatch?: BasicRemoveMatch, ctrl?: Control): Promise<BasicEntity>;
}
export { BasicEntity };
