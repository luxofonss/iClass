package restaurantstorage

import (
	"context"
	restaurantmodel "food_delivery/module/restaurant/model"
)

func (s *sqlStore) CreateRestaurant(ctx context.Context, data *restaurantmodel.RestaurantCreate) error {
	s.db.Create(&data)
	return nil
}
