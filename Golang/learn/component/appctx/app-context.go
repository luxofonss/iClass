package appctx

import (
	"gorm.io/gorm"
	"learn/pubsub"
)

type AppContext interface {
	GetMainDBConnection() *gorm.DB
	GetSecretKey() string
	GetPubSub() pubsub.Pubsub
}

type appCtx struct {
	db        *gorm.DB
	secretKey string
	ps        pubsub.Pubsub
}

func NewAppContext(db *gorm.DB, secretKey string, ps pubsub.Pubsub) *appCtx {
	return &appCtx{db: db, secretKey: secretKey, ps: ps}
}

func (ctx *appCtx) GetSecretKey() string {
	return ctx.secretKey
}

func (ctx *appCtx) GetMainDBConnection() *gorm.DB {
	return ctx.db
}

func (ctx *appCtx) GetPubSub() pubsub.Pubsub {
	return ctx.ps
}
