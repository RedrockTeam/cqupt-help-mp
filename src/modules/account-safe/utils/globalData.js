import { setStorage, getStorage } from '@tarojs/taro'
const globalData = { bantime: 0 };
export const setBanTime = (val) => {
    globalData["bantime"] = val;
}
export const getBanTime = () => {
    return globalData["bantime"];
}
