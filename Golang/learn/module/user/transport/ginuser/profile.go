package ginuser

import (
	"github.com/gin-gonic/gin"
	"learn/common"
	"learn/component/appctx"
	userbiz "learn/module/user/biz"
	userrepository "learn/module/user/repository"
	userstore "learn/module/user/store"
	"net/http"
)

func GetProfile(ctx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		u := c.MustGet(common.CurrentUser).(common.Requester)

		db := ctx.GetMainDBConnection()
		store := userstore.NewSQLStore(db)
		repo := userrepository.NewProfileRepo(store)
		biz := userbiz.NewGetProfileBiz(repo)

		user, err := biz.GetProfile(c.Request.Context(), u.GetUserId())

		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(user))
	}
}
