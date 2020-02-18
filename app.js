var maxlistProductsToDisplay, maxNumSeletions;
var allProductList=[];  // array with products objects
var listProductsToDisplay=[]; // here I will storage the products to display in the page

function Product(productName, productPath){
  this.productName = productName;
  this.productPath = productPath;
  this.timesClicked = 0; // amount of times that user did clik on it
  this.timesRendered = 0; // amount of times this image was rendered.
  allProductList.push(this); //list of all products to show
}

function getRandomProductToDisplay()
{
  // var randomIndex = Math.floor(Math.random() * allProductList.length);
  // return randomIndex;
  return(Math.floor(Math.random() * allProductList.length));

}

/*
This function generates randomly different products to display.
If the random product is in listProductsToDisplay, I will look for another product.
*/
function generatelistProductsToDisplay()
{
  var randomIndex;
  var duplicated;
  //TODO reset listProductsToDisplay 

  // i'm going to ask for random numbers until I have full listProductsToDisplay
  while (listProductsToDisplay.length < maxlistProductsToDisplay)
  {
    // obtain a random product to display
    randomIndex = getRandomProductToDisplay();
    duplicated = false;
    //review that that number is not already in the array listProductsToDisplay
    for (var i=0; i < listProductsToDisplay.length; i++)
    {
      if (listProductsToDisplay[i] === randomIndex)
      {
        duplicated = true;
      }
    } //for(var i=0; i<lis
    if (!duplicated){
      listProductsToDisplay.push(randomIndex); // store the in in the array of products to display
      allProductList[randomIndex].timesRendered++; // to have a control of how many times it was rendered
    }
  } //while (listProductsToDisplay.length < maxlistProductsToDisplay)
} //function displayProducts()

/*
This function will add rows and columns to table tblProducts showing whatever is stored 
in listProductsToDisplay. It will create 3 images per row
*/
function renderProductsToDisplay()
{
  var numRowsToDisplay=0; //i will display 2 images per row
  var numRowsCreated = 0; //to control how many rows I had created
  var newImage;
  var numColumsToDisplay = 2;
  var tblProducts = document.getElementById('tblProducts');

  // clean the table
  tblProducts.innerHTML=null;
  // obtain the number of rows to create
  if (maxlistProductsToDisplay <= 2){
    numRowsToDisplay = 1;
  } 
  else 
  {
    numRowsToDisplay = Math.ceil(maxlistProductsToDisplay/2);
  }
  // console.log('maxlistProductsToDisplay: ' + maxlistProductsToDisplay + ' / numRowsToDisplay ' + numRowsToDisplay);

  var newRow, newCol;
  // TODO: poner esto en una tabla
  for (var p=0; p<listProductsToDisplay.length; p++)
  {
    // newImage
    newRow = document.createElement('tr');
    newCol = document.createElement('rd');


    newImage = document.createElement('img');
    newImage.setAttribute('src',allProductList[listProductsToDisplay[p]].productPath);
    newImage.setAttribute('alt', allProductList[listProductsToDisplay[p]].productName);
    newCol.appendChild(newImage);
    newRow.appendChild(newCol);
    tblProducts.appendChild(newRow);
    
    // console.log(allProductList[listProductsToDisplay[p]].productName);
  }

  // for (var i = 0; i<numRowsToDisplay; i++)
  // {
  //   newRow = document.createElement('tr');
  //   for (j=0; j<numColumsToDisplay;j++)
  //   {
  //     // i need a way to know how many imagines I had displayed
  //   }
  //   newCol = document.createElement('rd');
  //   newCol.textContent=i;
  //   newRow.appendChild(newCol);
  //   tblProducts.appendChild(newRow);
  // }

} // renderProductsToDisplay()

/////////////////////////
/////  MAIN
/////////////////////////
maxlistProductsToDisplay = 3; // how many products will be rendered in the page
maxNumSeletions = 25; // max number of total clicks in the page.

// populating the list of products. By now, I will just load the first 5. TODO add the rest 
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// calling functions to do the magic
generatelistProductsToDisplay();
renderProductsToDisplay();


