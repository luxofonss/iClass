package restaurantmodel

import (
	"errors"
	"food_delivery/common"
	"strings"
)

const EntityName = "restaurant"

type Restaurant struct {
	common.SQLModel `json:",inline"`
	Name            string             `json:"name" gorm:"column:name;"`
	Addr            string             `json:"addr" gorm:"column:addr;"`
	Logo            *common.Image      `json:"logo" gorm:"column:logo;"`
	Cover           *common.Images     `json:"cover" gorm:"column:cover;"`
	User            *common.SimpleUser `json:"user" gorm:""`
	UserId          int                `json:"-" gorm:"column:user_id;"`
	LikeCount       int                `json:"liked_count" gorm:"-"`
}

func (Restaurant) TableName() string { return "restaurants" }

func (r *Restaurant) Mask(isAdminOrOwner bool) {
	r.GenUID(common.DbTypeRestaurant)

	if u := r.User; u != nil {
		u.Mask(isAdminOrOwner)
	}
}

type RestaurantCreate struct {
	common.SQLModel `json:",inline"`
	Name            string         `json:"name" gorm:"column:name;"`
	Addr            string         `json:"addr" gorm:"column:addr;"`
	UserId          int            `json:"-" gorm:"column:user_id;"`
	Logo            *common.Image  `json:"logo" gorm:"column:logo;"`
	Cover           *common.Images `json:"cover" gorm:"column:cover;"`
}

func (data *RestaurantCreate) Validate() error {
	data.Name = strings.TrimSpace(data.Name)

	if data.Name == "" {
		return ErrNameIsEmpty
	}

	return nil
}

func (RestaurantCreate) TableName() string { return "restaurants" }

func (data *RestaurantCreate) Mask(isAdminOrOwner bool) {
	data.GenUID(common.DbTypeRestaurant)
}

type RestaurantUpdate struct {
	Name  *string        `json:"name" gorm:"column:name;"`
	Addr  *string        `json:"addr" gorm:"column:addr;"`
	Logo  *common.Image  `json:"logo" gorm:"column:logo;"`
	Cover *common.Images `json:"cover" gorm:"column:cover;"`
}

func (RestaurantUpdate) TableName() string { return "restaurants" }

var (
	ErrNameIsEmpty = errors.New("Name can't be empty")
)
