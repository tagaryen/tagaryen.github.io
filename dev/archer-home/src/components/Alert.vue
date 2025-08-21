<template>
  <div class = "Alert" v-if="showModal">
    <div class="model-alert" @click.self="close">
      <div class="alert-content">
        <div>{{message}}</div>
        <button @click="close" class="alert-close">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Alert",
  data() {
    return { 
      message: "",
      showModal: false 
    };
  },
  watch: {
    showModalWatch(val) {
      if (val) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  },
  methods: {
    open(msg) {
      this.message = msg;
      this.showModal = true;
    },
    close() {
      this.showModal = false;
      this.message = "";
    },
    handleClickOutside(event) {
      const modalEl = this.$el.querySelector('.alert-content');
      if (modalEl && !modalEl.contains(event.target)) {
        this.showModal = false;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style lang="scss">
.Alert {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  
  .model-alert {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .alert-content {
    text-align: center;
    background: white;
    padding: 20px;
    padding-bottom: 10px;
    border-radius: 4px;
    z-index: 99;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .alert-close {
    margin-top: 8px;
    padding: 8px 16px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>