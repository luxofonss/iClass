package userstore

import (
	"context"
	usermodel "learn/module/user/model"
)

func (s *sqlStore) GetUserById(ctx context.Context, userId int) (*usermodel.User, error) {
	db := s.db.Table(usermodel.User{}.TableName())

	var user usermodel.User

	if err := db.Where("id = ?", userId).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
