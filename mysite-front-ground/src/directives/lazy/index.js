import {debounce} from '@/utils';
import defaultImg from '@/assets/default.gif';

let imgs = [];

function setImg(img){
    // 给所有图片加上初始地址
    img.dom.src = defaultImg;
    // 处理当前视口下图片
    const bottom = document.documentElement.clientHeight;
    const top = -img.dom.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    if(rect.top > top && rect.top < bottom){
        img.dom.src = img.src;
        imgs = imgs.filter(i=>i !== img);
    }
}

function setImgs(imgs){
    for (const img of imgs) {
        setImg(img);
    }
}

function handleScroll(){
    // console.log(imgs);
    setImgs(imgs);
}

export default {
    inserted(el,binding){
        // 将所有图片存储在数组中
        imgs.push({
            dom:el,
            src:binding.value,
        });
        // 监听滚轮事件：
        window.eventBus.$on('mainScroll',debounce(handleScroll,100));
        setImgs(imgs);
        // console.log(el,'inserted');
    },
    unbind(el){
        // console.log(el,'unbind')
        imgs = imgs.filter(img => img.dom !== el);
    },
}

