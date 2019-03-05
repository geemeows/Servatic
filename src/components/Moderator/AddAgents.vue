<template>
  <a-layout-content :style="{'height': '90.47vh' }">
    <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}">
      <h1 style="text-align: center">
        <a-icon type="user" /> Agents List
      </h1>
      <a-button type="primary" @click="showDrawer" style=" margin-bottom: 10px; float:right">
        <a-icon type="plus" /> New account
      </a-button>
      <div class="clearfix"></div>
      <a-drawer
        title="Add a new agent"
        :width="350"
        @close="onClose"
        :visible="visible"
        placement="left"
        :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
      >
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
        <a-divider>Personal Info</a-divider>
          <a-form-item>
            <a-input
              v-decorator="[
                'agentName',
                { rules: [{ required: true, message: 'Please input agent name!' }] }
              ]"
              placeholder="Agent Name"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'agentEmail',
                { rules: [{ required: true, message: 'Please input agent email!' }] }
              ]"
              placeholder="Email Address"
            >
              <a-icon
                slot="prefix"
                type="mail"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-divider>Login Info</a-divider>
          <a-form-item>
            <a-input
              v-decorator="[
                'agentUsername',
                { rules: [{ required: true, message: 'Please input agent username!' }] }
              ]"
              placeholder="Username"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input agent Password!' }] }
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'confirmPassword',
                { rules: [{ required: true, message: 'Please confirm agent Password!' }] }
              ]"
              type="password"
              placeholder="Confirm Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              block
            >
              Add Agent
            </a-button>
          </a-form-item>
        </a-form>
      </a-drawer>

      <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name')"/>
      </template>
      <template slot="delete" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    </a-layout-content>
  </a-layout-content>
</template>
<script>
import EditableCell from '../EditableCell'
export default {
  components: {
    EditableCell,
  },
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        username: '32',
        email: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        username: '32',
        email: 'London, Park Lane no. 1',
      }],
      columns: [{
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
      }, {
        title: 'Username',
        dataIndex: 'username',
      }, {
        title: 'Email Address',
        dataIndex: 'email',
      }, {
        title: 'Delete',
        width:'10%',
        dataIndex: 'actions',
        scopedSlots: { customRender: 'delete' },
      }],
    }
  },
  methods: {
    onCellChange (key, dataIndex) {
      return (value) => {
        const dataSource = [...this.dataSource]
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
      }
    },
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
        showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        } else {
          console.log("add to array")
        }
      });
    }
  },
  }
</script>
<style>
.clearfix {
  clear: both;
}

.ant-form-item {
  margin-bottom: 5px;
}
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>