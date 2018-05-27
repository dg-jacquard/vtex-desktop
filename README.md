# ymi/VTEX Auth code

Aplicativo desenvolvido para facilitar o login da vtex/ymi

Desenvolvido em javascript usando electron, nodejs & react.

## Req:
* [nodejs](https://nodejs.org/) > 8
* [electron](https://electronjs.org/) > 2


## Install
```ssh
$ npm install
$ cd react && npm install & cd ..
$ cd server && npm install & cd ..
```

## dev/start
```ssh
$ npm start
$ cd react && npm start
$ cd server && npm start
```


### nodejs-server
Server websocks, conecta no gmail e envia os dados para o client/react

### react-client
Client que conecta no server websockets e monta a interface
Build:
```ssh
$ npm build
```
