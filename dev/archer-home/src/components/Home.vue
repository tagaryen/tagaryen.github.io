<template>
  <div class="Home">
    <div class="home-title-area">
      <div :class="['home-title-time', time.isDarkTheme ? 'dark-theme' : '']" @click="toggleTheme">
        <div class="date-section">
          <div class="year">{{ formatDate(time.currentTime).year }}</div>
          <div class="month">{{ formatDate(time.currentTime).month }}</div>
          <div class="day">{{ formatDate(time.currentTime).day }}</div>
          <div class="day-of-week">{{ formatDate(time.currentTime).dayOfWeek }}</div>
        </div>
        
        <div class="time-section">
          <div class="time-display">
            <div class="time-unit">
              <div class="time-value">{{ formatTime(time.currentTime).hours }}</div>
              <div class="time-label">时</div>
            </div>
            <div class="time-separator">:</div>
            <div class="time-unit">
              <div class="time-value">{{ formatTime(time.currentTime).minutes }}</div>
              <div class="time-label">分</div>
            </div>
            <div class="time-separator">:</div>
            <div class="time-unit">
              <div class="time-value">{{ formatTime(time.currentTime).seconds }}</div>
              <div class="time-label">秒</div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-title-desc">
        <h3>Archer Tagryen 个人主页</h3>
      </div>
    </div>
    <div class="home-content-area">
      <div class="home-content-line">
        <div class="home-app">JSON美化工具</div>
        <div class="home-app">MD编辑工具</div>
      </div>
      <div class="home-content-line">

      </div>
    </div>
  </div>
</template>

<script>

/***
 * npm install live2d-widget
 * import L2Dwidget from 'live2d-widget';
*/

const l2dModels = [
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",  //萌妹子
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json",    //白猫
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json",      //碗里的胖狗
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json",    //黑猫
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",    //水手服萌妹子
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json",    //校服萌妹子
  "https://cdn.jsdelivr.net/npm/live2d-widget-model-nico@1.0.5/assets/nico.model.json"         //狐狸妹子
];

let timer = null;

export default {
  name: "Home",
  data() {
    return {
      time:{
        currentTime: new Date(),
        isDarkTheme: true
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.initLive2D()
    });
  },
  mounted() {
    let self = this;
    timer = setInterval(() => {
      self.time.currentTime = new Date()
    }, 1000);
  },
  unmounted() {
    if (timer) clearInterval(timer);
  },
  methods: {
    toggleTheme() {
      this.time.isDarkTheme = !this.time.isDarkTheme;
      document.body.classList.toggle('dark-theme', this.time.isDarkTheme);
    },
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
      
      return {
        year: `${year}年`,
        month: `${month}月`,
        day: day < 10 ? `0${day}` : `${day}`,
        dayOfWeek: `星期${dayOfWeek}`
      };
    },
        
    formatTime(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      
      return {
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
      };
    },
    initLive2D() {
      L2Dwidget.init({
        model: {
          jsonPath: l2dModels[0],
          scale: 0.8
        },
        display: {
          position: 'right',
          width: 250,
          height: 500,
          hOffset: 0,
          vOffset: 0
        },
        mobile: {
          show: true,
          scale: 0.8
        },
        react: {
          opacityDefault: 0.6,
          opacityOnHover: 0.8
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Home {
  margin: 8px;
  display: block;
  width: 100%;
  height: 100%;
  
  .home-title-area {
    display: flex;
    width: 100%;
    height: 40%;
  }

  //时间框
  .home-title-time {
    background: linear-gradient(135deg, #acc6e0 0%, #49a3fc 100%);
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 380px;
    max-width: 100%;
    transition: all 0.3s ease;
  }
  
  .home-title-time:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .date-section {
    display: flex;
    text-align: center;
    margin-bottom: 25px;
    justify-content: center;
    
    .year {
      font-size: 1.2rem;
      color: #6c757d;
      height: 50px;
      line-height: 50px;
    }
    
    .month {
      font-size: 1.8rem;
      font-weight: 600;
      color: #3498db;
      height: 50px;
      line-height: 50px;
    }
    
    .day {
      font-size: 1.8rem;
      font-weight: 600;
      color: #2c3e50;
      height: 50px;
      line-height: 50px;
    }
    
    .day-of-week {
      font-size: 1.2rem;
      font-weight: 500;
      color: #34495e;
      height: 50px;
      line-height: 50px;
    }
  }
  
  .time-section {
    text-align: center;
    background: linear-gradient(45deg, #3498db, #2c3e50);
    border-radius: 15px;
    padding: 20px;
    color: white;

    .time-display {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    
    .time-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .time-value {
      font-size: 2.8rem;
      font-weight: 700;
      min-width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    
    .time-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      margin-top: 5px;
      opacity: 0.7;
    }
    
    .time-separator {
      font-size: 2.5rem;
      font-weight: 700;
      padding: 0 5px;
      align-self: center;
    }
  }
  
  .dark-theme {
    background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);
  }
  
  .dark-theme .datetime-card {
    background: linear-gradient(145deg, #34495e, #2c3e50);
    color: #ecf0f1;
  }
  
  .dark-theme .year {
    color: #bdc3c7;
  }
  
  .dark-theme .month {
    color: #3498db;
  }
  
  .dark-theme .day {
    color: #ecf0f1;
  }
  
  .dark-theme .day-of-week {
    color: #bdc3c7;
  }
  //时间框 end

  //右上角个人信息
  .home-title-desc {
    margin-left: 100px;
  }

  .home-content-area {
    height: 55%;

    .home-content-line {
      margin-top: 10px;
      height: 50%;
      display: flex;

      .home-app {
        width: 80px;
        height: 60px;
        color: #ecf0f1;
        background: linear-gradient(45deg, #3498db, #48627b);
        margin: 10px 20px;
        border-radius: 7px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        text-align: center;
      }
    }
  }
}
</style>
