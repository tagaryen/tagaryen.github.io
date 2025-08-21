export default function codeCopy() {
  return {
    viewerEffect({ markdownBody }) {
      markdownBody.style.fontSize = "14px";
      markdownBody.style.lineHeight = "1.5";
      const codes = markdownBody.querySelectorAll('code')
      codes.forEach((code, key) => {
        if(!code.className || code.className === '') {
          code.style.backgroundColor = '#e6e6e6';
          code.style.color = 'rgb(131, 131, 131)';
          return ;
        }
        let lan = code.className.replace('language-', '').toUpperCase()
        const parentNode = code.parentNode
        parentNode.removeChild(code)
        const fatherBox = document.createElement('div')
        fatherBox.innerHTML =
          '<div class="code-action" style="display:flex;justify-content: space-between;background-color: #e6e6e6; border-top-left-radius:5px; border-top-right-radius:5px; border-bottom: 1px solid #aeaeae;padding-top:2px;padding-bottom:2px">' + 
            '<div style="text-align: center;width: 52px;margin-left:5px;">'+lan+'</div>' +
            '<div style="text-align: center;width: 52px;margin-right:5px;color:#fff;background-color:#4caf50;border-radius:4px;cursor:pointer;right:0px;" id="code-btn-copy-'+key+'">Copy</div>' +
          '</div>' +
          '<div class="code-block" style="background-color: #e6e6e6; border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding:10px;overflow-x:auto;line-height:1.2;scrollbar-width:thin">' +
            '<code id="code-content-'+key+'" class="code-content-'+code.className+'" style="background-color: #e6e6e6;color:rgb(131, 131, 131);font-size:13px;padding:0px;">' +
              code.innerHTML +
            '</code>' +
          '</div>'
        parentNode.appendChild(fatherBox)
        let btn = document.getElementById('code-btn-copy-' + key)
        btn.addEventListener('click', () => {
          navigator.clipboard.writeText(code.innerText)
          btn.innerHTML = 'Copied';
          setTimeout(() => {
            btn.innerHTML = "Copy"
          }, 1000);
        })
        btn.addEventListener('mouseout', () => {
          btn.style.backgroundColor = "#4caf50";
        });
        btn.addEventListener('mouseover', () => {
          btn.style.backgroundColor = "#3e8e41";
        });
      })
    },
  }
}