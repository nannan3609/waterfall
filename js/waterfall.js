/*** Created by nannan on 16-4-23.*/
$(function () {
    imgLocation();
    //确定图片摆放的位置
    var dataImg = {"data": [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"}, {"src": "6.jpg"}, {"src": "7.jpg"}, {"src": "8.jpg"}, {"src": "9.jpg"}, {"src": "10.jpg"}]};
    //加载的资源
    $(window).scroll(function () {
        if (scrollside()) {
            $.each(dataImg.data, function (index, value) {
                var box = $("<div>").addClass("box").appendTo($("#container"));
                //创建class为box的div，放到div容器中
                var content = $("<div>").addClass("content").appendTo(box);
                //创建class为content的div，放到class为box的div中
                $("<img>").attr("src", "./waterfallImage/" + $(value).attr("src")).appendTo(content);
                //创建img标签，放到class为content的div中
            });
            imgLocation();
        }
    });
    //监控鼠标滚动情况,查看是否满足加载要求
    $(window).resize(function () {
        imgLocation();
    });
    //当窗口的大小发生变化时重新进行定位
});

function scrollside() {
    var box = $('.box');
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    //最后一张图中心到顶部的距离
    var windowHeight = $(window).height();
    //窗口高度
    var scrollHeight = $(window).scrollTop();
    //获得滚动条当前偏移量
    return (lastboxHeight < windowHeight + scrollHeight);
    //当鼠标要滚动到最后一张图的中心时加载下面的图
}
//到最后一张再加载

function imgLocation() {
    var box = $('.box');
    var boxWidth = box.eq(0).width();
    //获得每张图片的宽度
    var num = Math.floor($(window).width() / boxWidth);
    //每一行能放的图片数量，取整
    var boxArr = [];
    //用于存放每张图片的高度的数组
    box.each(function (index, value) {
        //index为序号，value为具体内容
        var boxHeight = box.eq(index).height();
        if (index < num) {
            boxArr[index] = boxHeight;
            $(value).css({
                "position": "absolute",
                "top": "0px",
                "left": boxWidth * index
            });
            //对第一行的元素进行一个定位
        }//第一行
        else {
            var minboxHeight = Math.min.apply(null, boxArr);
            //找到数组中高度最小的
            var minboxIndex = $.inArray(minboxHeight, boxArr);
            //找到最小值对应的序号
            $(value).css({
                "position": "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left
            });
            //把元素摆放到相应位置
            boxArr[minboxIndex] += box.eq(index).height();
            //最小高度此时要更新为加上现在加上去的高度
        }
    });
}