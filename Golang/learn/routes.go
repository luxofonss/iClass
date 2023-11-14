package main

import (
	"learn/component"
	"net/http"

	"github.com/gin-gonic/gin"
)

func setupRoute(appContext appctx.AppContext, r *gin.RouterGroup) {
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	auth := r.Group("/user")

	auth.POST("/register", ginuser.Register(appContext))
}
