'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let products = [];
let productsImages = [];
let productsVotes = [];
let productsSeen = [];
let imageSet = [];


function productsImg(product){
    this.product = product.split('.')[0];
    this.source = 'images/' + product;
    this.click = 0;
    this.views =0;
    products.push(this);
    productsImages.push(this.product);
    
}
function settingProducts(){
    let results = JSON.stringify(products);
    localStorage.setItem('product',results);
    let attemptsNum = JSON.stringify(attempts);
    localStorage.setItem('attempt',attemptsNum);


}
function gettingProducts(){
    let stringProduct = localStorage.getItem('product');
    let normalProduct = JSON.parse(stringProduct);
    let stringattempt = localStorage.getItem('attempt');
    let normalattempt = JSON.parse(stringattempt);
    
    if (normalProduct !== null){
        products = normalProduct;
        
    }
    if (attempts >= maxAttempts){
        localStorage.removeItem('product'); 
        


    } if(normalattempt >= maxAttempts ){
        attempts =  0;  
        localStorage.setItem('attempt',0);

    }
    if (attempts !== null){
        attempts = normalattempt;
        attemptsEl.textContent= attempts;

    } 
    console.log(attempts);
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

    while (leftImgIndex === middleImgIndex || middleImgIndex === rightImgIndex || leftImgIndex === rightImgIndex || imageSet.includes(leftImgIndex) || imageSet.includes(middleImgIndex) || imageSet.includes(rightImgIndex)){
        middleImgIndex = loadImage();
        rightImgIndex = loadImage();
        leftImgIndex = loadImage();


    }
    imageSet = [];
    imageSet.push(leftImgIndex);
    imageSet.push(middleImgIndex);
    imageSet.push(rightImgIndex);
    
   


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

    console.log(attempts);
    if (attempts <= maxAttempts){
        console.log(event.target.id)
        if (event.target.id === 'leftImg'){
            products[leftImgIndex].click++;    
        } else if (event.target.id === 'middleImg'){
            products[middleImgIndex].click++;   
        } else if (event.target.id === 'rightImg'){
            products[rightImgIndex].click++;   
            
        }
        settingProducts();
        renderImage();
        

    } else {
        lImg.removeEventListener('click', controlClicks);
        mImg.removeEventListener('click', controlClicks);
        rImg.removeEventListener('click', controlClicks);
        localStorage.removeItem('product');
        attempts =0;
        localStorage.removeItem('attempt');
    } 
       
    }
    let ulEl = document.getElementById('results'); 
    ulEl.textContent = "";
    function showResults(){
        let button = document.getElementById('buttonEl');
        ulEl.appendChild(button);
        let liEl;
        for (let i=0; i<products.length; i++){
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${products[i].product} had ${products[i].click} votes, and was seen ${products[i].views} times`
            productsVotes.push(products[i].click);
            productsSeen.push(products[i].views);


        }
        if (attempts >= maxAttempts){
            var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsImages,
        datasets: [{
            label: '# of Votes',
            data: productsVotes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                
            ],
            borderWidth: 1
        },{
            label: '# of seen',
            data: productsSeen,
            backgroundColor: [
                
                'rgba(54, 162, 235, 0.2)',
                
            ],
            borderColor: [
                
                'rgba(54, 162, 235, 1)',
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

    }
    

        }

       

    gettingProducts();    