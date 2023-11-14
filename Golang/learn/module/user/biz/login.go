package userbiz

import (
	"context"
	usermodel "learn/module/user/model"
)

type LoginRepo interface {
	Login(ctx context.Context, data *usermodel.UserLogin) error
}

type loginBiz struct {
	repo LoginRepo
}

func NewLoginBiz(repo LoginRepo) *loginBiz {
	return &loginBiz{repo: repo}
}

func (biz *loginBiz) Login(ctx context.Context, data *usermodel.UserLogin) error {
	err := biz.repo.Login(ctx, data)

	if err != nil {
		return err
	}

	return nil
}
