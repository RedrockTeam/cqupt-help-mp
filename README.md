# cqupt-help-mp

重邮帮小程序

## 注意

1. 目前我的奖品的缺省页、我的活动的缺省页、影票的缺省页都是一样的，考虑三个页面并不耦合并且之后可能会改，目前先分别写了一遍，之后可以考虑抽离成组件，内部进行判断再渲染对应页面缺省页

2. 由于编写时自定义 navbar 使用的库 `taro-navigationbar` 并没有支持 taro3，所以自己 fork 了一份发布到 npm 上，名为 `taro3-navigationbar`，等之后作者支持了可以更换回去。同时编译警告 `chunk common [mini-css-extract-plugin] Conflicting order between: ...` 因为 scss 引入顺序问题冲突，并无大碍，目前 taro 官方 issue 也有提到，可以等再完善
