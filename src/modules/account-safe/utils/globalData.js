import { setStorage, getStorage } from '@tarojs/taro'
const globalData = { bantime: 0 };
export const setData = (key, val) => {
    globalData[key] = val;
}
export const getData = (key) => {
    return globalData[key];
}
export const setBanTime = (val) => {
    globalData["bantime"] = val;
}
export const getBanTime = () => {
    return globalData["bantime"];
}
export let banArray = [60, 300, 600, 1200]