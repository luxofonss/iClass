package ginuser

import (
	"github.com/gin-gonic/gin"
	"learn/common"
	"learn/component/appctx"
	"learn/component/hasher"
	"learn/component/tokenprovider/jwt"
	userbiz "learn/module/user/biz"
	usermodel "learn/module/user/model"
	userrepository "learn/module/user/repository"
	userstore "learn/module/user/store"
	"net/http"
)

func Login(ctx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		var loginUserData usermodel.UserLogin

		if err := c.ShouldBind(&loginUserData); err != nil {
			panic(common.ErrInvalidRequest(err))
		}

		db := ctx.GetMainDBConnection()
		tokenProvider := jwt.NewTokenJWTProvider(ctx.GetSecretKey())

		store := userstore.NewSQLStore(db)
		md5 := hasher.NewMd5Hash()
		repo := userrepository.NewLoginRepo(store, tokenProvider, md5, 30*24*60*60)

		biz := userbiz.NewLoginBiz(repo)

		token, err := biz.Login(c.Request.Context(), &loginUserData)

		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(token))
	}
}
