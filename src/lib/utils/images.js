
function imageLoaded(list, callbackFn) {
  for (const url of list) {
    loadImage(url).then((res) => {
      callbackFn(res);
    });
  }
}

/**
 * load images
 * @param {Array[String]} images - 图片链接数组
 */
function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.crossOrigin = 'Anonymous'; // 支持跨域图片
    image.src = url;
  });
};

function loadImages(images) {
  const queue = images.map(url => {
    return loadImage(url);
  });
  return new Promise((resolve) => {
    Promise.all(queue).then(res => {
      resolve(res);
    });
  });
}

export {
  imageLoaded,
  loadImage,
  loadImages
}