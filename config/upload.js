/**
 * TODO: 添加 ci，需要管理员生成的 privateKey
 */
// const ci = require("miniprogram-ci");
// let { wxVersion: version, wxDesc: desc } = require("../package.json").wx;

// if (!version) version = "v1.2.5";
// if (!desc) desc = `${new Date()} 上传`;

// const project = new ci.Project({
//   appid: "wx8dff9ffbdf2e1cf1",
//   type: "miniProgram",
//   projectPath: `${process.cwd()}/dist`,
//   privateKeyPath: `${process.cwd()}/key/private.wx6a0b834a3839e80d.key`,
//   ignores: ["node_modules/**/*"],
// });
// ci.upload({
//   project,
//   version,
//   desc,
//   setting: {
//     minify: true,
//   },
// })
//   .then((res) => {
//     console.log(res);
//     console.log("上传成功");
//   })
//   .catch((error) => {
//     if (error.errCode === -1) {
//       console.log("上传成功");
//     }
//     console.log(error);
//     console.log("上传失败");
//     process.exit(-1);
//   });
