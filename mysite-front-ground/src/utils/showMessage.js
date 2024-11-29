/**
 * @param {String} content 消息内容
 * @param {String} type 图标（消息）类型 info  success warn error
 * @param {Number} duration 消息消失时间
 * @param {HTMLElement} container 需要放入的父容器
 */

import getComponentRootDom from "./getCompRootDom";
import Icon from '@/components/Icon';
import styles from './message.module.less';
export default function showMessage(content, type = 'info', duration = 2000, container) {
  const div = document.createElement('div');
  const iconDom = getComponentRootDom(Icon, { type });
  iconDom.style.marginRight = '10px';
  iconDom.style.fontSize = '26px';
  div.innerHTML = `${iconDom.outerHTML}<span class='${styles.content}'>${content}</span>`;
  div.classList.add(styles.message);
  div.classList.add(styles[`message-${type}`]);
  if (!container) {
    container = document.body;
  }
  // console.log(container);
  container.appendChild(div);

  // 强行渲染一次
  div.clientHeight;

  div.style.transform = 'translate(-50%,-50%)';
  div.style.opacity = 1;

  // 2s后消失
  setTimeout(() => {
    div.style.transform = 'translate(-50%,-50%) translateY(-15px)';
    div.style.opacity = 0;
    div.addEventListener('transitionend', function() {
      this.remove();
    }, { once: true })
  }, duration)

  // 显示消息来源
  // console.log('message_utils_content', content)
}