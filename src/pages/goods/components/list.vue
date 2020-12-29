<template>
  <div>
    <el-table :data="[]" border style="width: 100%">
      <el-table-column prop="date" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="address" label="商品价格"></el-table-column>
      <el-table-column prop="address" label="市场价格"></el-table-column>
      <el-table-column prop="address" label="图片"></el-table-column>
      <el-table-column prop="address" label="是否新品"></el-table-column>
      <el-table-column prop="address" label="是否热卖"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>