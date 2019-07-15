<template>
  <a-layout style="margin: 24px; padding: '24px'">
    <a-layout-content
      :style="{ padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="bars"/>&nbsp;Servatic Clients
      </h1>
      <a-table bordered :dataSource="getCompanies" :columns="columns" :loading="isLoading">
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          class="custom-filter-dropdown"
        >
          <a-input
            v-ant-ref="c => searchInput = c"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm)"
            style="width: 188px; margin-bottom: 8px; display: block;"
          />
          <a-button
            type="primary"
            @click="() => handleSearch(selectedKeys, confirm)"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
          >Search</a-button>
          <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text">
          <span v-if="searchText">
            <template
              v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >{{fragment}}</mark>
              <template v-else>{{fragment}}</template>
            </template>
          </span>
          <template v-else>{{text}}</template>
        </template>
        <template slot="delete" slot-scope="text, record">
          <a-popconfirm
            v-if="companies.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Cookies from 'vue-cookies'
export default {
  props: ['isLoading', 'companies'],
  beforeCreate () {
    console.log('beforeCreate (CompaniesList): ', Cookies.get('token'))
  },
  created () {
    this.companiesList = this.getCompanies
  },
  computed: {
    getCompanies () {
      return this.companies
    }
  },
  data () {
    return {
      companiesList: [],
      searchText: '',
      searchInput: null,
      columns: [
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          width: '40%',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: 'Added At',
          dataIndex: 'addedAt',
          width: '40%'
        },
        {
          title: 'Delete',
          width: '20%',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'delete' }
        }
      ]
    }
  },
  methods: {
    onDelete (key) {
      const companiesList = [...this.getCompanies]
      const updatedList = companiesList.filter(item => item.key !== key)
      const deletedItem = companiesList.filter(item => item.key === key)
      this.$emit('updateCompaniesList', {
        deletedItem: deletedItem[0].key,
        updatedList
      })
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}
</script>

<style>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
