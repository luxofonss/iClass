package restaurantbiz

import (
	"context"
	"food_delivery/common"
	restaurantmodel "food_delivery/module/restaurant/model"
)

type DeleteRestaurantStore interface {
	FindDataWithCondition(
		context context.Context,
		condition map[string]interface{},
		moreKeys ...string,
	) (*restaurantmodel.Restaurant, error)
	Delete(context context.Context, id int) error
}

type deleteRestaurantBiz struct {
	store     DeleteRestaurantStore
	requester common.Requester
}

func NewDeleteRestaurantBiz(store DeleteRestaurantStore, requester common.Requester) *deleteRestaurantBiz {
	return &deleteRestaurantBiz{store: store, requester: requester}
}

func (biz *deleteRestaurantBiz) DeleteRestaurant(context context.Context, id int) error {
	oldData, err := biz.store.FindDataWithCondition(context, map[string]interface{}{"id": id})

	if err != nil {
		return common.ErrEntityNotFound(restaurantmodel.EntityName, err)
	}

	if oldData.Status == 0 {
		return common.ErrEntityDeleted(restaurantmodel.EntityName)
	}

	if oldData.UserId != biz.requester.GetUserId() {
		return common.ErrNoPermission(err)
	}

	if err := biz.store.Delete(context, id); err != nil {
		return err
	}

	return nil
}
