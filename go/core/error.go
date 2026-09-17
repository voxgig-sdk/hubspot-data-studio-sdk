package core

type HubspotDataStudioError struct {
	IsHubspotDataStudioError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHubspotDataStudioError(code string, msg string, ctx *Context) *HubspotDataStudioError {
	return &HubspotDataStudioError{
		IsHubspotDataStudioError: true,
		Sdk:              "HubspotDataStudio",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HubspotDataStudioError) Error() string {
	return e.Msg
}
