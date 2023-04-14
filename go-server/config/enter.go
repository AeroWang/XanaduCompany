package config

type Config struct {
	MySQL  MySQL  `yaml:"mysql"`
	Logger Logger `yaml:"logger"`
	System System `yaml:"system"`
}
