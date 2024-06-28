package userrepository

import (
	"context"
	"learn/common"
	usermodel "learn/module/user/model"
)

type RegisterUserStore interface {
	FindUser(ctx context.Context, conditions map[string]interface{}, moreInfo ...string) (*usermodel.User, error)
	CreateUser(ctx context.Context, data *usermodel.UserCreate) error
}

type Hasher interface {
	Hash(data string) string
}

type registerRepo struct {
	store  RegisterUserStore
	hasher Hasher
}

func NewRegisterRepo(store RegisterUserStore, hasher Hasher) *registerRepo {
	return &registerRepo{store: store, hasher: hasher}
}

func (repo *registerRepo) Register(ctx context.Context, data *usermodel.UserCreate) error {
	user, _ := repo.store.FindUser(ctx, map[string]interface{}{"email": data.Email})

	if user != nil {
		//if user.Status ==0 {
		//
		//}
		return usermodel.ErrEmailExisted
	}

	salt := common.GetSalt(50)

	data.Password = repo.hasher.Hash(data.Password + salt)
	data.Salt = salt
	data.Role = "user"

	if err := repo.store.CreateUser(ctx, data); err != nil {
		return common.ErrCannotCreateEntity(usermodel.EntityName, err)
	}

	return nil
}
