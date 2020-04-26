<template lang="pug">
  div
    el-dialog(title="录入" :visible.sync="dialogTableVisible" :close-on-press-escape="false" :before-close="handleBeforeClose")
      el-form(:model="state.form" label-width="100px")
        el-form-item(label="日志行号")
          el-input(v-model="state.form.row" )
        el-form-item(label="状态")
          el-input(v-model="state.form.status")
        el-form-item(label="发生日期")
          el-date-picker(v-model="state.form.createdAt" type="date" placeholder="选择日期")
        el-form-item(label="问题跟踪人")
          el-input(v-model="state.form.name")
        el-form-item(label="问题描述")
          el-input(v-model="state.form.describe" type="textarea")
        el-form-item(label="解决方案")
          el-input(v-model="state.form.programme" type="textarea")
      div(slot="footer" class="dialog-footer")
        el-button(@click="handleClose") 取消
        el-button(type="primary" @click="submit") 确定
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  props:{
    dialogTableVisible:{type:Boolean,default:false}
  },
  setup(props,content){
    function handleClose () {
      content.emit('handleClose')
    }
    function handleBeforeClose () {
      content.emit('handleClose')
    }
    function submit () {
      content.emit('submit', state.form)
    }
    const state = reactive({form:{}})
    return {
      handleClose,
      handleBeforeClose,
      state,
      submit
    }
  }
}
</script>