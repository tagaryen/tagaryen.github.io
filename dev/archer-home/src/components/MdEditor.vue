<template>
  <div class="MdEditor">
    <Editor
      class="bytemd"
      ref="editor"
      :mode="mode"
      :value="value"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>

<script>
import "bytemd/dist/index.min.css";
import { Editor } from "@bytemd/vue";
import codeCopy from '@/util/mdcopypl'

const plugins = [
  codeCopy()
];

export default {
  name: "MdEditor",
  components: { Editor },
  data() {
    let md = localStorage.getItem("markdown-text");
    if(!md) {
      md = `# 在此处编辑`
    }
    return {
      mode: "auto",
      value: md,
      plugins: plugins,
    };
  },
  mounted() {
  },
  methods: {
    handleChange(v) {
      this.value = v;
      this.saveMarkdown(v);
    },
    onEditorFocus() {
      this.saveMarkdown();
    },
    onEditorBlur() {
      this.saveMarkdown();
    },
    onEditorChange() {
      this.saveMarkdown();
    },
    onEditorStateChange() {
      this.saveMarkdown();
    },
    setValue(val) {
      return this.$refs.editor.value = val;
    },
    getValue() {
      return this.$refs.editor.value;
    },
    saveMarkdown(val) {
      let v = val ? val : this.getValue();
      localStorage.setItem("markdown-text", v);
    },
    download(fileName, content) {
      if (content) {
        const aTag = document.createElement("a");
        const blob = new Blob([content]);
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.WorkingBox {
  position: relative;
  margin: 8px;
  background-color: #ffffff;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  display: flex;

  ::v-deep .bytemd {
    flex: 1 1;
    box-sizing: border-box;
    height: 100%;
    border: 0px;
    font-size: 14px;

    .bytemd-toolbar-right {
      display: none;
    }
    .bytemd-status-right {
      display: none;
    }
    .markdown-body {
      padding-top: 0px;
    }
  }
}
</style>
