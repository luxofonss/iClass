package userrepository

import (
	"context"
	usermodel "learn/module/user/model"
)

type LoginStore interface {
	FindUser(ctx context.Context, conditions map[string]interface{}, moreInfo ...string) (*usermodel.User, error)
}
