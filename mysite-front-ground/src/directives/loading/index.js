import loadingUrl from '@/assets/loading.svg';
import styles from './loading.module.less';

function getLoadingImg () {
  const img = document.createElement('img');
  img.dataset.class = 'loading';
  img.src = loadingUrl;
  img.classList.add(styles.loading);
  return img;
}

function insertImg (el) {
  const img = getLoadingImg();
  el.appendChild(img);
}

export default function (el, binding) {
  const curImg = el.querySelector('img[data-class=loading]');
  if (!binding.value) {
    if (!curImg) {
      insertImg(el);
    }
  } else {
    if (curImg) {
      el.removeChild(curImg);
    }
  }
};