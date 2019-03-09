<template>
  <a-layout style="margin: 24px 16px; padding: '24px',">
    <a-row :gutter="16">
      <a-col :span="6">
        <div class="card">
          <a-layout-content
            :style="{background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)' }"
          >
            <a-row>
              <a-col :span="10">
                <div class="card-icon">
                  <a-icon type="clock-circle"/>
                </div>
              </a-col>
              <a-col :span="14">
                <div class="card-info">
                  <span>2,000</span>
                </div>
              </a-col>
            </a-row>
          </a-layout-content>
        </div>
      </a-col>
            <a-col :span="6">
        <div class="card">
          <a-layout-content
            :style="{background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)' }"
          >
            <a-row>
              <a-col :span="10">
                <div class="card-icon">
                  <a-icon type="clock-circle"/>
                </div>
              </a-col>
              <a-col :span="14">
                <div class="card-info">
                  <span>2,000</span>
                </div>
              </a-col>
            </a-row>
          </a-layout-content>
        </div>
      </a-col>
            <a-col :span="6">
        <div class="card">
          <a-layout-content
            :style="{background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)' }"
          >
            <a-row>
              <a-col :span="10">
                <div class="card-icon">
                  <a-icon type="clock-circle"/>
                </div>
              </a-col>
              <a-col :span="14">
                <div class="card-info">
                  <span>2,000</span>
                </div>
              </a-col>
            </a-row>
          </a-layout-content>
        </div>
      </a-col>
            <a-col :span="6">
        <div class="card">
          <a-layout-content
            :style="{background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)' }"
          >
            <a-row>
              <a-col :span="10">
                <div class="card-icon">
                  <a-icon type="clock-circle"/>
                </div>
              </a-col>
              <a-col :span="14">
                <div class="card-info">
                  <span>2,000</span>
                </div>
              </a-col>
            </a-row>
          </a-layout-content>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>
<style>
.card .card-icon {
  background-color: #001529;
  color: white;
  text-align: center;
    padding: 20px 0;
  font-size: 50px
}
.card-info {
  text-align: center;
    padding: 30px 0;
}
.card-info span {
  font-size: 35px;
  font-weight: bold;
}
</style>
