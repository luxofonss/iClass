package ginrestaurant

import (
	"fmt"
	"food_delivery/common"
	"food_delivery/component/appctx"
	restaurantbiz "food_delivery/module/restaurant/biz"
	restaurantmodel "food_delivery/module/restaurant/model"
	restaurantstorage "food_delivery/module/restaurant/storage"
	restaurantlikesstore "food_delivery/module/restaurantlike/store"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ListRestaurant(appCtx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		db := appCtx.GetMainDBConnection()

		var pagingData common.Paging

		if err := c.ShouldBind(&pagingData); err != nil {
			panic(common.ErrInvalidRequest(err))
		}

		pagingData.Fulfill()

		var filter restaurantmodel.Filter

		if err := c.ShouldBind(&filter); err != nil {
			panic(common.ErrInvalidRequest(err))
		}

		store := restaurantstorage.NewSQLStore(db)
		likeStore := restaurantlikesstore.NewSQLStore(db)
		biz := restaurantbiz.NewListRestaurantBiz(store, likeStore)

		result, err := biz.ListRestaurant(c.Request.Context(), &filter, &pagingData)

		if err != nil {
			panic(err)
		}
		//
		//for i := range result {
		//	result[i].Mask(false)
		//}

		fmt.Println(result)

		c.JSON(http.StatusOK, common.NewSuccessResponse(result, pagingData, filter))
	}
}
