# HubspotDataStudio SDK utility: make_context

from projectname_sdk.core.context import HubspotDataStudioContext


def make_context_util(ctxmap, basectx):
    return HubspotDataStudioContext(ctxmap, basectx)
