<!DOCTYPE html>
<html>

<head>
    <link rel="icon" sizes="512x512" href="{{ asset('Admin_favicon_512.png') }}" type="image/png">
    <link rel="icon" sizes="256x256" href="{{ asset('Admin_favicon_256.png') }}" type="image/png">
    <link rel="icon" sizes="128x128" href="{{ asset('Admin_favicon_128.png') }}" type="image/png">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('Admin_favicon_512.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('Admin_favicon_256.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('Admin_favicon_128.png') }}">
    <link rel="stylesheet" href="/assets/admin/components.chunk.css?v={{$version}}">
    <link rel="stylesheet" href="/assets/admin/umi.css?v={{$version}}">
    <link rel="stylesheet" href="/assets/admin/custom.css?v={{$version}}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title>{{$title}}</title>
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700"> -->
    <script>window.routerBase = "/";</script>
    <script>
        window.settings = {
            title: '{{$title}}',
            theme: {
                sidebar: '{{$theme_sidebar}}',
                header: '{{$theme_header}}',
                color: '{{$theme_color}}',
            },
            version: '{{$version}}',
            background_url: '{{$background_url}}',
            logo: '{{$logo}}',
            secure_path: '{{$secure_path}}'
        }
    </script>
</head>

<body>
<div id="root"></div>
<script src="/assets/admin/vendors.async.js?v={{$version}}"></script>
<script src="/assets/admin/components.async.js?v={{$version}}"></script>
<script src="/assets/admin/umi.js?v={{$version}}"></script>
</body>

</html>
