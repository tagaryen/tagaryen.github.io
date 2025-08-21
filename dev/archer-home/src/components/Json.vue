<template>
  <div class="Json">
    <div class="json-head-bar">
      <div class="json-head-btn" @click="jsonFormat">格式化</div>
      <div class="json-head-title">JSON美化工具</div>
      <div class="json-head-btn" @click="jsonStringify">压缩</div>
    </div>
    <div class="json-text-area">
      <textarea 
      v-model="jsonVal" placeholder="在此输入json字符串..."></textarea>
    </div>
  </div>
</template>

<script>
  function beautifyMultipleJSON(input) {
    try {
      return [JSON.stringify(JSON.parse(jsonString), null, 2)];
    } catch(e) {}
    const results = [];
    let pos = 0, spos = 0;
    const maxAttempts = 1000; // 防止无限循环
    let attempt = 0;
  
    while (pos < input.length && attempt < maxAttempts) {
      attempt++;
      spos = pos;
      // 跳过非JSON开头的字符
      while (pos < input.length && !['{', '['].includes(input[pos])) {
        pos++;
      }
      if(spos < pos) {
        let str = input.substring(spos, pos).trim();
        if(str !== '') {
            results.push(str);
        }
      }
      
      if (pos >= input.length) break;
  
      let start = pos;
      let depth = 0;
      let inString = false;
      let escape = false;
      let foundValidJSON = false;
  
      // 寻找完整的JSON对象
      for (let i = pos; i < input.length; i++) {
        const char = input[i];
  
        if (inString) {
          if (escape) {
            escape = false;
          } else if (char === '\\') {
            escape = true;
          } else if (char === '"') {
            inString = false;
          }
        } else {
          if (char === '"') {
            inString = true;
          } else if (char === '{' || char === '[') {
            depth++;
          } else if (char === '}' || char === ']') {
            depth--;
            
            // 成功找到一个完整的JSON对象
            if (depth === 0) {
              const jsonString = input.substring(start, i + 1);
              try {
                const parsed = JSON.parse(jsonString);
                results.push(JSON.stringify(parsed, null, 2));
                pos = i + 1;
                foundValidJSON = true;
                break;
              } catch (e) {
                // 无效JSON，继续搜索
              }
            }
          }
        }
      }
  
      // 如果找不到完整的JSON，尝试小范围解析
      if (!foundValidJSON) {
        let jsonLength = 10; // 从小片段开始尝试
        while (jsonLength <= Math.min(200, input.length - start)) {
          try {
            const testJSON = input.substring(start, start + jsonLength);
            JSON.parse(testJSON);
            // 如果解析成功，添加美化后的结果
            results.push(JSON.stringify(JSON.parse(testJSON), null, 2));
            pos = start + jsonLength;
            foundValidJSON = true;
            break;
          } catch (e) {
            jsonLength++;
          }
        }
        
        // 如果仍然找不到有效JSON，添加原始字符并前进
        if (!foundValidJSON) {
          pos = start + 1;
        }
      }
    }
  
    // 添加剩余的非JSON文本
    if (pos < input.length) {
      results.push(input.substring(pos));
    }
  
    return results;
  }
  export default {
    components: {},
    data(){
      return {
        jsonVal: "",
        jsonResults: [],
        btnHover: false
      }
    },
    mounted(){
    },
    methods: {
      jsonFormat() {
        if(this.jsonVal !== '') {
          this.jsonResults = beautifyMultipleJSON(this.jsonVal);
          this.jsonVal = this.jsonResults.join("\n");
        }
      },
      jsonStringify() {
        if(this.jsonResults.length > 0) {
          let c = "";
          for(let o of this.jsonResults) {
            try {
              c += JSON.stringify(JSON.parse(o));
            }catch(e) {
              c += o;
            }
          }
          this.jsonVal = c;
          this.jsonResults = [];
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Json{
    margin: 5px;
    background-color: #ffffff;
    background-size: 100% 100%;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
    display: block;
    padding: 10px;

    
    .json-head-bar{
      display: flex;
      justify-content: space-between;
      text-align: center;
      height: 36px;
      width: 100%;

      .json-head-btn {
        background-color: rgb(117, 149, 253);
        color: rgb(255, 255, 255);
        height: 30px;
        width: 64px;
        border-radius: 4px;
        text-align: center;
      }
      .json-head-btn:hover {
        background-color: rgb(161, 182, 252);
        cursor: pointer;
      }
      .json-head-title {
        height: 30px;
        font-weight: 800;
        font-size: 18px;
        text-align: center;
      }
    }

    .json-text-area {
      height: calc(100% - 40px);
      width: 100%;

      textarea {
        height: calc(100% - 34px);
        width: calc(100% - 34px);
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 15px;
        font-size: 16px;
        font-family:Arial, Helvetica, sans-serif;
        resize: none;
        transition: border-color 0.3s;
      }
      
      textarea:focus {
        outline: none;
        border-color: #8f94fb;
      }
    }

  }

</style>
  