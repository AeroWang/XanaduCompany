package main

import (
	"go-server/core"
	"go-server/global"
	"go-server/router"
)

func main() {
	//1.初始化系统设置
	core.InitConf()
	//2.初始化数据库
	global.DB = core.InitGorm()
	//3.初始化日志
	global.Log = core.InitLogger()

	router := router.InitRouter()

	addr := global.Config.System.Addr()
	global.Log.Infof("server running in %s successfully!", addr)
	err := router.Run(addr)
	if err != nil {
		global.Log.Fatalf(err.Error())
	}
}
