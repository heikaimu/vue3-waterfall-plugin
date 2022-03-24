/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-11 15:47:34
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-17 17:34:06
 */
/**
 * load images
 * @param {Array[String]} images - 图片链接数组
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error('Image load error'))
    }
    image.crossOrigin = 'Anonymous' // 支持跨域图片
    image.src = url
  })
}
