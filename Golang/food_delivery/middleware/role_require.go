package middleware

import "C"
import (
	"errors"
	"food_delivery/common"
	"food_delivery/component/appctx"
	"github.com/gin-gonic/gin"
)

func RoleRequired(appCtx appctx.AppContext, allowRoles ...string) func(c *gin.Context) {
	return func(c *gin.Context) {
		u := c.MustGet(common.CurrentUser).(common.Requester)

		hasRole := false

		for i := range allowRoles {
			if allowRoles[i] == u.GetRole() {
				hasRole = true
				break
			}
		}

		if !hasRole {
			panic(common.ErrNoPermission(errors.New("You don't have permission to access this resource")))
		}

		c.Next()
	}
}
