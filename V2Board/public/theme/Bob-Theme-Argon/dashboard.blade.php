<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <link rel="icon" sizes="512x512" href="{{ asset('User_favicon_512.png') }}" type="image/png">
    <link rel="icon" sizes="256x256" href="{{ asset('User_favicon_256.png') }}" type="image/png">
    <link rel="icon" sizes="128x128" href="{{ asset('User_favicon_128.png') }}" type="image/png">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('User_favicon_512.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('User_favicon_256.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('User_favicon_128.png') }}">
    <title>{{$title}}</title>
    <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css">
    <link href="/theme/Bob-Theme-Argon/css/app.0c02214a.css" rel="preload" as="style">
    <link href="/theme/Bob-Theme-Argon/css/chunk-vendors.dba84911.css" rel="preload" as="style">
    <link href="/theme/Bob-Theme-Argon/js/app.bc245e09.js" rel="preload" as="script">
    <link href="/theme/Bob-Theme-Argon/js/chunk-vendors.dac02230.js" rel="preload" as="script">
    <link href="/theme/Bob-Theme-Argon/css/chunk-vendors.dba84911.css" rel="stylesheet">
    <link href="/theme/Bob-Theme-Argon/css/app.0c02214a.css" rel="stylesheet">
</head>
<body>
<div id="app"></div>
<script>
    // 首页订阅客户端显示
    window.CLIENT = {
        'SSR':  {{ $theme_config['client_ssr'] }} ,
        'Clash': {{ $theme_config['client_clash'] }},
        'Shadowrocket': {{ $theme_config['client_shadowrocket'] }},
        'Surge': {{ $theme_config['client_surge'] }},
        'V2Ray': {{ $theme_config['client_v2ray'] }},
        'Surfboard': {{ $theme_config['client_surfboard'] }},
    };
    window.APP_DESCRIPTION = '{{$description}}';
    window.APP_NAME = '{{$title}}';
</script>
{!! $theme_config['custom_html'] !!}
<script src="/theme/Bob-Theme-Argon/js/chunk-vendors.dac02230.js"></script>
<script src="/theme/Bob-Theme-Argon/js/app.bc245e09.js"></script>
</body>
</html>
