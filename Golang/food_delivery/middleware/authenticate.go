package middleware

import (
	"errors"
	"fmt"
	"food_delivery/common"
	"food_delivery/component/appctx"
	"food_delivery/component/tokenprovider/jwt"
	userstore "food_delivery/module/user/store"
	"github.com/gin-gonic/gin"
	"strings"
)

func ErrWrongAuthHeader(err error) *common.AppError {
	return common.NewCustomError(
		err,
		fmt.Sprintf("wrong authen header"),
		fmt.Sprintf("ErrWrongAuthHeader"),
	)
}

func extractTokenFromHeaderString(s string) (string, error) {
	parts := strings.Split(s, " ")

	if parts[0] != "Bearer" || len(parts) < 2 || strings.TrimSpace(parts[1]) == "" {
		return "", ErrWrongAuthHeader(nil)
	}
	return parts[1], nil
}

func RequiredAuth(appCtx appctx.AppContext) func(c *gin.Context) {
	tokenprovider := jwt.NewTokenJWTProvider(appCtx.GetSecretKey())

	return func(c *gin.Context) {
		token, err := extractTokenFromHeaderString(c.GetHeader("Authorization"))

		if err != nil {
			panic(err)
		}

		db := appCtx.GetMainDBConnection()
		store := userstore.NewSQLStore(db)

		payload, err := tokenprovider.Validate(token)

		if err != nil {
			panic(err)
		}

		user, err := store.FindUser(c.Request.Context(), map[string]interface{}{"id": payload.UserId})

		if err != nil {
			panic(err)
		}

		if user.Status == 0 {
			panic(common.ErrNoPermission(errors.New("user is not active")))
		}

		user.Mask(false)

		c.Set(common.CurrentUser, user)
		c.Next()
	}
}
