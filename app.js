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
      listProductsToDisplay.push(randomIndex);
    }
  } //while (listProductsToDisplay.length < maxlistProductsToDisplay)



  // review that the random product is not already in the array of products to display


  allProductList[randomIndex].timesRendered++; // to have a control of how many times it was rendered
  console.log('randomIndex: ' + randomIndex);
  

} //function displayProducts()

/////////////////////////
/////  MAIN
/////////////////////////
maxlistProductsToDisplay = 3; // how many products will be rendered in the page
maxNumSeletions = 25; // max number of total clicks in the page.

// populating the list of products. By now, I will just load the first 5. TODO add the rest 
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/batroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');

generatelistProductsToDisplay();
  // render products

// Display maxlistProductsToDisplay in the table randomly


console.log(allProductList);

