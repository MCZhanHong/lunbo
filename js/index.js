console.log('图片无缝轮播');
//图片地址，模拟后台数据
var imgSrc = ['./images/Australia.png',
    './images/Brazil.png',
    './images/Colombia.png',
    './images/Egypt.png',
    './images/England.png',
    './images/France.png'];
// 图片无缝轮播模块
var toggleImg = function () {
    // dom节点
    var domImgLunbo, domImgNum, domToggleBtn, domPrev, domNext, domImg;
    // 每张图片宽度
    var imgWidth, totalImgsWidth;
    // 定时器
    var toggleTimer;
    // 图片下标
    var index;
    // 图片轮播初始化
    var init = function () {
        // 获取dom节点
        domImgLunbo = document.getElementById('img-lunbo');
        domImgNum = document.getElementById('img-num');
        domToggleBtn = document.getElementById('toggle-btn');
        domPrev = document.getElementById('prev');
        domNext = document.getElementById('next');
        createNode(imgSrc);
        domImg = document.getElementById('img-lunbo').getElementsByTagName('li');
        // 获取图片的宽度
        imgWidth = domImg[0].offsetWidth;
        totalImgsWidth = imgWidth * domImg.length;//ul总宽度
        domImgLunbo.style.width=totalImgsWidth+'px';
        domImgLunbo.style.left=-imgWidth+'px';//初始位置
        index=0;//范围0-5，一共6张图片
        // imgToggle();
    };
    // 创建轮播所需的图片节点
    var createNode=function(src){
        domImgLunbo.innerHTML='';
        domImgNum.innerHTML='';//清空容器内容
        domImgLunbo.innerHTML+='<li><a href=""><img src="'+
        src[src.length-1]+'" alt=""></a></li>';
        for(var i=0;i<src.length;i++){
            domImgLunbo.innerHTML+='<li><a href=""><img src="'+
            src[i]+'" alt=""></a></li>';
        }
        domImgLunbo.innerHTML+='<li><a href=""><img src="'+
        src[0]+'" alt=""></a></li>';
        // 创建下标
        domImgNum.innerHTML+='<li><a class="current" href=""></a></li>';
        for(var i=1;i<src.length;i++){
            domImgNum.innerHTML+='<li><a href=""></a></li>';
        }
    }
    // 图片轮播定时器
    var imgToggle=function(){
        if(toggleTimer){
            clearInterval(toggleTimer);
        }else{
            toggleTimer=setInterval(function(){
                if(index>=0&&index<=5){
                    domImgLunbo.style.left=-imgWidth*(index+1)+'px';
                    index++;
                }else{
                    index=0;
                    domImgLunbo.style.left=-imgWidth*(index+1)+'px';
                }
                console.log(domImgLunbo.style.left);
            },toggleTime*1000);
        }
    }
    return {
        init:init
    };
}();
toggleImg.init();