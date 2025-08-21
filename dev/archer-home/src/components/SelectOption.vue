<template>
  <div class="simple-options-area" @mouseover="showover"  @mouseout="showout">
    <div class="simple-options" :class="{'simple-options-hover': optionHover }">
      {{name}}
    </div>
    <div class="options-container" :class="{ visible: showOption }">
      <div class="option-item"
        v-for="option in options" 
        :key="option" 
        :class="{ selected: isOptionSelected(option) }"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "SelectOption",
  props: {
    optionClickMethod: Function
  },
  data(){
    return {
      name: "",
      showOption: false,
      optionHover: false,
      selectedOption: null,
      maxWith: 12,
      options: [""]
    }
  },
  mounted(){
  },
  methods: {
    init(name, options) {
      if(name) {
        this.name = name;
      }
      if(options) {
        this.options = options;
      }
    },
    showover() {
      this.showOption = true;
      this.optionHover = true;
    },
    showout() {
      this.showOption = false;
      this.optionHover = false;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.showOption = false;
      this.optionClickMethod();
    },
    
    isOptionSelected(option) {
      return this.selectedOption && this.selectedOption === option;
    }
  }
}

</script>

<style lang="scss">
.simple-options-area {
  position: relative;
  overflow: visible;
  text-align: center;

  .simple-options {
    text-align: center;
    position: relative;
    cursor: pointer;
    overflow: visible;
  }

  .simple-options-hover {
    color: #3498db;
  }

  .options-container {
    position: absolute;
    top: 100%;
    left: calc(-25%);
    background: white;
    border-radius: 10px;
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    z-index: 100;
    opacity: 0;
    transform: translateY(-10px);
    visibility: hidden;
    transition: all 0.3s ease;
    max-height: 300px;
    overflow-y: auto;
  }

  .options-container.visible {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
  

  .option-item {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    align-items: center;
    padding: 0px 4px;
    font-size: 14px;
    color: #3498db;
    height: 18px;
    line-height: 1;
  }

  .option-item:hover {
    color: #cbdffc;
  }
}

</style>