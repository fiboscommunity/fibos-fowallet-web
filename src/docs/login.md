钱包提供接入了扫码授权登录功能，遵循 ```SimpleWallet ``` 协议，如果您对该协议不了解，详见：  [SimpleWallet 协议 ](https://github.com/southex/SimpleWallet/blob/master/README.md)。

详细的接入步骤如下：

### 1、生成二维码

首先请按照以下的数据格式，生成一张二维码图片

```json
{
	protocol	string,   // 协议名，钱包用来区分不同协议
    version     string,   // 协议版本信息，如1.0
    dappName    string,   // dapp名字
    dappIcon    string,   // dapp图标
    action      string,   // 赋值为login
    uuID        string,   // dapp server生成的，用于此次登录验证的唯一标识   
    loginUrl    string,   // dapp server上用于接受登录验证信息的url
    expired	    number,   // 二维码过期时间，unix时间戳, 如 （ Date.now() + 300000 ）5分钟后过期
    loginMemo 	string,   // 登录备注信息，钱包用来展示，可选
}
```
用户使用钱包的扫码功能扫描上述二维码后，钱包会对登陆相关的数据进行签名。

### 2、验证签名
钱包签名成功后，会向二维码中提供的 loginUrl 的参数所告知的您的 dapp server 上用于接受登录验证信息的地址，通过 post 请求，发送以下格式的数据

```j&#39;son
{
    protocol   string     // 协议名，钱包用来区分不同协议，本协议为 FOWallet
    version    string     // 协议版本信息，如1.0
    timestamp  number     // 当前UNIX时间戳
    sign       string     // eos签名
    uuID       string     // dapp server生成的，用于此次登录验证的唯一标识     
    account    string     // eos账户名
    ref        string     // 来源,如钱包名
}
```
您可以根据接受到的数据，进行签名验证。

请使用 eos 的 ecc 模块中提供的验证签名的方法进行签名的验证，并按照以下顺序构造需要验证的签名数据

```js
let data = timestamp + account + uuID + ref     //ref为钱包名，标示来源
ecc.verify(sign, data, pubkey)
```

 如果您不了解 ecc 模块中验证签名的具体使用方法，请 [点击这里](https://github.com/EOSIO/eosjs-ecc#verify) 。

完成验证之后，需要您的服务端将验证结果告知钱包，请按以下格式返回验证结果

```json
// 响应数据格式约定 
{
    code number     //错误码，等于0是成功, 否则是失败
    error string    //返回的提示信息
}
```