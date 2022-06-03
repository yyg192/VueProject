import Vue from 'vue'
import { Button, Form, FormItem, Input, Row, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.prototype.$message = Message // Message组件需要挂载到Vue的原型对象上
