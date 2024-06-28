package ginuser

import (
	"github.com/gin-gonic/gin"
	"learn/common"
	"learn/component/appctx"
	"learn/component/hasher"
	"learn/module/user/biz"
	"learn/module/user/model"
	"learn/module/user/repository"
	"learn/module/user/store"
	"net/http"
)

func Register(appCtx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		db := appCtx.GetMainDBConnection()

		var data usermodel.UserCreate

		if err := c.ShouldBind(&data); err != nil {
			panic(err)
		}

		// setup dependency
		store := userstore.NewSQLStore(db)
		md5 := hasher.NewMd5Hash()
		repo := userrepository.NewRegisterRepo(store, md5)
		biz := userbiz.NewRegisterBiz(repo)

		if err := biz.Register(c.Request.Context(), &data); err != nil {
			panic(err)
		}

		data.Mask(false)

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.FakeId.String()))
	}
}
