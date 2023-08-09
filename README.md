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

前往 [这里](https://github.com/RexLee0929/Website) 更换书签

[作者仓库](https://github.com/Hideipnetwork/hideipnetwork-web/tree/v3)
