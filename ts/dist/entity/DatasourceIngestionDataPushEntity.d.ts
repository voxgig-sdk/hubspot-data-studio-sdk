import { HubspotDataStudioEntityBase } from '../HubspotDataStudioEntityBase';
import type { HubspotDataStudioSDK } from '../HubspotDataStudioSDK';
import type { Control } from '../types';
import type { DatasourceIngestionDataPush, DatasourceIngestionDataPushCreateData } from '../HubspotDataStudioTypes';
declare class DatasourceIngestionDataPushEntity extends HubspotDataStudioEntityBase<DatasourceIngestionDataPush> {
    constructor(client: HubspotDataStudioSDK, entopts: any);
    make(this: DatasourceIngestionDataPushEntity): DatasourceIngestionDataPushEntity;
    create(this: any, reqdata?: DatasourceIngestionDataPushCreateData, ctrl?: Control): Promise<DatasourceIngestionDataPushEntity>;
}
export { DatasourceIngestionDataPushEntity };
