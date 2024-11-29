var routerTitle = '', siteTitle = ''

function setRouterTitle (title) {
  routerTitle = title;
}

function setSiteTitle (title) {
  siteTitle = title;
}

function setTitle () {
  if (routerTitle && siteTitle) {
    document.title = routerTitle + '-' + siteTitle;
  } else if (routerTitle && !siteTitle) {
    document.title = routerTitle;
  } else if (!routerTitle && siteTitle) {
    document.title = siteTitle;
  } else {
    document.title = '加载中';
  }
}

export default {
  setRouterTitle,
  setSiteTitle,
  setTitle,
}