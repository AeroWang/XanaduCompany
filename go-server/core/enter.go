package core

import (
	"fmt"
	"go-server/config"
	"go-server/global"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
)

const ConfigFile = "settings.yaml" //配置文件名称

// InitConf 解析yaml配置文件
func InitConf() {
	c := &config.Config{}
	yamlConf, err := ioutil.ReadFile(ConfigFile)
	if err != nil {
		panic(fmt.Errorf("get yaml config file error: %s", err))
	}
	err = yaml.Unmarshal(yamlConf, c)
	if err != nil {
		log.Fatalf("config init Unmarshal: %v", err)
	}
	log.Println("config yaml file loaded Init successfully!")
	global.Config = c
	//fmt.Print(c.SiteInfo)
}
