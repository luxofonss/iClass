package userbiz

import (
	"context"
	"learn/common"
)

type RegisterRepo interface {
	FindUser(ctx context.Context, conditions map[string]interface{}, moreInfo ...string) (*usermodel.User, error)
	CreateUser(ctx context.Context, data *usermodel.UserCreate) error
}

type registerBiz struct {
	repo RegisterRepo
}

func NewRegisterBiz(repo RegisterRepo) *registerBiz {
	return &registerBiz{repo: repo}
}

func (biz *registerBiz) Register(ctx context.Context, data *usermodel.UserCreate) error {
	user, err := biz.repo.FindUser(ctx, map[string]interface{}{"email": data.Email})
	if err != nil {
		return err
	}

	salt := common.GetSalt(50)

	data.Password = biz.repo.hasher.Hash(data.Password + salt)
	data.Salt = salt
	data.Role = "user"
	data.Status = 1

	if err := biz.repo.CreateUser(ctx, data); err != nil {
		return common.ErrCannotCreateEntity(usermodel.EntityName, err)
	}

	return nil
}
