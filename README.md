# Pack

## CuteHttpFileServer

下载
```
wget https://github.com/RexLee0929/Pack/releases/download/CuteHttpFileServer/CuteHttpFileServer-linux-amd64-2.0.zip #自行选择对应的压缩包
unzip CuteHttpFileServer-linux-amd64-2.0.zip #解压到当前目录
chmod +x ./Ctue/chfs #授予执行权限
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
