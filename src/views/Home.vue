<template>
  <div>
    <!-- 串口配置 不要了 -->
    <el-row :gutter="5">
      <!-- 串口配置 -->
      <el-col :span="6">
        <el-form :inline="false" :model="serial" class="baud-select">
          <el-form-item label="串口选择">
            <el-select
              v-model="serial.COM"
              placeholder="请选择串口"
              :disabled="serial.isConnectCOM"
            >
              <el-option
                v-for="item in serial.COMlist"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="波特率">
            <el-select
              v-model="serial.baudRate"
              placeholder="请选择波特率"
              :disabled="serial.isConnectCOM"
            >
              <el-option
                v-for="item in serial.baudOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button
            type="primary"
            v-show="!serial.isConnectCOM"
            @click="openCOM"
            >打开串口</el-button
          >
          <el-button
            type="danger"
            v-show="serial.isConnectCOM"
            @click="closeCOM"
            :disabled="chart.isshow"
            >关闭串口</el-button
          >
          <div class="btn2">
            <el-button
              type="success"
              v-show="serial.isConnectCOM && chart.isshow"
              size="medium"
              @click="stopDraw"
              :disabled="chart.isRunning"
              >停止绘制</el-button
            >
            <el-button
              type="success"
              v-show="serial.isConnectCOM && !chart.isshow"
              size="medium"
              @click="startDraw"
            >
              数据可视化
            </el-button>
          </div>

          <div v-show="false">
            <el-form-item label="数据位">
              <el-select v-model="serial.baudRate" placeholder="请选择波特率">
                <el-option
                  v-for="item in serial.baudOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="停止位">
              <el-select v-model="serial.baudRate" placeholder="请选择波特率">
                <el-option
                  v-for="item in serial.baudOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="校验位">
              <el-select v-model="serial.baudRate" placeholder="请选择波特率">
                <el-option
                  v-for="item in serial.baudOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
      <!-- 相关操作 -->
      <el-col :span="18">
        <div class="charts">
          <!-- <Charts :newData="df"/> -->
          <div style="width: 100%; height: 100%" id="echart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import Charts from "../components/Charts";
import * as echarts from "echarts";
export default {
  // components: { Charts },
  name: "Home",
  computed: {},
  data() {
    return {
      // a: null,
      serial: {
        baudRate: 115200,
        baudOptions: [
          110, 330, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 43000,
          57600, 76800, 115200, 128000, 230400, 256000, 460800, 921600, 1000000,
          2000000, 3000000,
        ],
        COM: "",
        COMlist: [],
        serialPort: null,
        isConnectCOM: false, // 是否连接串口
      },
      chart: {
        isshow: false,
        time: null, // 定时器的那个鬼东西
        showdata: [], // 实际展示的数据
        isRunning: false, // 画画的时候防止多点
        chartDom: null, // chart容器
        myChart: null, // 初始化后的chart
        date: null,
        // 绘制的配置
        option: {
          title: {
            text: "实时温度",
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return (
                date.getHours() +
                "h/" +
                (date.getMinutes() + 1) +
                "m/" +
                date.getSeconds() +
                " s: " +
                params.value[1] + "°"
              );
            },
            axisPointer: {
              animation: false,
            },
          },
          xAxis: {
            type: "time",
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: "Fake Data",
              type: "line",
              showSymbol: false,
              data: [
                {
                  name: new Date().toString(),
                  value: [
                    new Date().getTime(),
                    5
                  ],
                },
              ],
            },
          ],
        },
      },
      sp: null,
    };
  },
  methods: {
    startDraw() {
      this.chart.isRunning = true; // 此时按钮不可按
      const _this = this;
      // 获取容器
      this.chart.chartDom = document.getElementById("echart");
      this.chart.myChart = echarts.init(this.chart.chartDom, "dark");
      this.chart.myChart.setOption(this.chart.option);
      this.chart.time = setInterval(() => {
        _this.chart.myChart.setOption({
          series: [
            {
              data: _this.chart.showdata,
            },
          ],
        });
      }, 1000);
      this.chart.isRunning = false;
      this.chart.date = new Date(); //

      this.chart.isshow = true;
    },
    stopDraw() {
      this.chart.isRunning = true; // 此时按钮不可按
      clearInterval(this.chart.time);
      this.chart.chartDom = null;
      this.chart.myChart = null;
      this.chart.showdata = [];
      this.chart.date = null; // 销毁
      echarts.dispose(document.getElementById("echart")); // 销毁
      this.chart.isRunning = false; // 此时按钮不可按
      this.chart.isshow = false;
    },
    openCOM() {
      //#region
      const _this = this;
      const com = _this.serial.COM;
      if (com == "") {
        this.$message({
          showClose: true,
          message: "请选择串口",
          type: "warning",
        });
        return;
      }
      this.serial.serialPort = new require("serialport")(this.serial.COM, {
        autoOpen: false,
        baudRate: this.serial.baudRate,
      });
      const sp = this.serial.serialPort;
      console.log(sp.isOpen);
      if (sp.isOpen) {
        // 串口已经打开
        this.$message({
          showClose: true,
          message: "串口已经打开",
          type: "warning",
        });
        return;
      }
      //#endregion

      // 打开串口
      {
        sp.open();
        sp.on("open", () => {
          _this.serial.isConnectCOM = true;
        });
        sp.on("error", (err) => {
          console.log(err);
          if (err != null) {
            console.log(err);
            _this.$message.error(err);
            _this.serial.isConnectCOM = false;
            // sp.close();
          }
        });
      }
      // 绑定数据更新
      {
        let cdata = _this.chart.showdata;
        sp.on("data", (data) => {
          if (!_this.chart.isshow) {
            return; // 如果不在显示状态
          }
          console.log(parseFloat(data.toString()));
          this.chart.date = new Date(+this.chart.date + 1000);
          if (cdata.length > 1000) {
            cdata.shift();
          }
          let now = this.chart.date;
          let tempdata = {
            name: this.chart.date.toString(),
            value: [
              now.getTime(),
              parseFloat(data.toString()),
            ],
          };
          cdata.push(tempdata);
        });
      }
    },
    closeCOM() {
      const _this = this;
      const sp = this.serial.serialPort; // 能关闭必然是已经连接上了
      sp.close((err) => {
        if (err == null) {
          _this.serial.isConnectCOM = false;
          return;
        }
        console.log(err, "23223");
        _this.$message.error(err);
        _this.serial.isConnectCOM = false;
      });
    },
  },
  watch: {
    serial: {
      handler(newValue, oldValue) {},
      immediate: false,
      deep: true,
    },
    "chart.isshow": {
      handler(n, o) {
        console.log(111);
      },
      immediate: true,
      // deep:true
    },
  },
  mounted() {
    //#region
    // const _this = this
    // // 打开串口
    // this.serialPort = new require("serialport")("COM3", {
    //   baudRate: 115200,
    //   autoOpen: false,
    // });
    // const sp = this.serialPort;
    // sp.open(err => {
    //   if(err){
    //     console.log(err)
    //     console.log(err.);
    //     _this.$message.error(err)
    //   } else {
    //     _this.isConnectCOM = true
    //   }
    // })
    //#endregion
    const _this = this;
    // 设置定时器搜索串口
    _this.sp = new require("serialport");
    setInterval(() => {
      _this.sp.list().then(
        (ports) => {
          let temp = [];
          for (let i in ports) {
            temp.push(ports[i].path);
          }
          if (temp.indexOf(_this.serial.COM) == -1) {
            _this.serial.COM = "";
          }
          _this.serial.COMlist = temp;
        },
        (err) => console.error(err)
      );
    }, 1000);
    require("./js/Home");
  },
};
</script>

<style>
.baud-select {
  float: left;
  max-width: 120px;
}

#echart {
  min-width: 1280px;
  min-height: 800px;
}

.btn2 {
  margin-top: 10px;
}
</style>
