package core

import (
	"bytes"
	"fmt"
	"github.com/sirupsen/logrus"
	"go-server/global"

	"os"
	"path"
)

//color constant declare

const (
	red    = 31
	yellow = 33
	blue   = 36
	gray   = 37
)

type LogFormatter struct{}

// Format complete the interface of logrus Formatter
func (t *LogFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	//show color according to the level
	var levelColor int
	switch entry.Level {
	case logrus.DebugLevel, logrus.TraceLevel:
		levelColor = gray
	case logrus.WarnLevel:
		levelColor = yellow
	case logrus.ErrorLevel, logrus.FatalLevel, logrus.PanicLevel:
		levelColor = red
	default:
		levelColor = blue
	}

	var b *bytes.Buffer
	if entry.Buffer != nil {
		b = entry.Buffer
	} else {
		b = &bytes.Buffer{}
	}

	log := global.Config.Logger

	//define log formatter
	timestamp := entry.Time.Format("2006-01-02 15:04:05") //TODO:
	if entry.HasCaller() {
		//define file path
		funcVal := entry.Caller.Function
		fileVal := fmt.Sprintf("%s:%d", path.Base(entry.Caller.File), entry.Caller.Line)
		//define output formatter
		fmt.Fprintf(b, "%s[%s] \x1b[%dm[%s]\x1b[0m %s %s %s\n", log.Prefix, timestamp, levelColor, entry.Level, fileVal, funcVal, entry.Message)
	} else {
		fmt.Fprintf(b, "%s[%s] \x1b[%dm[%s]\x1b[0m %s\n", log.Prefix, timestamp, levelColor, entry.Level, entry.Message)
	}
	return b.Bytes(), nil
}

// InitLogger 初始化日志
func InitLogger() *logrus.Logger {
	mLog := logrus.New()                                //new an instance
	mLog.SetOutput(os.Stdout)                           //set output type
	mLog.SetReportCaller(global.Config.Logger.ShowLine) //set to view function name and line value
	mLog.SetFormatter(&LogFormatter{})                  // set myself Formatter
	level, err := logrus.ParseLevel(global.Config.Logger.Level)
	if err != nil {
		level = logrus.InfoLevel
	}
	mLog.SetLevel(level) //set log level

	return mLog
}

func InitDefaultLogger() {
	// global log
	logrus.SetOutput(os.Stdout)
	logrus.SetReportCaller(global.Config.Logger.ShowLine)
	logrus.SetFormatter(&LogFormatter{})
	level, err := logrus.ParseLevel(global.Config.Logger.Level)
	if err != nil {
		level = logrus.InfoLevel
	}
	logrus.SetLevel(level)
}
