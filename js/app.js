'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let products = [];

function productsImg(product){
    this.product = product.split('.');
    this.source = 'images/' + product;
    this.click = 0;
    this.views =0;
    products.push(this);
}

let productImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg','water-can.jpg', 'wine-glass.jpg'];
for (let i=0; i<productImage.length; i++){
    new productsImg(productImage[i]);
}

function loadImage() {
    return Math.floor(Math.random() * products.length);
}

let lImg = document.getElementById('leftImg');
let mImg = document.getElementById('middleImg');
let rImg = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

function renderImage(){
    leftImgIndex = loadImage();
    middleImgIndex = loadImage();
    rightImgIndex = loadImage();

    while (leftImgIndex === middleImgIndex){
        middleImgIndex = loadImage();
    }
    while (middleImgIndex === rightImgIndex){
        rightImgIndex = loadImage();
    }

    lImg.setAttribute('src', products[leftImgIndex].source);
    lImg.setAttribute('title', products[leftImgIndex].source); 
    products[leftImgIndex].views++;

    mImg.setAttribute('src', products[middleImgIndex].source);
    mImg.setAttribute('title', products[middleImgIndex].source); 
    products[middleImgIndex].views++; 

    rImg.setAttribute('src', products[rightImgIndex].source);
    rImg.setAttribute('title', products[rightImgIndex].source); 
    products[rightImgIndex].views++; 
    attemptsEl.textContent= attempts;
}
renderImage();

lImg.addEventListener('click', controlClicks);
mImg.addEventListener('click', controlClicks);
rImg.addEventListener('click', controlClicks);

function controlClicks(event){
    attempts++;
    if (attempts <= maxAttempts){
        console.log(event.target.id)
        if (event.target.id === 'leftImg'){
            products[leftImgIndex].click++;    
        } else if (event.target.id === 'middleImg'){
            products[middleImgIndex].click++;   
        } else if (event.target.id === 'rightImg'){
            products[rightImgIndex].click++;   
        }
        renderImage();
    }  
         
    }
    let ulEl = document.getElementById('results'); 
    function showResults(){
        let button = document.getElementById('buttonEl');
        ulEl.appendChild(button);
        let liEl;
        for (let i=0; i<products.length; i++){
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${products[i].product} had ${products[i].click} votes, and was seen ${products[i].views} times`
        }
        lImg.removeEventListener('click', controlClicks);
        mImg.removeEventListener('click', controlClicks);
        rImg.removeEventListener('click', controlClicks);

    }
