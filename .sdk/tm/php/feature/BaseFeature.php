<?php
declare(strict_types=1);

// HubspotDataStudio SDK base feature

class HubspotDataStudioBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HubspotDataStudioContext $ctx, array $options): void {}
    public function PostConstruct(HubspotDataStudioContext $ctx): void {}
    public function PostConstructEntity(HubspotDataStudioContext $ctx): void {}
    public function SetData(HubspotDataStudioContext $ctx): void {}
    public function GetData(HubspotDataStudioContext $ctx): void {}
    public function GetMatch(HubspotDataStudioContext $ctx): void {}
    public function SetMatch(HubspotDataStudioContext $ctx): void {}
    public function PrePoint(HubspotDataStudioContext $ctx): void {}
    public function PreSpec(HubspotDataStudioContext $ctx): void {}
    public function PreRequest(HubspotDataStudioContext $ctx): void {}
    public function PreResponse(HubspotDataStudioContext $ctx): void {}
    public function PreResult(HubspotDataStudioContext $ctx): void {}
    public function PreDone(HubspotDataStudioContext $ctx): void {}
    public function PreUnexpected(HubspotDataStudioContext $ctx): void {}
}
