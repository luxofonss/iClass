package userbiz

import (
	"context"
	usermodel "learn/module/user/model"
)

type RegisterRepo interface {
	Register(ctx context.Context, data *usermodel.UserCreate) error
}

type registerBiz struct {
	repo RegisterRepo
}

func NewRegisterBiz(repo RegisterRepo) *registerBiz {
	return &registerBiz{repo: repo}
}

func (biz *registerBiz) Register(ctx context.Context, data *usermodel.UserCreate) error {
	err := biz.repo.Register(ctx, data)

	if err != nil {
		return err
	}

	return nil
}
