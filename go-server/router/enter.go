package router

import (
	"github.com/gin-gonic/gin"
	"go-server/global"
)

type RouterGroup struct {
	*gin.RouterGroup
}

// InitRouter 初始化路由
func InitRouter() *gin.Engine {
	gin.SetMode(global.Config.System.Env)
	router := gin.Default()
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "hello xiaodu-company"})
	})
	//apiRouterApp := router.Group("api/v1")
	//routerGroupApp := RouterGroup{apiRouterApp}
	//routerGroupApp.Group("/", func(ctx *gin.Context) {
	//
	//})
	return router
}
