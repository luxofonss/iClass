package ginuser

import (
	"food_delivery/common"
	"food_delivery/component/appctx"
	"github.com/gin-gonic/gin"
)

func Profile(appCtx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		u := c.MustGet(common.CurrentUser).(common.Requester)
		c.JSON(200, common.SimpleSuccessResponse(u))
	}
}
