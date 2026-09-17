import { HubspotDataStudioEntityBase } from '../HubspotDataStudioEntityBase';
import type { HubspotDataStudioSDK } from '../HubspotDataStudioSDK';
import type { Control } from '../types';
import type { N202609, N202609UpdateData } from '../HubspotDataStudioTypes';
declare class N202609Entity extends HubspotDataStudioEntityBase<N202609> {
    constructor(client: HubspotDataStudioSDK, entopts: any);
    make(this: N202609Entity): N202609Entity;
    update(this: any, reqdata?: N202609UpdateData, ctrl?: Control): Promise<N202609Entity>;
}
export { N202609Entity };
