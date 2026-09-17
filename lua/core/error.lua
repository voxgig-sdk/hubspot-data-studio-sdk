-- HubspotDataStudio SDK error

local HubspotDataStudioError = {}
HubspotDataStudioError.__index = HubspotDataStudioError


function HubspotDataStudioError.new(code, msg, ctx)
  local self = setmetatable({}, HubspotDataStudioError)
  self.is_sdk_error = true
  self.sdk = "HubspotDataStudio"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HubspotDataStudioError:error()
  return self.msg
end


function HubspotDataStudioError:__tostring()
  return self.msg
end


return HubspotDataStudioError
