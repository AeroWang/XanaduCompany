package global

import (
	"github.com/sirupsen/logrus"
	"go-server/config"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// 在global声明的变量可以全局使用
var (
	Config   *config.Config
	DB       *gorm.DB
	Log      *logrus.Logger
	MySQLLog logger.Interface
)
