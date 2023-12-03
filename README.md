# Pack

## CuteHttpFileServer

下载 `CuteHttpFileServer` 安装包
```
wget https://github.com/RexLee0929/Pack/releases/download/CuteHttpFileServer/CuteHttpFileServer-linux-amd64-2.0.zip #自行选择对应的压缩包
unzip CuteHttpFileServer-linux-amd64-2.0.zip #解压到当前目录
chmod +x ./Cute/chfs #授予执行权限
```

运行
```
./Cute/chfs --file=./Cute/cute.conf #通过配置文件进行启动
```

配置文件中默认 `25252` 端口号

```
http://ip:25252 
```

程序默认支持`WebDav` 

```
http://ip:25252/webdav
```

仅做自用打包方便使用

非必要请前往[官网](http://iscute.cn/chfs)下载

## HNet

下载 `HNet` 安装包

```
wget https://github.com/RexLee0929/Pack/releases/download/HNet/HNet.zip
unzip HNet.zip #解压到当前目录
cd HNet #进入HNet目录
```

看情况修改端口

```
nano .env
```

安装依赖

```
apt install npm
```

通过 `npm` 安装所需模块

```
npm install
```

使用以下命令启动 `HNet`

```
npm run start
```

安装 `PM2` 并启动 `HNet`

```
npm i pm2 -g && pm2 start index.mjs --name HNet
```

设置 `PM2` 开机启动

```
pm2 startup
```

ps:如果服务器带宽大可以考虑使用 `/root/HNet/public/assets` 中的另一个 `css` 有更多壁纸选择

[作者仓库](https://github.com/Hideipnetwork/hideipnetwork-web/tree/v3)




## V2Board

安装好环境后运行

下载并且解压后将其覆盖进官方的文件中

```
wget -P /var/www https://github.com/RexLee0929/Pack/releases/download/V2Board/V2Board.zip
unzip /var/www/V2Board.zip -d /var/www/
```

进入目录

```
cd /var/www/V2Board
```

执行

```
wget https://getcomposer.org/installer -O composer.phar
php composer.phar
```

```
php composer.phar install
```

```
chmod -R 755 ${PWD}
chown -R www-data:www-data ${PWD}
```

安装

```
php artisan v2board:install
```


caddy 配置

```
test {

  # 设置站点运行目录
  root * /var/www/V2Board/public
  
  # 设置文件服务器
  file_server

  # 设置伪静态路由
  try_files {path} {path}/ /index.php{query}
  
  # 设置 /downloads 路由（假设你有特别的需求，否则这行可省略）
  route /downloads/* {
    # 你的配置内容
  }

  # 设置静态文件缓存
  @staticFiles {
    path_regexp static /\.(js|css)$
  }
  header @staticFiles Cache-Control "public, max-age=3600"

  # 禁用日志
  log {
    output discard
  }

  # 反向代理到 PHP-FPM（注意更新套接字路径）
  php_fastcgi unix//run/php/php8.1-fpm.sock
}

```
创建守护进程
```
cat > /etc/supervisor/conf.d/V2Board.conf <<EOF
[program:V2Board]
user=www-data
directory=/var/www/V2Board  # V2Board 的根目录
command=php /var/www/V2Board/artisan horizon 
numprocs=1
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/V2Board.log

EOF
```

如果redis密码始终报错,则在V2Board目录执行

```
php artisan v2board:update
```



创建定时任务

```
crontab -e

* * * * * php /var/www/V2Board/artisan schedule:run >> /dev/null 2>&1
```
