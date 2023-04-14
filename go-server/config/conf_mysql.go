package config

import "strconv"

// 由于golang中没有class只有struct,因此每次都是建立对应的结构体

// MySQL 是mysql的配置
type MySQL struct {
	Host     string `yaml:"host" json:"host"`         //主机 这种写法叫做结构体标记
	Port     int    `yaml:"port" json:"port"`         //端口
	Config   string `yaml:"config" json:"config"`     //其他配置
	DB       string `yaml:"db" json:"db"`             //数据库的名称
	User     string `yaml:"user" json:"user"`         //用户名
	Password string `yaml:"password" json:"password"` //密码
	Idle     int    `yaml:"idle" json:"idle"`
	Max      int    `yaml:"max" json:"max"`            //最大连接数
	Min      int    `yaml:"min" json:"min"`            // 最小链接数
	LogLevel string `yaml:"log_level" json:"logLevel"` //日志等级，debug就是输出全部的sql
}

// Init 初始化值
func (t *MySQL) init() {
	t.Host = "127.0.0.1"
	t.Port = 3306
	t.Config = ""
	t.DB = "blog"
	t.User = "root"
	t.Password = "123456"
	t.LogLevel = "debug"
}

// Dsn 获取MySQL链接地址
func (t *MySQL) Dsn() string {
	return t.User + ":" + t.Password + "@tcp(" + t.Host + ":" + strconv.Itoa(t.Port) + ")/" + t.DB + "?" + t.Config
}
