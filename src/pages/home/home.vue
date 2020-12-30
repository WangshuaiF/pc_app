<template>
  <div>
    <div id="box"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      catelist: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      cateobtainList: "cate/obtainList"
    })
  },
  mounted() {
    this.cateobtainList();
  },
  watch: {
    catelist: {
      handler() {
        if (this.catelist.length > 0) {
          //画图
          let mychart = require("echarts").init(
            document.getElementById("box")
          );
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "分类数量"
            },
            tooltip: {},
            legend: {
              data: ["分类数量"]
            },
            xAxis: {
              data: this.catelist.map(item => item.catename)
            },
            yAxis: {},
            // series:数据
            series: [
              {
                name: "分类数量",
                type: "bar",
                data: this.catelist.map(item =>item.children ? item.children.length : 0)
              }
            ]
          };

          mychart.setOption(option);
        }
        deep: true;
      }
    }
  }
};
</script>

<style scoped>
#box {
  width: 80%;
  height: 500px;
  margin: 40px auto;
  border: 1px solid;
}
</style>