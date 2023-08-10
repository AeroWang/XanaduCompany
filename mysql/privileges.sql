use mysql;
SELECT host, user FROM user;

-- 将数据库的权限授权给root用户，密码为12345678：
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678';

-- 刷新权限这一条命令一定要有：
flush privileges;
