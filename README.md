# GOOGLE HOME NOTIFICATIONS

[![npm](https://img.shields.io/npm/v/google-home-notifications?color=blue&logo=npm)](https://www.npmjs.com/package/google-home-notifications)
[![Download](https://img.shields.io/npm/dw/google-home-notifications.svg?color=7986CB&logo=npm)](https://npmcharts.com/compare/google-home-notifications?minimal=true)
[![License](https://img.shields.io/npm/l/google-home-notifications.svg?color=ff69b4)](https://github.com/rtrompier/google-home-notifications/blob/main/LICENSE)


This project allow to send vocals notifications through a REST API.

## Requirements

You need to have a server on your local network to execute this software (NodeJS or Docker)

## How to start

### Installation

Two options are available.

1. Use the docker image (recommended)

```sh
docker run -p 3000:3000 GHN_PORT=3000 --name google-home-notifications -d rtrompier/google-home-notifications:latest
```

2. Use the npm package

```sh
$ sudo npm install -g google-home-notifications
```
Or update to latest version when already installed:
```sh
$ sudo npm update -g google-home-notifications
```

### How to start (for NPM only)

```sh
$ google-home-notifications
```

You can pass the following params by environment variables : 
* **GHN_PORT** The port used by the google-home-notifications server


### How to use
A REST Api is available to send your vocal notification.

1. Your notification can be send by HTTP Call to `GET http://YOUR_SERVER_IP:3000/notify`
1. Text and targeted device, must be passed in query param. Eg : `GET http://YOUR_SERVER_IP:3000/speech?destination=192.168.1.10&text=Hello World`

| Parameter | Description |
| --- | --- |
| `destination` | IP of your Google Home device (Eg : 192.168.1.10) |
| `text` | Content of your notification (Eg: Hello world) |
| `lang` | Language of your content (Eg: 'en', 'fr', 'es', ...) |


