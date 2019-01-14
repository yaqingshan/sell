// 存储到本地
// 注意localStorage 存储为字符串 例如： 存 false 会变成 字符串"false"
export function saveToLocal (id, key, value) {
  // __seller__ 用双下滑线命名表示私有的
  // 需要指定是在window下
  let seller = window.localStorage.__seller__
  if (!seller) {
    console.log(1)
    seller = {}
    seller[id] = {}
  } else {
    console.log(2)
    seller = JSON.parse(seller)
    if (!seller) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}
// 从本地读取
export function readFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let result = seller[key]
  return result || def
}
