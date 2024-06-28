package middleware

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"learn/common"
	"learn/component/appctx"
	"learn/component/tokenprovider/jwt"
	userstore "learn/module/user/store"
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

func RequiredAuth(ctx appctx.AppContext) func(c *gin.Context) {
	tokenprovider := jwt.NewTokenJWTProvider(ctx.GetSecretKey())

	return func(c *gin.Context) {
		token, err := extractTokenFromHeaderString(c.GetHeader("Authorization"))

		if err != nil {
			panic(err)
		}

		db := ctx.GetMainDBConnection()
		store := userstore.NewSQLStore(db)

		payload, err := tokenprovider.Validate(token)

		if err != nil {
			panic(err)
		}

		user, err := store.FindUser(c.Request.Context(), map[string]interface{}{"id": payload.UserId})

		if user.DeletedAt != nil {
			panic(common.ErrNoPermission(errors.New("user is not active")))
		}

		user.Mask(false)

		c.Set(common.CurrentUser, user)
		c.Next()
	}
}
