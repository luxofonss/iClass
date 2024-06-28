package restaurantstorage

import (
	"context"
	"food_delivery/common"
	restaurantmodel "food_delivery/module/restaurant/model"
)

func (s *sqlStore) FindDataWithCondition(
	context context.Context,
	condition map[string]interface{},
	moreKeys ...string,
) (*restaurantmodel.Restaurant, error) {
	var result restaurantmodel.Restaurant

	db := s.db.Table(restaurantmodel.Restaurant{}.TableName()).Where("status in (1)")

	if err := db.Where(condition).
		Order("id desc").
		Find(&result).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return &result, nil
}
