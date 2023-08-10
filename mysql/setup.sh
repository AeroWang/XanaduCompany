#!/bin/bash
set -e

#查看mysql服务的状态，方便调试，这条语句可以删除
echo `service mysql status`

echo '1.启动mysql...'
#启动mysql
service mysql start
sleep 10

echo `service mysql status`
echo '2.创建数据库...'
mysql < /home/company/mysql/create_db.sql
sleep 3
echo '2.创建数据库完毕...'


echo '3.开始导入数据...'
mysql < /home/company/mysql/initial_data.sql
echo '4.导入数据完毕...'

echo '5.修改mysql权限...'
mysql < /home/company/mysql/privileges.sql
sleep 3
echo '6.权限修改完毕...'

#sleep 3
echo `service mysql status`
echo 'mysql容器启动完毕,且数据导入成功'

tail -f /dev/null