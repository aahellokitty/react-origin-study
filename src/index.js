// 以树的形式模拟 react.reacteElement函数
// 输出一个类似如下的代码
// {
//   "type": "div",
//   "props": {
//       "style": "background: salmon",
//       },
//       "children": [
//           {
//               "type": "h1",
//               "props": {
//                   "children": [
//                       {
//                           "type": "TEXT_ELEMENT",
//                           "props": {
//                               "nodeValue": "Hello World",
//                               "children": [] 简化一下
//                           }
//                       }
//                   ]
//               }
//           },
//           {
//               "type": "h2",
//               "props": {
//                   "style": "text-align:right",
//                   "children": [
//                       {
//                           "type": "TEXT_ELEMENT",
//                           "props": {
//                               "nodeValue": "from Didact",
//                               "children": []
//                           }
//                       }
//                   ]
//               }
//           }
//       ]
//   }
// }


function createElement(type, props, ...children) { // children为数组
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child) // 递归运行
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
const Didact = {
  createElement,
  render
};

function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ?
  document.createTextNode("") :
  document.createElement(element.type);
  
  const isNotChildren = (x) => x !== 'children';
  Object.keys(element.props).filter(isNotChildren)?.forEach((name) => { 
    dom[name] = element.props[name] // 将元素内容赋值给元素，比如 style='xx'
  })
  element.props.children.forEach(child => render(child, dom))// 递归
  container.appendChild(dom) // 最里层元素 --> 父元素 ——> ...... ——> 最外层元素root
}
/** @jsx Didact.createElement */ // 表示用自定义而非react内部的
// 方法1
// const element = Didact.createElement(
//   'div',
//   { style: 'background: salmon'},
//   Didact.createElement('h1', null, 'Hello World'),
//   Didact.createElement('h2', null, 'from Didact'),
// )

// 方法2
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from Didact</h2>
  </div>
);
const container = document.getElementById("root"); //根元素在html中
Didact.render(element, container);