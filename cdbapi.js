async function cardData(cardName) {
    const addon= "?fname="
    const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php"+addon+cardName);
    const cardData = await response.json();
    console.log(cardData);

  }



class Deck {
  dict = {};
  card = null;
  function = null;
  constructor(){
      
  }
  addtoDeck(imgEle,location)
  {
    this.function= "addtoDeck, "+ location;
    const imageElement = imgEle.cloneNode(true);
    imageElement.attributeName = imgEle.attributeName;
    imageElement.setAttribute('type', imgEle.getAttribute('type'));
    console.log("element type: ", imageElement.getAttribute('type'))
    //const imageElement = document.createElement("img");
    //imageElement.src=imgEle.src
    //imageElement.attributeName = imgEle.attributeName
    this.card = imgEle;
    
    var name = this.card.attributeName;

    var check = this.deckRules();

    if (check){
      LaddtoDeck(imageElement, location);
      this.dict[name] = imageElement;
    }


  }
  deckRules()
  {
     if (this.card.attributeName in this.dict)
     {
      alert("One Card Limit!");
        return false;
     }
     else if (cardType(this.card))
     {      
        if (this.function == "addtoDeck, maindeckpanel" )
        {
          alert("Cannot be added to maindeck")
          return false;
        }
     }
     return true;

  }
}


function cardType(card)
{
  var type  = card.getAttribute('type');
  if (type == "Fusion Monster" || type == "XYZ Monster"||type == "Synchro Monster"||type == "Link Monster")
  {
     return true;
  }
  else{
    return false;
  }
}







var globcardname = ""
const mydeck = new Deck();
var eventclicked = 0;
var lines = [];

async function getCard() {
    
  createFile();
  const cardNameInput = document.getElementById("cardName");
          
  // Get the value of the input
  const cardName = cardNameInput.value;

  if (globcardname.toLowerCase() == cardName.toLowerCase())
  {
    return;
  }
  globcardname = cardName;

  console.log(cardName)
  

  const addon= "?fname="
  const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php"+addon+cardName);
  const cardData = await response.json();
  console.log(cardData);
  data = Object.values(cardData)
  
  console.log(data[0][0])


  image = data[0][0]["card_images"][0]["image_url"]
  var cardname = data[0][0]["name"]



  console.log(image)

  //imageEle(image)
  removeImage()
  const arrayLen = data[0].length;
  console.log(arrayLen)
  for(let i = 0; i < arrayLen;i++)
  {
    image = data[0][i]["card_images"][0]["image_url"]
    Ele(data[0][i])
    imageEle(mydeck.card)
    
  }
  
  if (eventclicked == 0){
    eventlistener();
    eventclicked = 1;
  }
 // removeImage()


}

function removeImage() {
  // Get the parent element of the image (imageContainer)
  const myDiv = document.getElementById("cardresultspanel")
  const images = myDiv.getElementsByTagName("img");

  while (images.length > 0)
  {
    myDiv.removeChild(images[0]);
  }

  // Remove the image from its parent element
  
}

function Ele(data){
  //takes in data
  image = data["card_images"][0]["image_url"]
  var cardname = data["name"]
  var cardtype = data["type"]

  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.attributeName = cardname;
  imageElement.setAttribute('type', cardtype);
  mydeck.card = imageElement;
}

function imageEle(imageElement)
{
    // Create a new image element
    
            

    // Append the image element to the document body or any other container
    //document.body.appendChild(imageElement);

    const DivCardResult = document.getElementById("cardresultspanel")

    DivCardResult.appendChild(imageElement)

    
}


function LaddtoDeck(imgEle,location)
{


    // Append the image element to the document body or any other container
    //document.body.appendChild(imageElement);


    const DivCardResult = document.getElementById(location)

    DivCardResult.appendChild(imgEle)

}



function cardDataSearch(cardName){
  const data = cardData[data]
  console.log(data)

}

  async function fetchTextFile() {
    try {
      const response = await fetch('Zee_Cardlist.txt');
      const fileContent = await response.text();

      // Access the content of the file through the 'fileContent' variable
      console.log(fileContent);

      // Display the content in the HTML file
      document.getElementById('output').innerText = fileContent;
    } catch (error) {
      console.error('Error fetching the text file:', error);
    }
  }

  // Call the fetchTextFile function when the page loads
  //window.onload = fetchTextFile;






  function eventlistener(){
    let clickedimg = null;
    const menu = document.getElementById("context-menu");
    const cardpanel = document.getElementById("cardresultspanel");
    //menu.style.display = 'none';
    document.addEventListener('click', function(event)
    { 

      const clickedElement = event.target;
      
      console.log('Clicked Element: ',clickedElement);
      
      if(clickedElement.tagName == "IMG")
      {       
        clickedimg= clickedElement; 
        menu.style.display = "block";
        menu.style.left = event.pageX + 'px';
        menu.style.top = event.pageY + 'px'
      }
      else
      {
        menu.style.display = "none";
      }


    });

    menu.addEventListener('click', handler = function(e){
      
      const action = e.target.innerText;
      e.stopPropagation();
      //console.log(action)
      switch (action) {
        case 'Add to Main Deck':
          console.log("add to deck")
          mydeck.addtoDeck(clickedimg, "maindeckpanel")
          
          break;
        case 'Add to Side Deck':
          mydeck.addtoDeck(clickedimg, "sidedeckpanel")
          console.log('add to sidedeck')
          break;
        case 'Add to Extra Deck':
          mydeck.addtoDeck(clickedimg, "extradeckpanel")
          console.log("add to Extra deck")
          break;
        

      }
      

    })

  }


  function createFile(){
    const textfile = document.createElement('object');

    textfile.setAttribute('data', 'file:///C:/programming%20projects/javascipt/Dueling%20Network/CardSearch.html');
    //document.body.appendChild(textfile);
    var clist = textfile.data

      // Read the file content using XMLHttpRequest
    let reader = new FileReader();

     


    console.log("data:", window.lines )
  }