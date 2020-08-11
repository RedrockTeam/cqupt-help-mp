# cqupt-help-mp

重邮帮小程序

- [ ] 问题反馈接口

- [ ] 修复隐藏 bug

    - [ ] id 申请，重复申请响应为空，导致前端 popup 提示不准确

- [ ] 完善样式，过渡动画，UX

    - [x] 去掉 bind 小眼睛

    - [ ] Loading 小一点，首页的往下点

    - [ ] 首页青春有约 hot 上标

    - [ ] 活动页、志愿页 icon 扁了，招募中全圆角，字体加粗

    - [ ] 在线抢票日期、剩余字体变细

    - [ ] 首页 banner 字体变细，字体 icon 近一点

    - [ ] 问题反馈线变浅，placehoder（和 bind 页）样式 bug

    - [ ] 申请会员页、bind 页、我的页面 icon 糊了

    - [ ] 换志愿页图片

    - [ ] 青春有约头部字体

    - [ ] 首页活动左上角字体居中

- [ ] 重构优化

    - [ ] 抽离应用中的实体，优化类型

    - [ ] 使用 Suspense、ErrorBoundary 处理请求和异常，统一请求格式（useQuery、useMutation）

## 目录结构

```shell
./
├── README.md
├── babel.config.js
├── config
│   ├── dev.js
│   ├── index.js
│   ├── prod.js
│   └── upload.js # 小程序 CI
├── global.d.ts
├── package.json
├── project.config.json
├── src
│   ├── app.config.ts
│   ├── app.scss
│   ├── app.tsx
│   ├── common
│   │   ├── components
│   │   ├── constants
│   │   └── helpers
│   ├── index.html
│   ├── modules
│   │   ├── campus
│   │   │   ├── components
│   │   │   ├── pages
│   │   │   │   ├── index
│   │   │   │   ├── safe-run
│   │   │   │   ├── safe-run-away
│   │   │   │   ├── safe-run-history
│   │   │   │   └── shark-it
│   │   │   └── services
│   │   ├── feedback
│   │   │   └── pages
│   │   │       ├── index
│   │   │       └── result
│   │   ├── id
│   │   │   └── pages
│   │   │       ├── apply
│   │   │       └── index
│   │   ├── index
│   │   │   └── pages
│   │   │       ├── activity-detail
│   │   │       ├── bind
│   │   │       └── home
│   │   ├── my
│   │   │   └── pages
│   │   │       ├── index
│   │   │       ├── my-activity
│   │   │       └── my-reward
│   │   ├── ticket
│   │   │   └── pages
│   │   │       ├── my-ticket
│   │   │       └── rob-ticket
│   │   ├── volunteer
│   │   │   └── pages
│   │   │       ├── bind
│   │   │       ├── detail
│   │   │       └── index
│   │   └── webview
│   ├── static
│   │   ├── images
│   │   └── styles
│   └── stores
│       ├── popup.tsx # 命令式 popup 组件
│       └── user.tsx # 用户信息
├── tsconfig.json
└── yarn.lock
```

本项目其实是多个应用的整合，每个应用有一个或多个页面，所以在 `modules` 目录下放置应用模块，模块下分为 `pages`、`components` 等放置专用于该模块的页面和组件等，在 `app.config.ts` 中可通过 `resolvePage` 函数获得页面路径

`common` 目录放置高可复用代码

> `common` 复用、`modules` 业务、`static` 静态资源

## 规范

1. 遵循 Angular Commit 规范，为了方便编写遵循规范的 commit message，我们使用 Commitizen 进行 git commit。凡是用到 git commit 命令，一律改为使用 git cz

   > 详见 [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

2. 分为 4 种分支进行开发和发布等：

   - master：主分支。对项目进行 tag 或发布版本等操作

   - develop：开发分支。团队成员分别从该分支检出自己的 feat-\* 分支，开发完成后将 feat-\* 分支上的改动 merge 回 develop 分支

   - feat-\*：功能分支。团队成员中每个人都维护一个自己的功能分支，并进行开发，开发完成后将此分支 merge 回 develop 分支。此分支一般用来开发新功能或进行项目维护等

   - fix-\*：补丁分支。用作 bug 修复，bug 修复完成需 merge 回 develop 分支，并将其删除，属于临时性分支

3. 代码编写要保证在 eslint 通过后再进行 commit

## 注意

1. 大部分页面底色都是 `#F6F6F9`，所以全局样式 `page` 设置了 `min-height` 和 `background-color`，有个别页面底色是白色需要自己设置样式

2. 由于编写时自定义 navbar 使用的库 `taro-navigationbar` 并没有支持 taro3，所以自己 fork 了一份发布到 npm 上，名为 `taro3-navigationbar`，等之后作者支持了可以更换回去。同时编译警告 `chunk common [mini-css-extract-plugin] Conflicting order between: ...` 因为 scss 引入顺序问题冲突，并无大碍，目前 taro 官方 issue 也有提到，之后再完善

3. 请求库使用了 react-query，由于 taro 在小程序环境下 webpack providePlugin 跳过 .mjs 文件，导致 react-query 所需要的全局变量的丢失，所以需要

   ```ts
   import { useQuery } from "react-query/dist/react-query.production.min";
   ```

   这样引入，同时在 `global.d.ts` 文件导入原来的类型声明

   ```ts
   declare module "react-query/dist/react-query.production.min" {
     export * from "react-query";
   }
   ```

4. popup 通过 context 进行封装，可以通过命令式调用弹出

   ```ts
   const Popup = useContainer(PopupContext);
   // ...
   const hide = Popup.show({
     title: "登录失败",
     detail: "已绑定，不能重复绑定",
   });
   setTimeout(() => hide(), 3000);
   ```

   以此弹出的 Popup 组件的状态都是在 `stores/popup.ts` 中的，是同一个，但组件需要在每个用到的页面声明

   ```tsx
   <Popup.Comp />
   ```

   这是因为 taro 通过 App 的 props.children 注入页面，类似于伪代码 `<App children={<page>{loadPage(globalConfig.pages[0])}</page>} />` 而 page 之外的会忽略，所以不能只声明一个 Popup 组件，需要在每个页面都声明一遍

5. 由于小程序访问元素位置为异步 API，因此小程序中无法使用 react-transition-group，volunteer/picker 的过渡动画手写实现，也可以考虑 react-spring
