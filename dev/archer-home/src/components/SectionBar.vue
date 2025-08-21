<template>
  <div class="SectionBar">
    <div class="title">
      <img src="../assets/image/logo.svg" alt="Archer" title="Archer"/>
    </div>
    <ul class="guideList">
      <li
        v-for="(item, index) in guideList"
        :key="item.name"
        :class="{
          background: item.name === hoverMenu || item.name === curMenu,
        }"
        @mouseover="mouseover(item)"
        @mouseout="mouseout"
        @click="selectMenu(item)"
      >
      
      <img :src="item.svg"  width="26" height="26" :alt="item.name" :title="item.name"/>
      </li>
    </ul>
    <div class="user-info" v-if="logined">
      <img :src="getAvatarUrl(userInfo.url)" :alt="userInfo.name" :title="userInfo.name"/>
      <SelectOption ref="selectOptRef" :option-click-method="userlogout"/>
    </div>
    <div class="login-info" v-else @click="selectMenu({name:'login', path:'/login'})">
      <span>登录</span>
    </div>
  </div>
</template>

<script>
import SelectOption from "./SelectOption.vue"

const totalMenus = [
  {name: "home", path: "/home", svg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB50lEQVR4AeyXPS8EURSGh04tfgE/QlSIqFGIqBRaKtEJhU5JK0rR0EoUtAoiUShoJCqFRqfheSYza3Z2Znfu7iQiGTnvvWfPx3venGzM7HD0x3//WsAiy3tJoI8bbv1uYJdR52A8gb4xPoZZqIAR6B22x/0JNhPoGzNnDeFqFiJgDspH4LrvuZfBYQJ9Y+assZZUb6sqwPVeQefKz7iXwCVITd+YOWusdSNpvvSuIsC1pmT7MK2AV5A3Y+asMadoe/VL0U3AGF1+y13rG/4q2AG9zBpr7bFXDrkK+8oELFD9DlznNfc8OAVVzVp77JVDLjk7+osEHFB1AbQjjlnwBELNHnvlsFdOufVbyAs4IbMFvsA62ACDmhxyySm3M1qceQFrSWaK+xjUZXLJKV86Qz/KC4iDHHegbivkLBNQ9/BSvlABfqu/YesGayipZqECpivQVqlp0YQKSBuHcIpAOMz6FRA2pUt1I6DZQLOBZgP5DTwk/zPaHplJbNAr5UxnxHx5Ab7NmvCl4RnHB0sWhGLLxrJ+nOTIxvTlkpNUlM7Q73gf2Cbqjw2uaILDB0sWhGLLxrJ+nOTIxvTlIhzJ7Qz9GPkNGPTHxijOJJipCXLJKTeUv1YkwOwHxy24GRRJv1xy8rHdfgAAAP//1dpVhgAAAAZJREFUAwA30HBBePOWtgAAAABJRU5ErkJggg=='},
  {name: "edit", path: "/edit", svg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC9ElEQVR4AeyXWahNYRTHt6GEEkoRkjlzpjKUqShlKpme8CpJePLkgTfyIO/KmyEp5UEhJRQpUxFFFCVDEkni9zv22u177uHsffa5vNzb+p//+oa91vq+b33D7Zn8579/FcBUxrkbbACTQSZdHUAPPB0C98FRcCpFFkRXBtAbZ6fBfnAHHAF3wRRwAtSkPoAl1B4DVwriAP0aSR8qdb4ePgvmgH1gFjgH5gJ9JfkAnBYd70wb7dAMQ+hbL/2pOAPWgfNgE8jLq7QwW44A+lJwfaDE6VmaJEkRHKRfXgZQcOSr4AtA5z/gvKxMC4/lCGA8BdfmPbwdXC2I1/QLGYTiyHVwEV3n3+CQXii2j4MvAQPMlmAwFco9f1qAS6Hx5Xyr8c3wFxBiTpgL5oSDWxENMQNRboWH8pHOl8GXgSP/BIf0Q7F9Laxzlxb1t1QNYDhmNL4IvgYc+Qc4xJyw3Zzo5NxOVQIYhQGNL4SvA0f+Fg7J50RD53ZsNYAxfKzzefBN4MjfwCH5nPijczu3EoA7RuceLrcxovPY2xSTfE781bmdywYwiY90PhP2WNX5C/SQESi2mxNNndM324bqRXCSTtOBl4vOn6GHmBMeQuaEzrOtFh0acZkZmI8Bj8+PsM6fwCFjURy5OaHz1ZS/g5BhKMdBp7ujTAAax0bidnukkmIC7MjNCds8bD5Tl5eJFHaAxaCDlAnAGfBjncjCC8yRmxO3qHBmPM5Ri0krAXjO78W8N537fxp6JGT+bqC6uRQNwDU2wx9iUhyG14CBwMfGFvg5KC1FA/BppXFvTPe8a76HigXAta9dreilpWgAT7Gsc6/SkegbgW+8G3AlKRqATsz8/L63rjLKBFDZWSMD3QHEDMTa+gpuNFNV67amBh6knFEE8JIaz3Ao+cmPz/N24R32tgHFd6GcIQKwwrea/5SoOxPtgg9eDy+3cQxSHzXkA7BiFz+jgcG0CzOw539CbmPUjlIfgK0eqUbaFmDQp/5XuKH8AgAA///G84nfAAAABklEQVQDAM65tEFrDS1+AAAAAElFTkSuQmCC'},
  {name: "file", path: "/file", svg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABXElEQVR4AeyWvUoDQRSFVzsLCwU7G0UrRRQrO19CawW1U7BQ8A1EO61EUWt9ATtbOy0UBEUs0gWSIkXK5DvLzJKEzCbZv6SYcL57d2cyd09uBnbGgyF/vIHODuzxj3xCI4ZX5jJTq4Enqt7CEsRpk8kDyETWwBTVtkDaJYw52GBcuiGsQGpZA/Om0hf5EVx6Y+IcpHuFtFgDk6ZQ2eS4dMbkN6xD3F7pNvfOmguIZA1EA31eHPO9fxhUqyw4gUMIldTAC6vnwLVXXOPaXywLrgjTECQ1oLVJ0P76NQsXlYs2oGeWFGACCu+AntnGMDrgDfgO+A74DvgOjGYHasbWjMl5pllTvK5sX0Z/ugGdiHfIeUm1F0zxH2VroMrNM0gPhG7nuSzGVJvywRGhAm3ngW0G9kEnY1Iu+qDqJVxDKNuB8IZwB8vgOtOlHV+j9ilE6jQQTRR1kbuBXj+kCQAA//9n0+9GAAAABklEQVQDAIxTS0FtQRXMAAAAAElFTkSuQmCC'},
  {name: "user", path: "/user", svg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAIsSURBVFhH7ZY/6LFRFMePdzSwSihGihCyMSi7skspWSUbm1FGxcJmMZqYDPIvi0FsElIYWCz3vfd0Pb2/Ho/nyuD3lk/dvnXP/fP1OPeeqyEU+CB/uH6M/89At9uFdDoNbrcb9Ho9RKNRyOVyMJlM+IgXYTkgSqVSYfmi2FKpFB8pjrCBTqcjbVQqlchqtSLX65VMp1OSyWSkWLvd5jPEEDJAP6+0gRLVahXjZrOZnE4n3quOkIFkMomLs02e4fV6cVytVuM96ggl4WAwQA2FQqhKRCIR1OFwiCqCkIH1eo1qMplQlQgEAqi73Q5VBCEDwWAQdbFYoCrR6/VQ70ZEEDLgdDpR6/U6qhLNZhPVbrejCsFz4SnH45EYDIaniVgoFDDOEvEVhO+B8XiMG9w3yefzpNVq4QkxGo1SbLlc8hliCBtg0GQkNNOlzf5tiUSCnM9nPlKcl8vx7XbD/5odtc1mAy6XCzweD8RiMT7iNb7vgd9tYL/fQzabhXA4DDqdDjQajWqjxQji8TgUi0W+igosBx7BjhgLv9PY8aR1hK/4mIcGWE2/L0JfO2Q0GpHL5cKjzzkcDqTf7xOHw4HztVotjzxGZoDVcqvVipPVyq8a9ArHdcrlMu+RIzPQaDRw0qtX6iPutyf7GkrIkpA+sVBZIr0L/RFgs9lgPp/DdrvlvT+RGZjNZqh+vx/1XSwWC6pSKf9eRDIDPp8PGz3DvOc91Nb7FqMPGwD4C5AZ9NlJwkUPAAAAAElFTkSuQmCC'},
  {name: "ai", path: "/ai", svg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACoUlEQVR4AdSWPa9MYRSFh4aGBLmNRCchEZ1EoUHjI0REIhG1KGnc6LiVxE8QN1flO2hVlBp+gI5GcWs1z3Ny9syemT1zz5khQdaavd+997veNcc5Z+72Qb9/DxmXhBL2ZNmsin0N3EFEEkrYk2WzKvY1UGksVfunDdznqz2FHxJJG+RazpsmH7mmhlqUpzHrCrjhHuPX4MlE0ga5lvOmyUeuqaGWmrTGURlw0A0fGb0BTy1JNdRSU23kRqgMHG3bn4iPoZuXoRpqITUIbfOGlYG9TWcweN/GPxFCK7SHmpWBYXNGcpB6/B+bsxzDVVZB0vlYxMAtJOMuv00+iSsUXsBO0MAGk78S/XYsS+yiegkGLpPshl2hdj5rQwObXXczdwEegK/hW7gfaoKwEDY1sMrWbYne8SxLxLd/SfcVFH0MqJ3PWtWAIl14iCENfCN6+DPid3gWHoELoY+Bc5ywEz6HAa/EDhZ9rgLjI/QxcLHddpwYT8ExcuFVMPamBlbY5d0ZZDkFX8en22rMRbR8go8zsAtin3FFA+vsim9ktEFpDF5+C77XNZNpzV7MmM+i2p4RXNfAF6a9OzMpDbGH7DwUvtfznLk1e16BfSZz6HzmZw34C5W/0eR+D/cu986f7MXa3mEWXa5CPmtNA+ybi3d0b0IPIZSw54wvp3JgVrGLgZ9sfgQ9hFDCnjPO+pb0x8hXbjmci10M5PkuuWaCW85XBn60u6qf2rbVO4RWaA8FKgNf2+514gPoo7MM1VALqUFomzesDPhUrNH10LvEeGYXjWqopabaSI5QGbDroBvesMjPLcsGuZbzpslHrqmhlpq0xjHLgFNu8K+b/Nxal7mWc3sy19RQy/oU5xmYGv4bhf/OwBOugiSUsCeHza2S3wAAAP//bopTggAAAAZJREFUAwBisqK9yHZvwgAAAABJRU5ErkJggg=='},
  {name: "login", path: "/login", svg: ''}
]

const menuNameList = ["home","edit","file", "ai"];

function findByMenu(menu) {
  for(let o of totalMenus) {
    if(o.name === menu) {
      return o;
    }
  }
  return totalMenus[0];
}

function findByPath(path) {
  for(let o of totalMenus) {
    if(o.path === path) {
      return o;
    }
  }
  return totalMenus[0];
}

function findMenuByPath(path) {
  for(let o of totalMenus) {
    if(o.path === path) {
      return o.name;
    }
  }
  return "home";
}

function findPathByMenu(menu) {
  for(let o of totalMenus) {
    if(o.name === menu) {
      return o.path;
    }
  }
  return "/home";
}

function getInitData() {
  let menuList = [];
  for(let name of menuNameList) {
    menuList.push(findByMenu(name))
  }
  return {menuList};
}

export default {
  name: "SectionBar",
  components: {
    SelectOption
  },
  data() {
    let {menuList} = getInitData();
    let current = findMenuByPath(window.location.pathname);
    if(current === 'login') {
      current = 'home'
    }
    return {
      logined: false,
      curMenu: current,
      hoverMenu: "",
      guideList: menuList,
    };
  },
  async created() {
  },
  async updated() {
  },
  mounted() {
  },
  methods: {
    mouseover(menuItm) {
      this.hoverMenu = menuItm.name;
    },
    mouseout() {
      this.hoverMenu = "";
    },
    selectMenu(menuItm) {
      let path = this.$router.currentRoute.path;
      this.curMenu = menuItm.name;
      if(menuItm.path === path) {
        return;
      }
      this.$router.push(menuItm.path);
    }
  },
};
</script>

<style lang="scss">
.SectionBar {
  margin-bottom: 4px;
  min-height: 100%;
  max-height: 100%;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    border: 1px solid #cecece;
    border-radius: 8px;
    padding: 5px;
    width: 45px;
    height: 45px;
  }
  span {
    margin-left: 4px;
  }
}

.guideList {
  height: 60%;
  padding: 0px;
}
.guideList > li {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  color: #999;
  cursor: pointer;
}

.background {
  background: #f1f9ff;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  color: #313131;
  font-size: 20px;
  margin-top: 15px;

  img {
    border-radius: 10px;
    height: 30px;
    width: 30px;
    margin-right: 5px;
  }

  .simple-options-area {
    width: 40px;
  }
}

.login-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  color: #2071fd;
  font-size: 20px;
  margin-top: 30px;
  cursor: pointer;

  :hover {
    color:#88b3fe
  }
}
</style>
