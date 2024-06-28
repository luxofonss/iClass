package userbiz

import (
	"context"
	usermodel "learn/module/user/model"
)

type ProfileRepo interface {
	GetProfile(ctx context.Context, userId int) (*usermodel.User, error)
}

type profileBiz struct {
	repo ProfileRepo
}

func NewGetProfileBiz(repo ProfileRepo) *profileBiz {
	return &profileBiz{repo: repo}
}

func (biz *profileBiz) GetProfile(ctx context.Context, userId int) (*usermodel.User, error) {
	user, err := biz.repo.GetProfile(ctx, userId)

	if err != nil {
		return nil, err
	}

	return user, nil
}
