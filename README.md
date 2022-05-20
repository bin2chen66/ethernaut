## Introduction
Ethernaut是一个基于 Web3/Solidity 的过关游戏。

如果对如何安全编写Solidity感兴趣，建议你去玩下。

官网：https://ethernaut.openzeppelin.com

## Requirements
hardhat 

https://hardhat.org


## Usage

1. 如果没安装hardhat，需要先安装下:

``` sh
$ npm install --save-dev hardhat
```

2. 运行

``` sh
$ npx hardhat test
```

3.目录结构如下：

```sh
├── contracts           # 过关用的Solidity代码
│   ├── 01FallbackRun.sol
│   ├── 02FalloutRun.sol
│   ├── 03CoinFlipRun copy.sol
│   ├── 04TelephoneRun.sol
│   ├── 05TokenRun.sol
     .....
│   └── ethernaut         #从官网复制的关卡源码
│       ├── 01Fallback.sol
│       ├── 02Fallout.sol
│       ├── 03CoinFlip.sol
│       ├── 04Telephone.sol
│       ├── 05Token.sol
        ....
└── test      #测试用例，每个关卡一个文件
    ├── 01Fallback.js  
    ├── 02Fallout.js
    ├── 03CoinFlip.js
    ├── 04Telphone.js
    ├── 05Token.js
    ...
```