package usermodel

import (
	"errors"
	"learn/common"
)

const EntityName = "User"

type User struct {
	common.SQLModel `json:",inline"`
	Email           string        `json:"email" gorm:"column:email;"`
	Password        string        `json:"-" gorm:"column:password;"`
	Salt            string        `json:"-" gorm:"column:salt;"`
	LastName        string        `json:"last_name" gorm:"column:last_name;"`
	FirstName       string        `json:"first_name" gorm:"column:first_name;"`
	Phone           string        `json:"phone" gorm:"column:phone;"`
	Role            string        `json:"role" gorm:"column:role;"`
	Avatar          *common.Image `json:"avatar,omitempty" gorm:"column:avatar;type:json"`
}

func (User) TableName() string { return "users" }

func (u *User) Mask(isAdminOrOwner bool) {
	u.GenUID(common.DbTypeUser)
}

// Create
type UserCreate struct {
	common.SQLModel `json:",inline"`
	Email           string        `json:"email" gorm:"column:email;"`
	Password        string        `json:"password" gorm:"column:password;"`
	LastName        string        `json:"last_name" gorm:"column:last_name;"`
	FirstName       string        `json:"first_name" gorm:"column:first_name;"`
	Role            string        `json:"-" gorm:"column:role;"`
	Salt            string        `json:"-" gorm:"column:salt;"`
	Avatar          *common.Image `json:"avatar,omitempty" gorm:"column:avatar;type:json"`
}

func (UserCreate) TableName() string {
	return User{}.TableName()
}

func (u *UserCreate) Mask(isAdmin bool) {
	u.GenUID(common.DbTypeUser)
}

func (u *User) GetUserId() int {
	return u.Id
}

func (u *User) GetEmail() string {
	return u.Email
}

func (u *User) GetRole() string {
	return u.Role
}

type UserLogin struct {
	Email    string `json:"email" gorm:"column:email;"`
	Password string `json:"password" gorm:"column:password;"`
}

func (UserLogin) TableName() string {
	return User{}.TableName()
}

var (
	ErrEmailOrPasswordInvalid = common.NewCustomError(errors.New("email or password invalid"), "email or password invalid", "ErrUsernameOrPasswordInvalid")
	ErrEmailExisted           = common.NewCustomError(errors.New("email existed"), "email existed", "ErrEmailExisted")
)
