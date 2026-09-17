export interface Advanced {
    config: Record<string, any>;
    datasourceName?: string;
}
export interface AdvancedCreateData {
    config: Record<string, any>;
    datasourceName?: string;
}
export interface Basic {
}
export interface BasicCreateData {
}
export interface BasicRemoveMatch {
    datasource_id: number;
}
export interface DatasourceIngestionDataPush {
    data: any[];
    datasourceId: string;
    datasourceName: string;
    previewLink: string;
}
export interface DatasourceIngestionDataPushCreateData {
    datasource_id: number;
    data: any[];
    datasourceId: string;
    datasourceName: string;
    previewLink: string;
}
export interface DatasourceIngestionDataSourceGet {
    columns: any[];
    createdAt: string;
    datasourceId: string;
    datasourceName: string;
    datasourceType: string;
    lastIngestionStatus: string;
}
export interface DatasourceIngestionDataSourceGetLoadMatch {
    datasource_id: number;
}
export interface Json {
    config?: Record<string, any>;
    createdAt?: string;
    datasourceId: string;
    datasourceName: string;
    previewLink: string;
    updatedAt?: string;
}
export interface JsonUpdateData {
    datasource_id: number;
    config?: Record<string, any>;
    createdAt?: string;
    datasourceId?: string;
    datasourceName?: string;
    previewLink?: string;
    updatedAt?: string;
}
export interface N202609 {
    createdAt?: string;
    datasourceId: string;
    datasourceName: string;
    previewLink: string;
    updatedAt?: string;
}
export interface N202609UpdateData {
    datasource_id: number;
    createdAt?: string;
    datasourceId?: string;
    datasourceName?: string;
    previewLink?: string;
    updatedAt?: string;
}
