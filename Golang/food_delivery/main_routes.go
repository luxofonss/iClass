package main

import (
	"food_delivery/component/appctx"
	"food_delivery/middleware"
	"food_delivery/module/restaurant/transport/ginrestaurant"
	"food_delivery/module/user/transport/ginuser"
	"github.com/gin-gonic/gin"
	"net/http"
)

func setupRoute(appContext appctx.AppContext, r *gin.RouterGroup) {

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	restaurants := r.Group("/restaurants", middleware.RequiredAuth(appContext))
	auth := r.Group("/user")

	auth.POST("/register", ginuser.Register(appContext))
	auth.POST("/login", ginuser.Login(appContext))
	auth.GET("/profile", middleware.RequiredAuth(appContext), ginuser.Profile(appContext))

	restaurants.POST("/", ginrestaurant.CreateRestaurant(appContext))
	restaurants.DELETE("/:id", ginrestaurant.DeleteRestaurant(appContext))
	restaurants.GET("", ginrestaurant.ListRestaurant(appContext))
}
