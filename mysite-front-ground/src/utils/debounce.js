export default function (fn,wait=200){
    var timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(fn,wait);
    }
}