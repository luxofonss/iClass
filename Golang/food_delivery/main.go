package main

import (
	"fmt"
	"food_delivery/component/appctx"
	"food_delivery/middleware"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Restaurant struct {
	Id        int    `json:"id" gorm:"column:id;"` // tag
	Name      string `json:"name" gorm:"column:name;"`
	Addr      string `json:"addr" gorm:"column:addr;"`
	CreatedAt string `json:"created_at" gorm:"column:created_at;"`
	UpdatedAt string `json:"updated_at" gorm:"column:updated_at;"`
}

func (Restaurant) TableName() string { return "restaurants" }

func main() {
	fmt.Println("Hello, World!")

	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	dbname := os.Getenv("POSTGRES_DB_NAME")

	dsn := "user=" + user + " password=" + password + " host=" + host + " port=" + port + " dbname=" + dbname + " sslmode=disable TimeZone=Asia/Shanghai"

	secretKey := os.Getenv("SECRET_KEY")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db = db.Debug()
	appContext := appctx.NewAppContext(db, secretKey)

	// get a server
	r := gin.Default()
	r.Use(middleware.Recover(appContext))

	v1 := r.Group("/v1")

	setupRoute(appContext, v1)

	r.Run()

}
