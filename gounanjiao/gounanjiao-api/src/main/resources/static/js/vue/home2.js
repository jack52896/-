 function showProductsAsideCategorys(cid){
    $("div.eachCategory[cid="+cid+"]").css("background-color","white");
    $("div.eachCategory[cid="+cid+"] a").css("color","#87CEFA");
    $("div.productsAsideCategorys[cid="+cid+"]").show();
}

    function hideProductsAsideCategorys(cid){
    $("div.eachCategory[cid="+cid+"]").css("background-color","#e2e2e3");
    $("div.eachCategory[cid="+cid+"] a").css("color","#000");
    $("div.productsAsideCategorys[cid="+cid+"]").hide();
}

    function homePageRegisterListeners(){
    $("div.eachCategory").mouseenter(function(){
        var cid = $(this).attr("cid");
        showProductsAsideCategorys(cid);
    });
    $("div.eachCategory").mouseleave(function(){
    var cid = $(this).attr("cid");
    hideProductsAsideCategorys(cid);
});
    $("div.productsAsideCategorys").mouseenter(function(){
    var cid = $(this).attr("cid");
    showProductsAsideCategorys(cid);
});
    $("div.productsAsideCategorys").mouseleave(function(){
    var cid = $(this).attr("cid");
    hideProductsAsideCategorys(cid);
});

    $("div.rightMenu span").mouseenter(function(){
    var left = $(this).position().left;
    var top = $(this).position().top;
    var width = $(this).css("width");
    var destLeft = parseInt(left) + parseInt(width)/2;
    $("img#catear").css("left",destLeft);
    $("img#catear").css("top",top-20);
    $("img#catear").fadeIn(500);

});
    $("div.rightMenu span").mouseleave(function(){
    $("img#catear").hide();
});

    var left = $("div#carousel-of-product").offset().left;
    $("div.categoryMenu").css("left",left-20);
    $("div.categoryWithCarousel div.head").css("margin-left",left);
    $("div.productsAsideCategorys").css("left",left-20);

    $("div.productsAsideCategorys div.row a").each(function(){
    var v = Math.round(Math.random() *6);
    if(v == 1)
    $(this).css("color","#87CEFA");
});
}

    $(function(){

    var data4Vue = {
    uri:'forehome',
    categories: []
};
    //ViewModel
    var mvue = new Vue({
    el: '#workingArea',
    data: {
    uri:'forehome',
    categories:[]
},
    mounted:function(){ //mounted　表示这个 Vue 对象加载成功了
    linkDefaultActions();
    this.load();
},
    methods: {
    load:function(){
    var url =  this.uri;
    axios.get(url).then(function(response) {
    console.log(response);
    mvue.categories = response.data;
    mvue.$nextTick(function(){
    //要等渲染结束之后，才来进行监听，否则他们都没有被创建出来，监听也没有意义呀
    homePageRegisterListeners();
})
});
}
},
    filters:{
    subTitleFilter:function(value) {
    if (!value) return ''; //如果为空，则返回空字符串
    return value.split(" ")[0]; //根据空格拆分，并且只获取数组第一个值
}
}
});


});
