<?php
declare(strict_types=1);

// HubspotDataStudio SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HubspotDataStudioMakeContext
{
    public static function call(array $ctxmap, ?HubspotDataStudioContext $basectx): HubspotDataStudioContext
    {
        return new HubspotDataStudioContext($ctxmap, $basectx);
    }
}
