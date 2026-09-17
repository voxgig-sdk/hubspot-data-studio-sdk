import { HubspotDataStudioEntityBase } from '../HubspotDataStudioEntityBase';
import type { HubspotDataStudioSDK } from '../HubspotDataStudioSDK';
import type { Control } from '../types';
import type { DatasourceIngestionDataSourceGet, DatasourceIngestionDataSourceGetLoadMatch } from '../HubspotDataStudioTypes';
declare class DatasourceIngestionDataSourceGetEntity extends HubspotDataStudioEntityBase<DatasourceIngestionDataSourceGet> {
    constructor(client: HubspotDataStudioSDK, entopts: any);
    make(this: DatasourceIngestionDataSourceGetEntity): DatasourceIngestionDataSourceGetEntity;
    load(this: any, reqmatch?: DatasourceIngestionDataSourceGetLoadMatch, ctrl?: Control): Promise<DatasourceIngestionDataSourceGetEntity>;
}
export { DatasourceIngestionDataSourceGetEntity };
