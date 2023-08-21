<template>
  <div>
    <el-button class="button" type="primary" @click="handleAddClick"
      >+添加产品</el-button
    >
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
     
      border
      :span-method="objectSpanMethod" 
     
    >
      <el-table-column prop="id" label="" width="50"> </el-table-column>
      <el-table-column prop="name" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="number" label="采购数量" sortable width="180">
      </el-table-column>
      <el-table-column prop="unit" label="计量单位"> </el-table-column>

      <el-table-column label="采购品牌" prop="brandInfo">
        <template slot-scope="scope">
          <div v-for="item in scope.row.brandInfo" :key="item.$index">
            <span>{{ item.brand }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="brandInfo" label="采购型号">
        <template slot-scope="scope">
          <div v-for="item in scope.row.brandInfo" :key="item.$index">
            <span>{{ item.model }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="origin" label="产地要求"> </el-table-column>
      <el-table-column prop="availablity" label="现货要求"> </el-table-column>
      <el-table-column prop="authenticity" label="原装正品要求">
      </el-table-column>
      <el-table-column prop="technical" label="技术指标"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框组件 -->
    <el-dialog
      title="添加产品"
      :visible="dialogVisible"
      @close="closeDialog"
      width="50%"
    >
      <!-- 编辑内容区域，可以根据需要展示表单或其他编辑元素 -->
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="100px"
        align="left"
      >
        <!-- 表单项 -->
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产地要求">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
        <el-form-item label="采购数量">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>
        <el-form-item label="现货要求">
          <el-input v-model="form.availablity"></el-input>
        </el-form-item>
        <el-form-item label="原装正品要求">
          <el-input v-model="form.authenticity"></el-input>
        </el-form-item>
        <el-form-item label="技术指标">
          <el-input type="textarea" v-model="form.technical"></el-input>
        </el-form-item>
      </el-form>
      <!-- <template> -->
      <el-table :data="modDates" border style="width: 100%,height: 30px;">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="参考品牌名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.brand"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="model" label="参考型号名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.model"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="delTableData(scope.$index)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button class="button" type="primary" @click="addTableData"
        >新增品牌</el-button
      >

      <!-- </template> -->

      <!-- 保存和取消按钮 -->
      <div slot="footer">
        <!-- <el-button class="button" type="primary" @click="handleAddClickk">新增品牌</el-button> -->
        <el-button type="primary" @click="saveData">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    getBrandRowspan() {
      return this.tableData.length + 1;
    },
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      form: {
        name: "",
        origin: "",
        number: "",
        unit: "",
        authenticity: "",
        technical: "",
        brand: "",
        // brandd: '',
        model: "",
        // modell: ''
      },
      dialogVisible: false, // 控制弹框的显示与隐藏
      tableData: [
        {
          id: 1,
          name: "显卡采购",
          number: "1000",
          unit: "个",
          origin: "全国",
          availablity: "1",
          authenticity: "1",
          technical: "惆怅长岑长",
          brandInfo: [
            {brand: "111", model: "222"},
            // {brand: "111", model: "222"},
            // {brand: "111", model: "222"}
        ],
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          name: "显卡采购",
          number: "1000",
          unit: "个",
          origin: "全国",
          availablity: "1",
          authenticity: "1",
          technical: "惆怅长岑长",
          brandInfo: [
            {brand: "111", model: "222"},
            // {brand: "111", model: "222"},
            // {brand: "111", model: "222"}
        ],
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 3,
          name: "显卡采购",
          number: "1000",
          unit: "个",
          origin: "全国",
          availablity: "1",
          authenticity: "1",
          brandInfo: [
            {brand: "111", model: "222"},
            // {brand: "111", model: "222"},
            // {brand: "111", model: "222"}
        ],
          technical: "惆怅长岑长",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      newTableRow: {}, // 新增的空表格数据
      emptyTableData: [],
      modDates: [],
      // modDate: [{
      //   brand: '',
      //   brandd: '',
      //   model: '',
      //   modell: '',
      // }]
    };
  },
  methods: {
    addTableData() {
      console.log("添加参考表格相关数据");
      const obj = {
        brand: "",
        model: "",
      };
      this.modDates.push(obj);
      // console.log(this.modDate)
    },
    // handleAddClickk() {
    //   this.modDate.push({});
    // },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8 || columnIndex === 9 || columnIndex === 10) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
    },
    fetchData() {
      axios
        .post("/api/zh-project/addZhProject")
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data; // 将返回的数据绑定到tableData属性上
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    closeDialog() {
      // 关闭弹框的方法
      // 可以在这里重置弹框中的数据
      this.dialogVisible = false;
      this.showEditDialog = false; // 隐藏编辑弹框
      this.form = {
        // 清空表单数据
        name: "",
        origin: "",
        number: "",
        unit: "",
        authenticity: "",
        technical: "",
        brandInfo: [{ brand: "", brandd: "" }],
        model: "",
      };
    },
    handleAddClick() {
      this.modDates = [{ brand: "", model: "" }];
      this.dialogVisible = true;
      this.newTableRow = {}; // 清空空表格数据
      this.form = {
        // 清空表单数据
        name: "",
        origin: "",
        number: "",
        unit: "",
        authenticity: "",
        technical: "",
        brandInfo: [{ brand: "", brandd: "" }],
        model: "",
        modell: "",
      };
    },
    handleClick(row) {
      // 在这里处理点击编辑按钮的逻辑
      // 可以根据需要进行业务操作，并设置弹框中的初始数据

      // 将弹框的显示状态设为true，即显示弹框
      this.dialogVisible = true;
      this.form = { ...row }; // 设置表单字段初始值为当前行的数据

      // this.modDate = [row]
      this.modDates = row.brandInfo;

      console.log("220", this.modDate);
    },
    saveData() {
      const index = this.tableData.findIndex(
        (item) => item.id === this.form.id
      );
      if (index !== -1) {
        const newData = { ...this.form, ...this.modDates[0] };
        this.tableData.splice(index, 1, newData);
      } else {
        const newId = this.tableData.length + 1;
        const newData = { id: newId, ...this.form, brandInfo: this.modDates };
        this.tableData.push(newData);
        // this.tableData = 
      }
      this.closeDialog();
      // 保存编辑数据的方法
      // 可以在这里处理保存数据的逻辑
    },
    handleDelete(row) {
      const index = this.tableData.indexOf(row); // 获取要删除的数据在 tableData 中的索引
      this.tableData.splice(index, 1); // 通过索引删除该条数据
    },
    //table表格中的删除功能
    delTableData(index) {
     this.modDates.splice(index, 1)
    },
  },
};
</script>

<style>
.button {
  float: left;
}
</style>
