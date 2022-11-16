// npm i postcss-pxtorem -D
// 如果使用的是vuecli生态则 npm i postcss-pxtorem@5.1.1 -D 
// 该文件放入项目根目录
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
      selectorBlackList: ['.norem'], // 过滤掉.norem-开头的class，不进行rem转换
    },
  },
};
