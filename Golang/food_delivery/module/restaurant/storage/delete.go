package restaurantstorage

import (
	"context"
	restaurantmodel "food_delivery/module/restaurant/model"
)

func (s *sqlStore) FindDataWithCondition(
	context context.Context,
	condition map[string]interface{},
	moreKeys ...string) (*restaurantmodel.Restaurant, error) {
	var data restaurantmodel.Restaurant

	if err := s.db.Where(condition).First(&data); err != nil {
		return nil, err
	}

	return &data, nil
}
