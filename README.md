## 小独Lite（非官方出品）
> 最近在研究小程序组件化开发，此项目也是我第一个用组件化开发的项目，项目非常简单只有一个页面，但好在五脏俱全，一个页面把本来4个页面的东西全部放在了一起。此项目借助了小独app的推送接口，实现了每日同步更新，但因为版权问题这里就不公布这个接口的地址了，代码目前开源出来，大家一起学习交流，因为设计以及其他版权原因，切勿用于商业项目中！

<img src="https://cdn.it120.cc/apifactory/2018/08/08/4e2d1007a94de7a76bad691ee9abc723.jpg" width="898" height="602" alt="小独Lite"/>

----------
**以下是我的一些开发心得，可能对于一个大牛来说都是些小儿科，但如果你是个初学者我希望你不要重蹈覆辙，如果你有其他更好的方法也可以一起来学习交流**

#### 1、小程序为什么要用组件化开发？
> 接触小程序已经有一段时日了，之前一直使用原生代码开发，但后来发现如果我要开创第二个、第三个...项目要么重新码，要么把之前要用到的页面代码复制过来，大大影响了开发效率，所以大家在开发小程序的时候还是建议大家使用组件化来进行开发，这样更省时！

#### 2、目前哪个开发框架比较好用？
> 我试用了好几个小程序开发框架，每个框架的上手程度不一样，有些简单，有些复杂，在这里我就稍作总结，大家可以根据自己需要自由选择：

> * wepy 【上手难度适中，没有什么组件，基本都要自己搞】
> * iViewUI 【上手难度简单，有很多组件，但是开发环境不友好，需要手动编译】
> * TouchUI 【上手难度简单，有很多组件，开发环境友好，可以自动编译】
> 
> 框架就着重对比这三个，其他的框架都大同小异。如果你是新手我非常建议你用[TouchUI][2]这个开发框架，他搭配VSCODE这个IDE开发起来真的很简单

#### 3、有哪些便于测试的人工智能API？
> 在开发的过程中难免会遇到一些诸如语音识别、语音合成、身份证识别、银行卡识别这些人工智能接口，我们要去注册又要填写一大堆信息，某些还要实名认证才能用，这里给大家一个测试接口，小流量的拿来用应该没什么问题，但如果你要商用你还是乖乖的去注册吧比如某讯和某度；
人公智能API测试接口：https://reptile.akeyn.com/

#### 4、先挖个坑，还有一些待我慢慢补充，欢迎Star

  [2]: http://www.wetouch.net/touchwx_doc/quickstart/begin/wx
