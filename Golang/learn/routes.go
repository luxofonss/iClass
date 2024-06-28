package main

import (
	"learn/component/appctx"
	"learn/middleware"
	ginrestaurant "learn/module/restaurant/transport/gin"
	ginrestaurantlike "learn/module/restaurant_like/transport/gin"
	"learn/module/user/transport/ginuser"
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

	{
		auth.POST("/register", ginuser.Register(appContext))
		auth.POST("/authenticate", ginuser.Login(appContext))
		auth.GET("/profile", middleware.RequiredAuth(appContext), ginuser.GetProfile(appContext))
	}

	restaurant := r.Group("/restaurants")

	{
		restaurant.GET("/", middleware.RequiredAuth(appContext), ginrestaurant.ListRestaurant(appContext))
		restaurant.POST("/", middleware.RequiredAuth(appContext), ginrestaurant.CreateRestaurant(appContext))
		restaurant.POST("/:id/like-users", middleware.RequiredAuth(appContext), ginrestaurantlike.LikeRestaurant(appContext))
		restaurant.DELETE("/:id/like-users", middleware.RequiredAuth(appContext), ginrestaurantlike.UserDislikeRestaurant(appContext))
		restaurant.GET("/:id/like-users", middleware.RequiredAuth(appContext), ginrestaurantlike.ListUserLikeRestaurant(appContext))
	}
}
