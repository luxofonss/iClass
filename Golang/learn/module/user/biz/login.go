package userbiz

import (
	"context"
	"learn/component/tokenprovider"
	usermodel "learn/module/user/model"
)

type LoginRepo interface {
	Login(ctx context.Context, data *usermodel.UserLogin) (*tokenprovider.Token, error)
}

type loginBiz struct {
	repo LoginRepo
}

func NewLoginBiz(repo LoginRepo) *loginBiz {
	return &loginBiz{repo: repo}
}

func (biz *loginBiz) Login(ctx context.Context, data *usermodel.UserLogin) (*tokenprovider.Token, error) {
	token, err := biz.repo.Login(ctx, data)

	if err != nil {
		return nil, err
	}

	return token, nil
}
