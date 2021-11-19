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
            >关闭串口</el-button
          >
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
          <div style="width: 100%; height: 100%" ref="chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  name: "Home",
  computed:{
    chartData(){
      return [1,2,3,3,14,12,3,123,12,31,23,123,]
    },
  },
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
      chart:{
        
      },
      sp: null,
    };
  },
  methods: {
    openCOM() {
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
  },
};
</script>

<style>
.baud-select {
  float: left;
  max-width: 120px;
}
</style>
