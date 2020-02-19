'use strict';

var maxlistProductsToDisplay, numClicksAvailable;
var allProductList=[]; // array with products objects
var listProductsToDisplay=[]; // here I will storage the products to display in the page
var previousListProductsToDisplay=[]; // is a copy of the last listProductsToDisplay, so I dont duplicate in next display
var allProductsName=[]; // is an array with the names of products, so I can use it to render the canvas
var arrColorClicks=[]; //this array will be the same length as and all positions will have the = value. Is for canvas.
var arrColorRender=[]; //this array will be the same length as and all positions will have the = value. Is for canvas.
var graphColorClicks, graphColorRender; //canvas graphic column's colors

function Product(productName, productPath){
  this.productName = productName;
  this.productPath = productPath;
  this.timesClicked = 0; // amount of times that user did clik on it
  this.timesRendered = 0; // amount of times this image was rendered.
  allProductList.push(this); //list of all products to show
  allProductsName.push(productName);
  // values for the graph
  arrColorClicks.push(graphColorClicks);
  arrColorRender.push(graphColorRender);

}

function getRandomProductToDisplay()
{
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
  // generateLast previousListProductsToDisplay
  generatePreviousListProductsToDisplay();

  listProductsToDisplay = [];

  // i'm going to ask for random numbers until I have full listProductsToDisplay
  while (listProductsToDisplay.length < maxlistProductsToDisplay)
  {
    // obtain a random product to display
    randomIndex = getRandomProductToDisplay();
    // review that randomIndex is not in previousListProductsToDisplay
    var justShowed = isThisProductJustShown(randomIndex);
    duplicated = false;
    //review that that number is not already in the array listProductsToDisplay
    for (var i=0; i < listProductsToDisplay.length; i++)
    {
      //if (listProductsToDisplay[i] === randomIndex) // and or isThisProductJustShown
      if ((listProductsToDisplay[i] === randomIndex) || justShowed)
      {
        duplicated = true;
      }
    } //for(var i=0; i<lis
    if (!duplicated){
      listProductsToDisplay.push(randomIndex); // store the in in the array of products to display
      allProductList[randomIndex].timesRendered++; // to have a control of how many times it was rendered
      //previousListProductsToDisplay.push(randomIndex);
    }
  } //while (listProductsToDisplay.length < maxlistProductsToDisplay)
  // display a the created listProductsToDisplay
  renderProductsToDisplay();
} //function displayProducts()


function generatePreviousListProductsToDisplay()
{
  previousListProductsToDisplay = [];
  for (var i=0; i<listProductsToDisplay.length; i++)
  {
    previousListProductsToDisplay.push(listProductsToDisplay[i]);
  }
}

/*
Returns true/false is an indicated products has been shown in the previous display
*/
function isThisProductJustShown(randomIndex)
{
  var justShown = false;
  for (var f = 0; f < previousListProductsToDisplay.length; f++)
  {
    if (previousListProductsToDisplay[f] === randomIndex)
    {
      justShown = true;
    }
  }
  return justShown;
}

/*
This function will add rows and columns to table tblProducts showing whatever is stored 
in listProductsToDisplay. It will create 3 images per row
*/
function renderProductsToDisplay()
{
  // var numRowsCreated = 0; //to control how many rows I had created
  var newImage;
  var numRowsToDisplay=0; //i will display 2 images per row
  var maxColToDisplayPerRow = 2;
  var newRow, newCol;
  // var itemsRendered =0;
  var currentListProductsToDisplayPosition = 0; //I will create a TD for each element in this array

  var tblProducts = document.getElementById('tblProducts');

  // clean the table of the products
  tblProducts.innerHTML=null;
  // obtain the number of rows to create
  if (maxlistProductsToDisplay <= maxColToDisplayPerRow){
    numRowsToDisplay = 1;
  } 
  else 
  {
    numRowsToDisplay = Math.ceil(maxlistProductsToDisplay/maxColToDisplayPerRow);
  }

  //  now I know how many rows and columns I will display
  for (var r=0; r<numRowsToDisplay; r++)
  {
    newRow = document.createElement('tr');
    for (var c=0;(c < maxColToDisplayPerRow) && (currentListProductsToDisplayPosition<listProductsToDisplay.length); c++ )
    {
      newCol = document.createElement('td');
      newImage = document.createElement('img');
      newImage.setAttribute('src',allProductList[listProductsToDisplay[currentListProductsToDisplayPosition]].productPath);
      newImage.setAttribute('alt', allProductList[listProductsToDisplay[currentListProductsToDisplayPosition]].productName);
      newImage.setAttribute('id', listProductsToDisplay[currentListProductsToDisplayPosition]); // is the allProductList array position, to make a direct ref
      newImage.addEventListener('click',handleClicks);
      newCol.appendChild(newImage);
      newRow.appendChild(newCol);
      currentListProductsToDisplayPosition++;
    }
    tblProducts.appendChild(newRow);
  }
} // renderProductsToDisplay()

function handleClicks(event)
{
  var clickedProduct;
  // update the amount of clicks in the page
  numClicksAvailable--;
  // update the clicks in the image
  clickedProduct = event.target.getAttribute('id');
  allProductList[clickedProduct].timesClicked++;
  // render new images
  if (numClicksAvailable===0)
  {
    alert('Thank you for participate. \nYou used all your availables votes.');
    storeAllProductList();
    displayVotationResults();
  }
  else
  {
    generatelistProductsToDisplay();
  }
} //function handleClicks

/*
This functions search for the storedObject storedBusVotes, if exists, then update the values of
allProductList.timesClicked and timesRendered, adding what is stored in localMemory
*/
function storeAllProductList()
{
  // obtain the stored array. if is null, I will create it, if not, I will upodate it.
  var storedVotes, storedAllProductList;
  //key: storedBusVotes
  storedVotes = localStorage.getItem('storedBusVotes');
  if (storedVotes !== null)
  {
    storedAllProductList = JSON.parse(storedVotes);
    // now, I will update the values of timesClicked and timesRendered of each product in the array. 
    // this upd array, is the one than will be displayed and the one that will be stored. Updating stored values
    for (var i=0; i<allProductList.length; i++)
    {
      allProductList[i].timesClicked = allProductList[i].timesClicked + storedAllProductList[i].timesClicked;
      allProductList[i].timesRendered = allProductList[i].timesRendered + storedAllProductList[i].timesRendered;
    }
  } //if (storedVotes ===null)

  // store the values of the array. It will create or overwrite it
  storedAllProductList = JSON.stringify(allProductList);
  localStorage.setItem('storedBusVotes',storedAllProductList);
}//storeAllProductList

/*
This function create a table with all the values in allProductList.
 */
function displayVotationResults()
{
  // var newRow, newCol;
  var tblProducts = document.getElementById('tblProducts');
  // clean the table of the products
  tblProducts.innerHTML=null;


  var ulVotingResults = document.getElementById('ulVotingResults');
  var liElement, votingMsg;
  for (var i=0; i<allProductList.length; i++)
  {
    votingMsg = '';
    liElement = document.createElement('li');
    votingMsg = allProductList[i].productName + ' had ' + allProductList[i].timesClicked;
    votingMsg = votingMsg + ' votes and was shown ' + allProductList[i].timesRendered;
    liElement.textContent= votingMsg;
    ulVotingResults.appendChild(liElement);
  }
  displayCanvas();
} //displayVotationResults

/*
This function returns the clicks for each position in the array allProductList, and returns an array.
 */
function getVotesInArray()
{
  var arrVotes=[];
  for (var i=0; i<allProductList.length ; i++)
  {
    arrVotes.push(allProductList[i].timesClicked);
  }
  return arrVotes;
}

/*
This function returns the number of render for each position in the array allProductList, and returns an array.
 */
function getNumRenderinArray()
{
  var arrRender=[];
  for (var i=0; i<allProductList.length ; i++)
  {
    arrRender.push(allProductList[i].timesRendered);
  }
  return arrRender;
}

function displayCanvas()
{
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allProductsName,
      datasets: [{
        label: '# of Votes',
        data: getVotesInArray(),
        backgroundColor: arrColorClicks,
        borderColor: arrColorClicks,
        borderWidth: 1
      },
      {
        label: '# of Render',
        data: getNumRenderinArray(),
        backgroundColor: arrColorRender,
        borderColor: arrColorRender, //TODO change the color of the border
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
} //displayCanvas

/////////////////////////
/////  MAIN
/////////////////////////
maxlistProductsToDisplay = 3; // how many products will be rendered in the page
numClicksAvailable = 5; // max number of total clicks available in the site.
graphColorClicks='#BD3665';
graphColorRender='lightgray';

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

// function pause() {
//   alert('lost focus !!');
//   console.log('creating lisener to blur');
// }
// window.addEventListener('blur', pause);

// TODO 2: load whatever we have in storage and merge with allProductList

generatelistProductsToDisplay();

