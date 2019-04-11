(function () {
  'use strict';

  var theImages = [{
    src: "../../databases/item/1.jpg",
    width: "100",
    height: "100"
  }, {
      src: "../../databases/item/2.jpg",
      width: "100",
      height: "100"
  }, {
      src: "../../databases/item/3.jpg",
      width: "100",
      height: "100"
  }];
  document.querySelector('#jsstyle').onclick = function () {
    let newImage = "../../databases/item/3.jpg";
    document.body.appendChild(newImage);
  // var preBuffer = [];
  // for (var i = 0, j = theImages.length; i < j; i++) {
  //     preBuffer[i] = new Image();
  //     preBuffer[i].src = theImages[i].src;
  //     preBuffer[i].width = theImages[i].width;
  //     preBuffer[i].height = theImages[i].height;
  // }
 
  // // create random image number
  // function getRandomInt(min,max) {
  //   //  return Math.floor(Math.random() * (max - min + 1)) + min;
  //   imn = Math.floor(Math.random() * (max - min + 1)) + min;
  //   return preBuffer[imn];
  // }  

  // // 0 is first image,   preBuffer.length - 1) is  last image
    
  // var newImage = getRandomInt(0, preBuffer.length - 1);

  // // remove the previous images
  // var images = document.getElementsByTagName('img');
  // var l = images.length;
  // for (var p = 0; p < l; p++) {
  //     images[0].parentNode.removeChild(images[0]);
  // }
  // // display the image  
  // document.body.appendChild(newImage);
  };

})();