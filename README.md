# cqupt-help-mp

## 2021秋季修复计划
- [ ] 线上抢票
- [X] 身份有证
- [X] 志愿报名
- [X] 青春邮约
- [X] 热门活动
- [ ] 校园服务 - 天天护跑
- [ ] 我的奖品
- [X] 我的活动
- [ ] 我的影票
- [ ] 影票申诉
- [X] 账号安全

# 重邮帮小程序

- [ ] 完善文档

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
│   ├── index.jsx
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
> 目前项目还比较简单，modules 目录下的每个业务模块都只有 pages、components、services，以后复杂了可能有一些只是与业务相关的，其他模块不能复用的 helpers 等，都可以放到 modules 相关模块的目录下
> **common 目录下的可复用代码因为是所有人都有可能会使用到的，所以要严格使用 TypeScript 编写，并使用 JSDoc 注释写好描述**。modules 目录下仅 pages 目录下的代码可以使用 JavaScript 编写，因为 components、services、helpers 仍然是模块下可复用的
> **不要为了抽象而抽象，抽象并不一定会使得代码可读性更高、更好维护，本项目是需要长期维护的，可读性可维护性是第一考虑！**

## 规范

1. 遵循 Angular Commit 规范，为了方便编写遵循规范的 commit message，我们使用 Commitizen 进行 git commit。凡是用到 git commit 命令，一律改为使用 git cz

   > 详见 [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

2. 分为 4 种分支进行开发和发布等：

   - master：主分支。对项目进行 tag 或发布版本等操作

   - develop：开发分支。从该分支检出其他临时分支，临时分支开发完成后推送到远端，并发起 PR，团队成员进行 code review 后由 Leader 进行合并，merge 回 develop 分支

   - feat-\*：功能分支。用于新功能开发，完成后将其删除，属于临时性分支

   - fix-\*：补丁分支。用作 bug 修复，完成后将其删除，属于临时性分支

   - refactor-\*：重构分支。完成后将其删除，属于临时性分支

   - chore-\*：杂项分支。lint 工具配置，工程化配置，编写 docs 等。完成后将其删除，属于临时性分支

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
   setTimeout(() => hide(), 1500);
   ```

   以此弹出的 Popup 组件的状态都是在 `stores/popup.ts` 中的，是同一个，但组件需要在每个用到的页面声明

   ```tsx
   <Popup.Comp />
   ```

   这是因为 taro 通过 App 的 props.children 注入页面，类似于伪代码 `<App children={<page>{loadPage(globalConfig.pages[0])}</page>} />` 而 page 之外的会忽略，所以不能只声明一个 Popup 组件，需要在每个页面都声明一遍

5. 由于小程序访问元素位置为异步 API，因此小程序中无法使用 react-transition-group，volunteer/picker 的过渡动画手写实现，也可以考虑 react-spring

6. Text 组件的 userSelect 是让文本可复制，小程序在基础库 2.12.1 实现，目前 Taro 还没有跟进，跟 selectable 一起写上，保证兼容

7. 首页近期活动通过 webview 接入的线上活动 h5，需要在进入页面后发一个报名的请求，参数带活动名、活动日期、活动组织，详见接口文档。将报名放到 h5 是因为需要 h5 进入活动的也可以报名，不仅是从小程序进入可以报名；带这三个参数而不是带 id 是因为带 id 需要后台发布线上活动**后**查出来 id 在添加到 h5 页面上，而这三个参数也可以作为唯一标识，同时可以在发布**前**告诉前端并添加到 h5 页面上，流程更方便合理

## 组件整理

- empty 缺省页（具有有标题 和 无标题 两种状态）
  引用：我的奖品 我的活动

- placeholder 加载/错误 组件 （具有 loading 和 error 两种状态）
  引用：每个功能加载时 ，借助 react-query 提供的请求状态 从而显示

- navback 上文已经提到

- popup （位于页面居中的提示信息弹窗）

- bottomPop (从页面底部弹出的需要用户进行下一步操作的信息弹窗)
  引用：护跑领包 ; 影票验票
