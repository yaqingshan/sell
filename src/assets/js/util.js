/**
  * 解析url参数
  * @example ?id=123&a=b
  * @return Object {id:123, a:b}
*/

export function urlParse () {
  let url = window.location.search
  // id=123&a=b
  let reg = /[?&][^?&]+=[^?&]+/g
  let paramArr = url.match(reg)
  let obj = {}
  // ['?id=123', '&a=b']
  if (paramArr) {
    paramArr.forEach((item) => {
      let temp = item.substring(1).split('=')
      // decodeURIComponent 对编码后的 URI 进行解码
      let key = decodeURIComponent(temp[0])
      let val = decodeURIComponent(temp[1])
      obj[key] = val
    })
    return obj
  }
}
