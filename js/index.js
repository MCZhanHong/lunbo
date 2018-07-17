console.log('图片无缝轮播');
var toggleImg=function(){
    // dom节点
    var domImgLunbo,domImgNum,domToggleBtn,domPrev,domNext,domImg;
    // 每张图片宽度
    var imgWidth,totalImgsWidth;
    // 图片轮播初始化
    var init=function(){
        // 获取dom节点
        domImgLunbo=document.getElementById('img-lunbo');
        domImg=document.getElementById('img-lunbo').getElementsByTagName('li');
        domImgNum=document.getElementById('img-num');
        domToggleBtn=document.getElementById('toggle-btn');
        domPrev=document.getElementsByClassName('prev')[0];
        domNext=document.getElementsByClassName('next')[0];
        imgWidth=domImg[0].style.width;
        totalImgsWidth=imgWidth*domImg.length;
    };
    return{
    };
}();