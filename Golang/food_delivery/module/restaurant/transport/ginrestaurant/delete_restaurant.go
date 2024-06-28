package ginrestaurant

import (
	"food_delivery/common"
	"food_delivery/component/appctx"
	restaurantbiz "food_delivery/module/restaurant/biz"
	restaurantstorage "food_delivery/module/restaurant/storage"
	"github.com/gin-gonic/gin"
	"net/http"
)

func DeleteRestaurant(appCtx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		db := appCtx.GetMainDBConnection()

		//id, err := strconv.Atoi(c.Param("id"))

		uid, err := common.FromBase58(c.Param("id"))

		if err != nil {
			panic(common.ErrInvalidRequest(err))
		}

		store := restaurantstorage.NewSQLStore(db)
		requester := c.MustGet(common.CurrentUser).(common.Requester)
		biz := restaurantbiz.NewDeleteRestaurantBiz(store, requester)

		if err := biz.DeleteRestaurant(c.Request.Context(), int(uid.GetLocalId())); err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(1))
	}
}
