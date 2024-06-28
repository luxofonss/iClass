package middleware

import (
	"github.com/gin-gonic/gin"
	"learn/common"
	"learn/component/appctx"
)

func Recover(ctx appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				c.Header("Content-Type", "application/json")

				if appErr, ok := err.(*common.AppError); ok {
					c.AbortWithStatusJSON(appErr.StatusCode, appErr)
					panic(err)
					return
				}

				appError := common.ErrInternal(err.(error))

				c.AbortWithStatusJSON(appError.StatusCode, appError)
				panic(err)
				return
			}
		}()

		c.Next()
	}
}
