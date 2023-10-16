# wedding-invitation

我的婚礼邀请函小程序，可以搜「金钱组合的婚礼邀请函」或扫描下方二维码来查看。

<img src="https://raw.githubusercontent.com/JaminQ/wedding-invitation/imgs/qrcode.jpg" alt="预览图" width="200px" />

## 以下是预览图，撒一波狗粮

<img src="https://raw.githubusercontent.com/JaminQ/wedding-invitation/imgs/example.jpg" alt="预览图" width="320px" />

## QA

Q: 为什么不用现成的，而是要自己写一个？

A: 港真，刚开始我们确实是用现成的。起初在「婚贝」上找了个心仪模板生成了一个电子请帖，排版和样式都挺满意的，但就是最后有个尾页要付费才能去掉这点让我很不爽😠于是乎，「自己写一个」这个念头就冒出来了。

Q: 自己写一个，感觉怎么样？

A: 超级无敌爽！真的！谁写谁知道！想象一下，你可以按自己的任意想法去制作你的专属电子请帖，并且还是独一无二的，像极了爱情。然后你还可以自己指定小程序的头像、昵称、介绍等等，真的超级有专属感。甚至我还搞了个公告栏，用来发布所有接亲和婚礼相关的内容，四大金刚、伴郎团伴娘团等等工作人员直接打开就可以看到自己需要的内容了，不用每次都来问我，舒服。

Q: 自己写会很麻烦吗？

A: 其实还好，我是基于微信小程序开发的，部署发布啥的都比较简单方便，而且还支持地图、视频号等等能力。然后又使用了云开发，连搭服务器都省了（并且还因为是新账号白嫖了一个月，刚好就到婚礼那天），至于图片CDN以及BGM都是用了「婚贝」的资源，只有少量icon是在 [https://www.iconfont.cn/](https://www.iconfont.cn/) 上找的。至于设计就更简单了，我是参考了原先看中的那个「婚贝」的模板，在它的基础上做了一些调整以及锦上添花（比如我想多放几张婚纱照我就搞了个轮播），最有趣的是我还能在里面增加自己的彩蛋😄。

## 抄作业注意事项

因为现在小程序出了新规，需要备案才可以发布小程序，所以各位小伙伴如果真的打算抄作业的话，提前去注册自己的小程序并且走完备案流程（备案最长需要将近1个月的时间，非常慢，所以尽早备案。备案时服务内容标识可以选「生活服务-其他」），哦对了，备案的时候不需要先写代码，所以如果想跟我一样白嫖云开发的话，可以在婚礼前一个月左右再去申请云开发能力。

### 配置云开发环境

由于该小程序是基于微信云开发来进行后端开发的，而微信云开发又不支持导出数据库配置等等信息，所以如果要抄作业的话，在云开发这块要手动做一些配置：

- 首先「环境ID」当然是毋庸置疑要改的，在 [app.js](./miniprogram/app.js) 里把 `env` 值替换成你的；
- 然后是「数据库」，我只搞了个 `surveys` 集合来存报名信息以及祝福语，需要手动创建一个，数据权限用「仅创建者可读写」即可，因为是非关系型数据库，所以不用配置表信息、字段那些，创建好就可以在小程序里报名或写入祝福语；
- 接着是「云函数」，我写了两个云函数 `surveys` 和 `greetings`，分别做报名和读取祝福语用的，代码在项目里，只要同步上去就行，关键是要修改「云函数权限」，修改自定义安全规则，改成「允许所有用户访问」，不然分享到朋友圈后，从朋友圈点击进去会进入「单页模式」，这个模式下它只是个快照，并没有登录态，就会导致拉取祝福语时因为没有权限而拉取失败（拉取的祝福语会在左下角做动画展示）；
- 最后，在云开发右上角的设置里找到「权限设置」，把「未登录用户访问云资源权限设置」打开，同样的，也是为了解决「单页模式」的问题。

### 配置自己的婚礼邀请函信息

为了方便大家抄作业，我对自己的小程序做了一些代码调整优化，搞了个像「模板」一样的case出来，图片建议尺寸啥的我都标好了：

<img src="https://raw.githubusercontent.com/JaminQ/wedding-invitation/imgs/preview.jpg" alt="模板预览图" width="320px" />

理论上大家只要像做填空题一样把自己的婚礼信息填进去就可以了，需要修改两个文件，分别是 [app.js](./miniprogram/app.js) 和 [index.js](./miniprogram/pages/index/index.js) ，另外还有个彩蛋模块因为我懒得调整了，代码直接就放在 [index.wxml](./miniprogram/pages/index/index.wxml) 里。

#### 小程序主入口（./miniprogram/app.js）

- weddingTime 婚礼日期时间
- couple 新郎新娘信息
- publisher 发布者（自己想个你俩人的噱头组合名呗）
- anniversary 纪念日（如果是一见钟情的话，建议用第一次见面那天）

#### 邀请函入口（./miniprogram/pages/index/index.js）

- music 背景音乐（默认用陈奕迅的《I DO》，想换的话自己去找音频资源，我是在「婚贝」上找的）
- location 酒店信息（通过页面上的「选择位置并获取定位信息」按钮可以获取定位信息，发布前记得把按钮注释起来）
- imgs 图片信息（其实就是婚纱照了）

至于图片怎么裁剪以及怎么上传到CDN，这里教几个办法：

- （**极力推荐⭐️⭐️⭐️⭐️**，虽然我没用过这方法，但是感觉很适合）云开发的「图片处理」能力恰好就满足裁剪、缩放、上传、下载等等场景，可以说是非常适合了，[说明文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/imagepro.html)在这，自行摸索下怎么用吧；
- （**不是很推荐⭐️⭐️**，我用的就是这个方法，但是老薅「婚贝」的羊毛感觉有点过意不去）上面在QA里说了，我是参考了在「婚贝」看中的一个模板，所以我直接利用那个模板上传了自己的婚纱照并抓包，得到的就是正确裁剪尺寸的CDN图片；
- （**一般推荐⭐️⭐️⭐️**）在网上找其它第三方平台的工具，我自己略微找了下发现还蛮多图片在线裁剪并上传的平台的，只是有些免费有些收费有些要看广告之类的；
- （**非常不推荐⭐️**）实在没有办法就找我帮忙吧，不过我可能收一些佣金就是了，毕竟天下没有免费的午餐；
- （**超级无敌推荐⭐️⭐️⭐️⭐️⭐️**）另辟蹊径，自行解决，有服务器的自己搭个CDN服务器，有钱的租个CDN服务器，有方法的用自己的方法，条条大路通罗马。

#### 彩蛋模块（./miniprogram/pages/index/index.wxml）

这货名字都叫“彩蛋”了，当然是交给你们进行个性化定制啦，所以我懒得调整代码弄成「模板」了，直接去修改 `wxml`、`wxss` 和 `js` 吧。

不过我在这个模块还是有出一些力的，因为小程序个人号不能用 `<channel-video>` 组件插入视频号卡片，所以我封装了一个 `<channel>` 组件来模拟实现视频号卡片，用法和官方的 `<channel-video>` 组件基本一致，但是支持小程序个人号。

### 配置婚礼公告栏

港真，我觉得这个公告栏才是最有用的，接亲和婚礼那段时间是最忙最多事情要搞的，需要跟很多工作人员（婚策、摄影摄像、司仪、化妆师、酒店经理、伴郎团、伴娘团等等等等）去同步信息。而我又是非常懒的一个人，所以我就搞了个公告栏来展示所有信息，免去了口口相传的麻烦。公告栏长这样：

<img src="https://raw.githubusercontent.com/JaminQ/wedding-invitation/imgs/announcement.png" alt="公告栏预览图" width="1000px" />

配置起来也像填空一样简单。

#### 公告栏入口（./miniprogram/pages/info/index.js）

- desc 公告栏描述
- phone 其余人员联系方式
- location 定位信息（通过页面上的「选择位置并获取定位信息」按钮可以获取定位信息，发布前记得把按钮注释起来）
- files PDF资料（在云开发的「存储」里上传文件，就可以得到fileID了）
- info 其它事项

#### 显示公告栏跳转入口

由于我是蜘蛛侠迷弟，所以入口长这样：

<img src="https://raw.githubusercontent.com/JaminQ/wedding-invitation/imgs/entry.jpg" alt="公告栏入口" width="320px" />

理论上这个公告栏入口没必要让所有人都看到，所以我加了个管理员的逻辑，在 [index.js](./miniprogram/pages/index/index.js) 里有个 `MANAGER` 数组，在这个数组里加上要开放人员的 `openid` 就可以了，这个 `openid` 可以在云开发管理页找到，也可以通过云函数 `greetings` 的返回值 `openid` 来查看，还可以在这个文件的 `getGreetings` 方法里通过打印 `openid` 变量来查看。

### 修改分享图片

众所周知，小程序分享出去（会话或朋友圈）都会有个封面，所以需要自行P几张好看又好玩的封面图：

- 邀请函分享到会话时的封面图（./miniprogram/images/shareAppMsg.jpg）
- 邀请函分享到朋友圈时的封面图（./miniprogram/images/shareTimeline.jpg）
- 公告栏分享到会话时的封面图（./miniprogram/images/infoPoster.jpg）

### 下架云开发

正如前面所说，我是用新账号权益白嫖一个月云开发的，到期后我也不打算续费了，但是我又不想就此把我的小程序下架掉（这就是所谓的又没钱又想要了吧😄）。

所以我就搞了个「一键下架云开发」的逻辑，我写了两种方式：

- 手动党：大家可以在 [app.js](./miniprogram/app.js) 里把 `isRemoved` 变量改为 `true` 就并重新发布一次小程序就可以手动下架云开发了；
- 自动党：同样的，也是这个变量，但是我写了另外一种写法，可以把那个时间戳改成你的云开发下架时间，那么到这个节骨眼就会自动下架了，也不需要另外发布一次小程序。

更有甚者，如果你想保留亲朋好友们写下的祝福语，你可以在云开发环境销毁前把数据库的数据导出来并贴到 [index.js](./miniprogram/pages/index/index.js) 的 `greetings` 变量里，然后发布一次小程序就可以了。

## 最后说几句

由于制作时间比较短，从冒出念头到正式上线前后应该也就一周左右，中途还要处理手上的工作（社畜的痛）以及筹备婚礼的其它事项，并且因为太久没写小程序，很多东西都已经忘了，开发的时候一直在边查边学边写，以及有些图片（比如封面图）需要自己P（毕竟没有设计师资源，只能自己动手P）等等等等各种因素……所以代码写得比较粗糙（也懒得把它写好看了），大家抄作业的话看看就行，不满意的话就自己改，我反正不会有二次开发的机会了，对我来讲，婚姻只有一次🐶。

哦对了，如果真的有人抄作业了，麻烦告知我一声，发个 Issues 或者 email 我啥的都可以，让我沾沾你们的喜气😄。
