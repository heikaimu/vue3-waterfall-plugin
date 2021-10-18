/*
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 13:34:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-18 15:58:14
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
  const BASE_URL = "https://heikaimu.github.io/vue-waterfall-plugin/dist/img";
  return {
    // ?timestamp=${Date.now()}
    original: `${BASE_URL}/${name}`
  };
}

export function getList(num) {
  
  const list = [
    {
      src: getURL(`1.a604b4d7.jpg`),
      width: 400,
      height: 400
    },
    {
      src: getURL(`2.e1f56b07.jpg`),
      width: 500,
      height: 701
    },
    {
      src: getURL(`3.6f9f3953.jpg`),
      width: 500,
      height: 673
    },
    {
      src: getURL(`4.a4d21f7f.jpg`),
      width: 600,
      height: 845
    },
    {
      src: getURL(`5.c05c8cd0.jpg`),
      width: 600,
      height: 799
    },
    {
      src: getURL(`6.b4389003.jpg`),
      width: 597,
      height: 593
    },
    {
      src: getURL(`7.e0ab44d7.jpg`),
      width: 650,
      height: 912
    },
    {
      src: getURL(`8.3527cecf.jpg`),
      width: 500,
      height: 1411
    },
    {
      src: getURL(`9.0cd14133.jpg`),
      width: 620,
      height: 835
    },
    {
      src: getURL(`10.90bcf7bd.jpg`),
      width: 658,
      height: 940
    },
    {
      src: getURL(`11.d5e66c61.jpg`),
      width: 658,
      height: 658
    },
    {
      src: getURL(`12.e1985717.jpg`),
      width: 658,
      height: 688
    },
    {
      src: getURL(`13.9923ba86.jpg`),
      width: 658,
      height: 862
    },
    {
      src: getURL(`14.aaa8f4e2.jpg`),
      width: 658,
      height: 877
    },
    {
      src: getURL(`15.2d2bb21e.jpg`),
      width: 468,
      height: 662
    }
  ]

  list.forEach(item => {
    item.backgroundColor = randomColor();
    item.name = randomName();
  })
  return list.slice(0, num);
}