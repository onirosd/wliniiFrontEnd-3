import Vue from "vue";

export const notify = (status, title, text) => {
    Vue.notify({
        group: 'w-notify',
        type: status,
        title: title ? title : '',
        text: text ? text : ''
    });
}

export const editorToolbar = [
    [{ font: [] }],
  
    [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  
    // [{ size: ["small", false, "large", "huge"] }],
  
    ["bold", "italic", "underline", "strike"],
  
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" }
    ],
  
    // [{ header: 1 }, { header: 2 }],
  
    ["blockquote", "code-block"],
  
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  
    [{ script: "sub" }, { script: "super" }],
  
    [{ indent: "-1" }, { indent: "+1" }],
  
    [{ color: [] }, { background: [] }],
  
    // ["link", "image", "video", "formula"],
  
    [{ direction: "rtl" }],
    ["clean"]
  ];

const currencySymbols = ['S', '$', '€'];
export const currencySymbol = (index) => {
  index = index ? index - 1 : 0;

  return currencySymbols[index];
}
export const currencySymbolByString = (str) => {
  if(str == 'Soles') return currencySymbols[0];
  if(str == 'Dolares') return currencySymbols[1];
  if(str == 'Euros') return currencySymbols[2];

  return currencySymbols[0];
}