<template>
  <div class="account-box">
 <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
   <!-- ref写在元素上是拿dom 写在组件上是拿实例-->
    <!-- autocomplate 取消浏览器自动填充   v-slot="{errors}"作用域插槽-->
    <Form ref="formcom" class="form" :validation-schema="schema" autocomplete="off" v-slot="{errors}">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field  :class="{error:errors.account}"  v-model="form.account" name="account" type="text" placeholder="请输入用户名或手机号" />
          </div>
          <div v-if="errors.account" class="error">
            <i class="iconfont icon-warning" />
              {{errors.account}}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />
            {{errors.password}}
          </div>
        </div>
      </template>

      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div v-if="errors.mobile" class="error">
            <i class="iconfont icon-warning" />
              {{errors.mobile}}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{error:errors.code}" v-model="form.code" name="code" type="password" placeholder="请输入验证码" />
            <span class="code">发送验证码</span>
          </div>
          <div v-if="errors.code" class="error">
            <i class="iconfont icon-warning" />
              {{errors.code}}
          </div>
        </div>
      </template>

     <div class="form-item">
        <div class="agree">
        <!-- as="组件名" 会将默认解析成input解析成组件  其解析的组件要支持v-model-->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />
          {{errors.isAgree}}
        </div>
      </div>
      <a href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import schema from '@/utils/vee-validate-schema'
import { ref, reactive, watch } from 'vue'
import { Form, Field } from 'vee-validate'
export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup () {
    const isMsgLogin = ref(false)
    const form = reactive({
      isAgree: true,
      account: null,
      passward: null,
      code: null,
      mobile: null
    })

    // vee-validate 校验基本步骤
    // 1.导入Form Field 组件 将Form 和input进行替换，需要加上name用来指定将来的校验规则函数的
    // 2.Field需要进行数据绑定的 字段名称最好和后台接口需要的一致
    // 3.定义Field中的name属性指定的校验规则函数 Form的validation-schema接受定义好的校验规则是对象
    // 3. 定义Field的name属性指定的校验规则函数，Form的validation-schema接受
    const mySchema = {
      // 校验函数规则：返回true就是校验成功，返回一个字符串就是失败，字符串就是错误提示信息
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    // formcom是拿到的表单组件
    const formcom = ref(null)
    // 监听isMygLogin重置表单
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 如果没有Field组件，之前的校验结果是不会清除的   例如:v-show切换的
      // Form组件提供了一个resetForm函数清除校验结果
      formcom.value.resetFform()
    })

    // 需要在点击登录的时候对整体的表单进行校验
    const login = () => {
      // Form组件提供了一个 validate函数作为整体表单校验，当是返回的是一个promise
      formcom.value.validate().then(valid => {
        console.log(valid)
      })
    }
    return { isMsgLogin, form, schema: mySchema, formcom, login }
  }
}
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
