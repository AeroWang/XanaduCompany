package core

import (
	"go-server/global"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"time"
)

// InitGorm 初始化gorm
func InitGorm() *gorm.DB {
	//主机为空
	if global.Config.MySQL.Host == "" {
		//global.LOG.Warn("")
		global.Log.Warnln("not set any mysql, stop the connection of gorm!")
		return nil
	}

	dsn := global.Config.MySQL.Dsn()

	var mysqlLogger logger.Interface

	if global.Config.System.Env == "debug" {
		//show all sql in the dev environment
		mysqlLogger = logger.Default.LogMode(logger.Info)
	} else {
		//only show sql when error occurs
		mysqlLogger = logger.Default.LogMode(logger.Error)
	}

	//TODO:获取配置文件中的日志级别进一步改造
	global.MySQLLog = logger.Default.LogMode(logger.Info)

	gormDb, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: mysqlLogger,
	})
	if err != nil {
		global.Log.Fatalf("[%s] mysql connected error: ", dsn)
	}

	sqlDB, _ := gormDb.DB()
	sqlDB.SetMaxIdleConns(global.Config.MySQL.Idle) //set max idle connections
	sqlDB.SetMaxOpenConns(global.Config.MySQL.Max)  //set max open connections
	sqlDB.SetConnMaxLifetime(time.Hour * 4)

	return gormDb
}
