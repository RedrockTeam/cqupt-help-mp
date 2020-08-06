# cqupt-help-mp

重邮帮小程序

- [ ]: 抽离应用中的实体，优化类型

## 目录结构

```shell
./
├── README.md
├── babel.config.js
├── config
│   ├── dev.js
│   ├── index.js
│   └── prod.js
├── global.d.ts
├── package.json
├── project.config.json
├── src
│   ├── app.config.ts
│   ├── app.scss
│   ├── app.ts
│   ├── common
│   │   ├── components
│   │   │   ├── nav-back
│   │   │   │   └── index.tsx
│   │   │   └── primary-button
│   │   │       ├── index.module.scss
│   │   │       └── index.tsx
│   │   ├── constants
│   │   └── helpers
│   │       └── date.ts
│   ├── index.html
│   ├── modules
│   │   ├── my-activity
│   │   │   ├── components
│   │   │   │   └── activity
│   │   │   │       ├── index.module.scss
│   │   │   │       └── index.tsx
│   │   │   └── pages
│   │   │       └── index
│   │   │           ├── index.config.ts
│   │   │           ├── index.module.scss
│   │   │           └── index.tsx
│   │   ├── my-reward
│   │   │   ├── components
│   │   │   │   └── reward
│   │   │   │       ├── index.module.scss
│   │   │   │       └── index.tsx
│   │   │   └── pages
│   │   │       └── index
│   │   │           ├── index.config.ts
│   │   │           ├── index.module.scss
│   │   │           └── index.tsx
│   │   └── volunteer
│   │       └── pages
│   │           ├── detail
│   │           │   ├── index.config.ts
│   │           │   ├── index.jsx
│   │           │   └── index.module.scss
│   │           ├── entry
│   │           │   ├── index.config.ts
│   │           │   ├── index.jsx
│   │           │   └── index.module.scss
│   │           └── index
│   │               ├── index.config.ts
│   │               ├── index.jsx
│   │               └── index.module.scss
│   └── static
│       ├── images
│       └── styles
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

1. 大部分页面底色都是 `#F6F6F9`，所以全局样式 `page` 设置了 `min-height` 和 `background-color`，有个别页面底色是白色需要自己设置 `wrapper` 样式

2. 目前我的奖品的缺省页、我的活动的缺省页、影票的缺省页都是一样的，考虑三个页面并不耦合并且之后可能会改，目前先分别写了一遍，之后可以考虑抽离成组件，内部进行判断再渲染对应页面缺省页

3. 由于编写时自定义 navbar 使用的库 `taro-navigationbar` 并没有支持 taro3，所以自己 fork 了一份发布到 npm 上，名为 `taro3-navigationbar`，等之后作者支持了可以更换回去。同时编译警告 `chunk common [mini-css-extract-plugin] Conflicting order between: ...` 因为 scss 引入顺序问题冲突，并无大碍，目前 taro 官方 issue 也有提到，之后再完善

4. 请求库使用了 react-query，由于 taro 在小程序环境下 webpack providePlugin 跳过 .mjs 文件，导致 react-query 所需要的全局变量的丢失，所以需要

   ```ts
   import { useQuery } from "react-query/dist/react-query.production.min";
   ```

   这样引入，同时在 `global.d.ts` 文件导入原来的类型声明

   ```ts
   declare module "react-query/dist/react-query.production.min" {
     export * from "react-query";
   }
   ```

5. popup 通过 context 进行封装，可以通过命令式调用弹出

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

TODO: 我的活动相关时间的处理
