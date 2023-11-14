package business

import restaurantmodel "food_delivery/module/restaurant/model"

type CreateRestaurantStore interface {
	CreateRestaurant(context context.Context, data *restaurantmodel.RestaurantCreate) error
}

type createRestaurantBiz