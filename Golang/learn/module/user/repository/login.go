package userrepository

import (
	"context"
	"learn/common"
	"learn/component/tokenprovider"
	usermodel "learn/module/user/model"
)

type LoginStore interface {
	FindUser(ctx context.Context, conditions map[string]interface{}, moreInfo ...string) (*usermodel.User, error)
}

type loginRepo struct {
	store         LoginStore
	tokenProvider tokenprovider.Provider
	hasher        Hasher
	expiry        int
}

func NewLoginRepo(store LoginStore, tokenProvider tokenprovider.Provider, hasher Hasher, expiry int) *loginRepo {
	return &loginRepo{store: store, tokenProvider: tokenProvider, hasher: hasher, expiry: expiry}
}

func (repo *loginRepo) Login(ctx context.Context, data *usermodel.UserLogin) (*tokenprovider.Token, error) {
	user, err := repo.store.FindUser(ctx, map[string]interface{}{"email": data.Email})

	if err != nil {
		return nil, common.ErrCannotCreateEntity(usermodel.EntityName, err)
	}

	passHashed := repo.hasher.Hash(data.Password + user.Salt)

	if user.Password != passHashed {
		return nil, usermodel.ErrEmailOrPasswordInvalid
	}

	payload := tokenprovider.TokenPayload{
		UserId: user.Id,
		Role:   user.Role,
	}

	accessToken, err := repo.tokenProvider.Generate(payload, repo.expiry)

	return accessToken, nil
}
