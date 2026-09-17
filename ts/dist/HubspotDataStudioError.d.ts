import { Context } from './Context';
declare class HubspotDataStudioError extends Error {
    isHubspotDataStudioError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { HubspotDataStudioError };
