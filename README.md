# Transmission client

This is transmission web-client written with vue3 to replace default web-interface. This projects aim to be web-interface for server-hosted transmission and should be installed on some web-server.

## Installation instruction

1. Download zip-file transmission_client_vx.x.x.zip from latest release
2. Deploy content of `dist` folder from downloaded zip as static site on your web-server
3. Make transmission rpc available on the same origin as the client (see [below](#transmission-413-and-later-serve-rpc-from-the-same-origin))
4. Open url and enter transmission api url (usually ends with `transmission/rpc`) and transmission user and password
5. Enjoy

## Transmission 4.1.3 and later: serve rpc from the same origin

Since 4.1.3 transmission rpc server doesn't send CORS headers anymore ([transmission#8938](https://github.com/transmission/transmission/pull/8938)), so browser blocks requests from the client to rpc on another host or port (e.g. client at `http://transmission.local` and rpc at `http://192.168.1.10:9091/transmission/rpc`) with an error like this:

```
Access to fetch at '...' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Proxy rpc through the web-server that serves the client and use that url in connection settings (e.g. `http://transmission.local/transmission/rpc`). Example for nginx:

```nginx
location ^~ /transmission/rpc {
    proxy_pass http://127.0.0.1:9091;
}
```

Don't add `Access-Control-Allow-Origin` headers on the proxy instead: it brings back the vulnerability fixed in 4.1.3.

On Synology with Web Station put this block into `user.conf.<any-name>` file in the directory that web portal's service config includes, then reload nginx:

```shell
# find the include line, e.g. include /usr/local/etc/nginx/conf.d/<service-id>/user.conf*;
grep -l '/volume1/web/<client folder>' /usr/local/etc/nginx/conf.d-available/*.w3conf | xargs grep user.conf
sudo nginx -t && sudo systemctl reload nginx
```

If the client is already connected to the old url, press Disconnect in the menu and enter the new one.
