// /* eslint-disable no-unused-vars */
// import * as echarts from "echarts";

// // 封装

// class Chart {
//   constructor() {
//     this.index = 0; // 数据标
//     // 初始化
//     this.chartDom = document.getElementById("echart");
//     this.myChart = echarts.init(this.chartDom, "dark");
//     // 配置
//     this.option = {
//       title: {
//         text: "实时电压",
//       },
//       tooltip: {
//         trigger: "axis",
//         formatter: function (params) {
//           params = params[0];
//           var date = new Date(params.name);
//           return (
//             date.getHours() +
//             "/" +
//             date.getMinutes() +
//             "/" +
//             date.getSeconds() +
//             "/" +
//             date.getMilliseconds() +
//             " : " +
//             params.value[1]
//           );
//         },
//         axisPointer: {
//           animation: false,
//         },
//       },
//       xAxis: {
//         type: "value",
//         min: "dataMin",
//         splitLine: {
//           show: false,
//         },
//       },
//       yAxis: {
//         type: "value",
//         boundaryGap: [0, "100%"],
//         splitLine: {
//           show: false,
//         },
//       },
//       series: [
//         {
//           name: "Fake Data",
//           type: "line",
//           showSymbol: false,
//           data: data,
//         },
//       ],
//     };
//     this.data = []; //
//     this.flushData = []; // 缓冲区
//     this.time = setInterval(function () {
//       // for (var i = 0; i < 10; i++) {
//       if (data.length > 1000) data.shift();
//       data.push(randomData());
//       // }
//       myChart.setOption({
//         series: [
//           {
//             data: data,
//           },
//         ],
//       });
//     }, 10);
//   }
// }

// let time;
// let index = 0;
// function StartDraw(data) {
//   var chartDom = document.getElementById("echart");
//   var myChart = echarts.init(chartDom, "dark");
//   var option = {
//     title: {
//       text: "实时电压",
//     },
//     tooltip: {
//       trigger: "axis",
//       formatter: function (params) {
//         params = params[0];
//         var date = new Date(params.name);
//         return (
//           date.getHours() +
//           "/" +
//           date.getMinutes() +
//           "/" +
//           date.getSeconds() +
//           "/" +
//           date.getMilliseconds() +
//           " : " +
//           params.value[1]
//         );
//       },
//       axisPointer: {
//         animation: false,
//       },
//     },
//     xAxis: {
//       type: "value",
//       min: "dataMin",
//       splitLine: {
//         show: false,
//       },
//     },
//     yAxis: {
//       type: "value",
//       boundaryGap: [0, "100%"],
//       splitLine: {
//         show: false,
//       },
//     },
//     series: [
//       {
//         name: "Fake Data",
//         type: "line",
//         showSymbol: false,
//         data: data,
//       },
//     ],
//   };
//   time = setInterval(function () {
//     // for (var i = 0; i < 10; i++) {
//     if (data.length > 1000) data.shift();
//     data.push(randomData());
//     // }
//     myChart.setOption({
//       series: [
//         {
//           data: data,
//         },
//       ],
//     });
//   }, 10);
//   option && myChart.setOption(option);
// }
// function stopDraw() {
//   clearInterval(time); // 清除定时器
// }
// function randomData() {
//   now = new Date();
//   let x = now.getMilliseconds();
//   value = Math.sin(x / 10);
//   return {
//     name: now.toString(), // 当前毫秒数
//     value: [
//       // x轴坐标
//       // [
//       // now.getFullYear(),
//       // now.getMonth(),
//       // now.getHours(),
//       // now.getMinutes(),
//       index++, // 毫秒级别
//       // ].join("/"),
//       Math.round(value),
//     ],
//   };
// }
// let data = [];
// let now = new Date();
// let value = 0;
// // for (var i = 0; i < 1000; i++) {
// //   data.push(randomData());
// // }

// setInterval(function () {
//   // for (var i = 0; i < 10; i++) {
//   if (data.length > 1000) data.shift();
//   data.push(randomData());
//   // }
//   myChart.setOption({
//     series: [
//       {
//         data: data,
//       },
//     ],
//   });
// }, 10);

// option && myChart.setOption(option);
// console.log(data.splice(-1));
