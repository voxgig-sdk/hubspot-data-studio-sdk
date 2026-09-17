<?php
declare(strict_types=1);

// HubspotDataStudio SDK utility: result_body

class HubspotDataStudioResultBody
{
    public static function call(HubspotDataStudioContext $ctx): ?HubspotDataStudioResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
