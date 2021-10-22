/*
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 13:34:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-22 17:52:12
 */

const COLORS = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];
const NAMES = ['小当家','樱木花道','木之本樱','小可','水冰月','哆啦A梦','大雄','项少羽','天明','月儿','石兰','夏尔凡多姆海恩','塞巴斯蒂安','亚伦沃克','皮卡丘','鸣人','宇智波佐助','旗木卡卡西','喜洋洋','灰太狼','爱德华','阿冈','黑崎一护','路飞','索隆','山治','恋次','越前龙马'];

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return COLORS[getRandomNum(0, 4)];
}

function randomName() {
  return NAMES[getRandomNum(0, 25)];
}

function getURL(name) {
  const BASE_URL = "https://heikaimu.github.io/images";
  return {
    // ?timestamp=${Date.now()}
    original: `${BASE_URL}/${name}.jpeg`
  };
}

export function getList(num) {
  
  const list = [
    {
      src: getURL(`1`),
      width: 807,
      height: 572
    },
    {
      src: getURL(`2`),
      width: 564,
      height: 807
    },
    {
      src: getURL(`3`),
      width: 807,
      height: 538
    },
    {
      src: getURL(`4`),
      width: 564,
      height: 807
    },
    {
      src: getURL(`5`),
      width: 553,
      height: 807
    },
    {
      src: getURL(`6`),
      width: 771,
      height: 1080
    },
    {
      src: getURL(`7`),
      width: 807,
      height: 638
    },
    {
      src: getURL(`8`),
      width: 543,
      height: 807
    },
    {
      src: getURL(`1`),
      width: 807,
      height: 572
    },
    {
      src: getURL(`2`),
      width: 564,
      height: 807
    },
    {
      src: getURL(`3`),
      width: 807,
      height: 538
    },
    {
      src: getURL(`4`),
      width: 564,
      height: 807
    },
    {
      src: getURL(`5`),
      width: 553,
      height: 807
    },
    {
      src: getURL(`6`),
      width: 771,
      height: 1080
    },
    {
      src: getURL(`7`),
      width: 807,
      height: 638
    },
    {
      src: getURL(`8`),
      width: 543,
      height: 807
    },
  ]

  list.forEach(item => {
    item.backgroundColor = randomColor();
    item.name = randomName();
  })
  return list.slice(0, num);
}