package userrepository

import (
	"context"
	usermodel "learn/module/user/model"
)

type ProfileStore interface {
	GetUserById(ctx context.Context, userId int) (*usermodel.User, error)
}

type profileRepo struct {
	store ProfileStore
}

func NewProfileRepo(store ProfileStore) *profileRepo {
	return &profileRepo{store: store}
}

func (repo *profileRepo) GetProfile(ctx context.Context, userId int) (*usermodel.User, error) {
	user, err := repo.store.GetUserById(ctx, userId)

	if err != nil {
		return nil, err
	}

	return user, nil
}
