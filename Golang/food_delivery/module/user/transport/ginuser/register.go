package ginuser

import (
	"food_delivery/common"
	"food_delivery/component/appctx"
	"food_delivery/component/hasher"
	userbiz "food_delivery/module/user/biz"
	usermodel "food_delivery/module/user/model"
	userstore "food_delivery/module/user/store"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Register(appCtx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		db := appCtx.GetMainDBConnection()

		var data usermodel.UserCreate

		if err := c.ShouldBind(&data); err != nil {
			panic(err)
		}

		store := userstore.NewSQLStore(db)
		md5 := hasher.NewMd5Hash()
		biz := userbiz.NewRegisterBiz(store, md5)

		if err := biz.Register(c.Request.Context(), &data); err != nil {
			panic(err)
		}

		data.Mask(false)

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.FakeId.String()))
	}
}
