import Mock from 'mockjs'
/**
 * 所有的静态资源地址均需要导入
 */
import headPortUrl from "@/assets/head_port.png"; //头像地址
import weQrUrl from "@/assets/wechat_qrcode.jpg";
import qqQrUrl from "@/assets/qq_qrcode.jpg";
import faviconUrl from "@/assets/favicon3.webp";

export default Mock.mock('/api/setting','get',{
    code:0,
    msg:'',
    data:{
        avatar: headPortUrl, //个人空间的头像
        siteTitle: "云梦的个人空间", //个人空间的标题
        github: "https://github.com/DuYi-Edu", //空间主人的github地址
        qq: "1665422775", //空间主人的qq号
        qqQrCode:  qqQrUrl, //空间主人的qq二维码
        weixin: "WX1665422775", //空间主人的微信
        weixinQrCode:weQrUrl, //空间主人的微信二维码
        mail: "18919877413@163.com", //空间主人的邮箱
        icp: "黑ICP备17001719号", //空间主人的备案号
        githubName: "LC-github", //空间主人的github名称
        favicon: faviconUrl, //网站的favicon地址
    }
})