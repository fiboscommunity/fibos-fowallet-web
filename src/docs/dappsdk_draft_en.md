### Introduction
In order to make it more convenience for users to use DApps, the FO wallet provides the Dapp Store feature, and provides the DApp SDK to make it easier for developers to link in their own DApp to the FO wallet for users; Currently, the API is still in the draft stage, and requires more adjustments and optimization before it is finalized. We would also be very grateful to hear from everyone the API that everyone wishes to be supported by the FO wallet. (You can discuss with us at the [FIBOS Community DApp SDK Section](http://forum.fo/index.php?&app=forums&module=forums&controller=index&forumId=12)).

### API

The DApp of FO Wallet runs in the DApp Container. The DApp Container is actually a browser that incorporates DApp API. All subjects of the API can be used via a function like ``window.fowallet.apiName()`` . The callback result can be obtained by the callback. function. The delivery style of the callback function is same as NodeJS, which is that the first parameter is always error subject (if there isn’t any error, the value will be undefined), and the second parameter is the actual result (if there is any error, the value will be undefined).

The following are API that are already (will be) supported by the FO wallet:

```javascript
/**
 * get the info of FIBOS node linked with FO wallet.
 * callback the callback function of accepting callback result
 */
getInfo(callback)

/**
 * get present account info
 * callback the callback function of accepting callback result
 */
getAccount(callback)

/**
 * Get all (or any) token’s amount held in the present account.
 * extendSymbol String | Array<String> | undefined
 * 1. Pass in some specific token name, such as “FO@eosio” will return the amount of token held by present account.
 * 2. Pass in array of token names, such as [“EOS@eosio”，”FO@eosio”] will return the amount held of the tokens in the present account.
 * 3. If this parameter is undefined, then get all of the token held and their amount of present account.
 * callback the callback function of accepting callback result
 */
getCurrencyBalance(extendSymbol, callback)

/**
 * Get the amount of some (or all) locked tokens of present account
 * extendSymbol String | Array<String> | undefined
 * 1. Pass in some specific token name, such as “FO@eosio” will return the holding amount of locked token of that token of the present account.
 * 2. Pass in an array of some specific token names, such as [“EOS@eosio"，"FO@eosio"] will return the holding amount of locked position token of those tokens of the present account.
 * 3. If this parameter is undefined, then get all of the locked token held and their amount of present account.
 * callback the callback function of accepting callback result
 */
getLockBalance(extendSymbol, callback)

/**
 * Get some (or all) token amounts held by contract sub-wallet of   present account
 * extendSymbol String | Array<String> | undefined
 * 1.  Pass in some specific token names, such as “symbol@issuer” will return the token amount held by the contract sub-wallet of present account.
 * 2. Pass in an array of some specific token names, such as [“symbol@issuer1”，"symbol@issuer2"] will return the token amount held by the contract sub-wallet of present account of these tokens.
 * 3. If this parameter is undefined, then get all of the locked token held and their amount of present account.
 * callback the callback function of accepting callback result
 */
getContractBalance(extendSymbol, callback)

/**
 * Make a link to other DApp request to FO wallet (Version 4.4.3.0 support)
 * Object should be passed in:
 * 1. dappUrl : other DAPP addresses to link to，such as : https://exchange.fo
 * callback function to accept the result of the callback，Rules as above
 */
requestPushDapp(Object, callback)

/**
 * Make a download resources request to FO wallet (Version 4.4.3.0 support)
 * Object should be passed in:
 * 1. fileUrl : other DAPP addresses to link to,such as : https://www.test.com/test.pdf
 * 2. fileName : the name of the resource to be saved. In order to open the file normally, please bring the correct suffix, for example: test.pdf，such as : test.pdf
 * callback function to accept the result of the callback，Rules as above callback will call back when the download of resources starts successfull
 */
requestDownload(Object, callback)
```

### How to Debug

The FO Wallet provides the DApp browser. Developers can launch their own smart contract (on main net), build in the local environment the front-end of DApp to dock the contract, and enter the local http address in the DApp browser to finish debugging the Dapp.
