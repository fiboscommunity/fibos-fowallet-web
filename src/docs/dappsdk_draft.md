### 简介
为了让用户更方便的使用 DApp，*FO 钱包* 提供了 **DApp Store** 功能，并提供了 *DApp SDK* 方便开发者将自己的 DApp 接入到 *Fo 钱包* 中；目前 API 尚处草案阶段，仍需更多调整及完善，欢迎大家踊跃提出希望 *FO 钱包* 支持的 API（可至[FIBOS 社区 DApp SDK 专区](http://forum.fo/index.php?&app=forums&module=forums&controller=index&forumId=12)进行讨论)。

### API

*Fo 钱包*中的 DApp 运行于 *DApp 容器* 之中，DApp 容器实际上是一个注入了 *DApp API* 的浏览器，所有的 API 对象均可通过 ``window.fowallet.apiName()`` 这样的方式调用，调用结果可通过回调得到，回调函数的参数传递风格与 NodeJS 保持一致，即第一个参数总是 error 对象 （如果没有错误发生，error 的值会是 undefined），第二个参数为实际结果（若有错误则为 undefined）。

如下为 *FO 钱包* 的已经（即将）支持的 API

```javascript
/**
 * 获取 FO 钱包当前所连接的 FIBOS 节点的信息
 * callback 接受回调结果的回调函数
 */
getInfo(callback)

/**
 * 获取当前的账户信息
 * callback 接受回调结果的回调函数
 */
getAccount(callback)

/**
 * 获取当前账户所持有的某个（或全部）通证的对应的数量
 * extendSymbol String | Array<String> | undefined
 * 1. 传入某个特定的通证名，例如 "FO@eosio"，则返回当前账户所持有的该特定通证的数量
 * 2. 传入某几个通证名的数组，例如["EOS@eosio"，"FO@eosio"]，则返回当前账户所持有的该特定几个通证的数量
 * 3. 若该参数为 undefined，则取回该账户下所持有的所有通证对应的数量
 * callback 接受回调结果的回调函数
 */
getCurrencyBalance(extendSymbol, callback)

/**
 * 获取当前账户所持有的某个（或全部）通证的对应的锁仓数量
 * extendSymbol String | Array<String> | undefined
 * 1. 传入某个特定的通证名，例如 "FO@eosio"，则返回当前账户所持有的该特定通证的锁仓数量
 * 2. 传入某几个通证名的数组，例如["EOS@eosio"，"FO@eosio"]，则返回当前账户所持有的该特定几个通证的锁仓数量
 * 3. 若该参数为 undefined，则取回该账户下所持有的所有通证对应的锁仓数量
 * callback 接受回调结果的回调函数
 */
getLockBalance(extendSymbol, callback)

/**
 * 获取当前账户所持有的某个（或全部）合约子钱包内的对应的通证数量
 * extendSymbol String | Array<String> | undefined
 * 1. 传入某个特定的通证名，例如 "symbol@issuer"，则返回当前账户该合约子钱包拥有的通证数量
 * 2. 传入某几个通证名的数组，例如["symbol@issuer1"，"symbol@issuer2"]，则返回当前账户该特定几个合约子钱包拥有的通证数量
 * 3. 若该参数为 undefined，则取回该账户下所有合约子钱包所拥有的对应通证数量
 * callback 接受回调结果的回调函数
 */
getContractBalance(extendSymbol, callback)

/**
 * 向钱包发起跳转至其他 DApp 请求(钱包版本 4.4.3.0 支持)
 * Object 对象中应传入：
 * 1. dappUrl : 要跳转的其他 DApp 地址，例如：https://exchange.fo
 * callback 接受回调结果的回调函数,规则如上
 */
requestPushDapp(Object, callback)

/**
 * 向钱包发起下载资源请求(钱包版本 4.4.3.0 支持)
 * Object 对象中应传入：
 * 1. fileUrl : 要下载的资源地址,例如：https://www.test.com/test.pdf
 * 2. fileName : 要保存的资源名称，为保证正常打开文件请带上正确的后缀名，例如：test.pdf
 * callback 接受回调结果的回调函数,规则如上。callback 会在成功开始下载资源时回调
 */
requestDownload(Object, callback)

```

### 如何调试

目前 *FO 钱包*提供了*DApp浏览器*，开发者可以（在主网）发布自己的合约，本地编写 DApp 的前端页面对接合约，在 *DApp浏览器* 输入本地的 http 地址来完成 DApp 的调试。
