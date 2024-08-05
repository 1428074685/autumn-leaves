
/*砖石图片瀑布流 */
window.onload = function() {
    imgLocation('container', 'neiimgbox')
  }
  
  // 获取到当前有多少张图片要摆放
  function imgLocation(parent, content) {
    // 将containerd下所有的内容全部取出
    var cparent = document.getElementById(parent)  //获取container盒子的标签
    var ccontent = getChildElemnt(cparent, content)//图片时放在container盒子里的neiimgbox盒子里的，因此我们还需要定义一个函数getChildElemnt（）获取出neiimgbox里的图片
    
    var imgWidth = ccontent[0].offsetWidth//获取css中我们给每张图片设置的固定宽度
    var num = Math.floor(document.documentElement.clientWidth / imgWidth) //获取浏览器body的宽度计算最多能放几张我们的图片
    cparent.style.cssText = `width: ${imgWidth * num} px`
  
    //摆放图片
    var neiimgboxHeightArr = [] 
    for (var i = 0; i < ccontent.length; i++) { 
      if (i < num) {  //我们先将第一行摆满
        neiimgboxHeightArr[i] = ccontent[i].offsetHeight //这里我们通过neiimgboxHeightArr[]数组存放每列的高度
      } else { //剩下的图片我们依次次优先选择摆在高度最低的一列后面
        var minHeight = Math.min.apply(null, neiimgboxHeightArr) //通过将Math.min()中求最小值的方法应用到数组中，求出高度最低的列
        var minIndex = getMinHeightLocation(neiimgboxHeightArr, minHeight) //确定了高度最低的列后我们就差求出列的位置了,我们通过编写一个函数实现

        //最后将我们的图片相对于container盒子进行定位放在每一列下就可以啦
        ccontent[i].style.position = 'absolute'
        ccontent[i].style.top = minHeight +'px'
        ccontent[i].style.left =ccontent[minIndex].offsetLeft + 'px'
        //最后不忘记跟新每一列的高度哦
        neiimgboxHeightArr[minIndex] =neiimgboxHeightArr[minIndex] + ccontent[i].offsetHeight

      }
    }
    // console.log(neiimgboxHeightArr);
  }
  
  
  function getChildElemnt(parent, content) {
    const contentArr = []
    const allContent = parent.getElementsByTagName('*')//通过内置函数getElementsByTagName()将container中的所有元素取出来
    // console.log(allContent);
    for (var i = 0; i < allContent.length; i++) {//但是container中所有的元素中我们只需要的是所有的img，为此我们写个for循环将所用img筛选出来存放在一个数组中
      if (allContent[i].className == content) {
        contentArr.push(allContent[i])
      }
    }
    // console.log(contentArr);
    return contentArr
  }
  //获取列最高度最小列的位置下标函数
  function getMinHeightLocation(neiimgboxHeightArr, minHeight) {
    for (var i in neiimgboxHeightArr) {
      if (neiimgboxHeightArr[i] === minHeight) {
        return i
      }
    }
  }


  /*顶置按钮 */
  var toTop = document.querySelector("#toTop");    
  toTop.style.display = "none";// 一开始div隐藏  
  window.addEventListener("scroll", scrollHandler);// 然后给window加事件监听，滚动条大于某个值时，div出现
  function scrollHandler(e) {        
      var distanceY = document.documentElement.scrollTop || document.body.scrollTop;//兼容写法，获取当前页面y轴的滚动距离
      if (distanceY > 50) {
          toTop.style.display = "block";
      } else {
          toTop.style.display = "none";
      }
  }
  // 然后给div添加点击事件，用计时器interval来循环，步长为5，scrollTop依次减5，时间每50ms循环一次，直到scrollTop为0清除计时器
  toTop.addEventListener("click", clickHandler);
  function clickHandler(e) {
      let timer = setInterval(function () {
          var distanceY = document.documentElement.scrollTop || document.body.scrollTop;//兼容
          if (distanceY == 0){
              clearInterval(timer);
              return;
          } 
          var speed = Math.ceil(distanceY/16);//speed这个值从高变低，那么scrollTop就减得从快到慢，上回到顶部的速度就先快后慢
          document.documentElement.scrollTop=distanceY-speed;
          // document.documentElement.scrollTop=distanceY-5;//如果给速度一个确定的值，那回到顶部的就匀速
      }, 16);
  }




  