<template lang="pug">
  div
    el-button(type="primary" @click="handleAdd") 新加
    el-table(ref="singleTable" :data="state.tableData" highlight-current-row)
      el-table-column(type="index")
      el-table-column(label="发生日期" property="createdAt" :formatter="dateFormat")
      el-table-column(label="日志行号" property="row")
      el-table-column(label="状态" property="status")
      el-table-column(label="问题跟踪人" property="name")
      el-table-column(label="问题描述" property="describe")
      el-table-column(label="解决方案" property="programme")
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-button(type="text" size="small" @click="handleEditor(scope.row)") 修改
    el-pagination.page(:current-page="state.currentPage"
                  @size-change="handleSizeChange"
                  :page-sizes="[20, 50, 100, 200]"
                  :page-size="state.pageSize"
                  layout="total, sizes, prev, pager, next"
                  :total="total")
    Add(ref="add" :dialogTableVisible="state.dialogTableVisible" @handleClose="handleClose" @submit="submit")
</template>

<script>
import { reactive,ref,onMounted } from '@vue/composition-api'
import Add from './Add'
import axios from 'axios'
import moment from 'moment'
export default {
  components:{ Add },
  setup (props,content) {
    const state = reactive({tableData: [],currentPage:1,pageSize:20,dialogTableVisible:false})
    const total = ref(0)

    function handleSizeChange(val){
      state.pageSize = val
      getPage()
    }
    function handleAdd () {
      state.dialogTableVisible = true
    }
    function handleClose () {
      state.dialogTableVisible = false
    }
    function submit (form) {
      // state.tableData.splice(0,0,form)
      if(form.id){
        axios.put('/api/',form).then(() => {
          handleClose()
        }).catch(err => {
          console.error(err)
        })
      }{
        axios.post('/api/',form).then(() => {
          handleClose()
        }).catch(err => {
          console.error(err)
        })
      }
    }
    function getPage () {
      axios.get('/api/',{params:{currentPage:state.currentPage,pageSize:state.pageSize}}).then(doc => {
        state.tableData = doc.data.dataList
        total.value = doc.data.count
      }).catch(err => {
        console.error(err)
      })
    }
    function dateFormat (row) {
      if(row.createdAt){
        return moment(row.createdAt).format('MM-DD')
      }
    }
    function handleEditor (form) {
      state.dialogTableVisible = true
      content.refs.add.state.form = form
    }
    onMounted(() => {
      getPage()
    })
    return {
      state,
      total,
      handleSizeChange,
      handleAdd,
      handleClose,
      submit,
      dateFormat,
      handleEditor
    }
  }
}
</script>
<style scoped>
.page{
  margin-top: 20px;
  float: right;
}
</style>
