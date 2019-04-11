(function(){
  'use strict';

  let theImages = [{
    src: "../../databases/item/1.jpg",
    width: "200",
    height: "200"
  }, {
    src: "../../databases/item/2.jpg",
    width: "200",
    height: "200"
  }, {
    src: "../../databases/item/3.jpg",
    width: "200",
    height: "200"
  }];
  
  document.getElementById("jsstyle").onclick = async function (){
    let preBuffer = [];
    for (let i = 0, j = theImages.length; i < j; i++) {
      preBuffer[i] = new Image();
      preBuffer[i].src = theImages[i].src;
      preBuffer[i].width = theImages[i].width;
      preBuffer[i].height = theImages[i].height;
    }
    
    // create random image number
    function getRandomInt(min, max) {
        //  return Math.floor(Math.random() * (max - min + 1)) + min;
        let imn = Math.floor(Math.random() * (max - min + 1)) + min;
        return preBuffer[imn];
    }  

    // 0 is first image,   preBuffer.length - 1) is  last image
      
    let newImage = getRandomInt(0, preBuffer.length - 1);
    
    // remove the previous images
    let images = document.getElementsByTagName('img');
    let l = images.length;
    for (let p = 0; p < l; p++) {
        images[0].parentNode.removeChild(images[0]);
    }
    // display the image  
    document.body.appendChild(newImage);
  };

})();