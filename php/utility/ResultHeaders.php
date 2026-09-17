<?php
declare(strict_types=1);

// HubspotDataStudio SDK utility: result_headers

class HubspotDataStudioResultHeaders
{
    public static function call(HubspotDataStudioContext $ctx): ?HubspotDataStudioResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
