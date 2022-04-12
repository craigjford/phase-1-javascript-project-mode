
const drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka";
const vodkaArr = [];

document.addEventListener("DOMContentLoaded", () => {
    debugger
    //Event Listenter for Submit
    const form = document.getElementById('form');
    form.addEventListener('submit', updateComment); 
    initialize(); 
  });

const handleError = (err =>  console.log('error = ' + err));  

function updateComment(e) {

    e.preventDefault();
    let selectTag = document.getElementById("selVodka");
    let updateId = selectTag.selectedIndex + 1;

    commentText = document.getElementById("commarea").value; 

    let pComment = document.getElementById("comment" + updateId);
    pComment.textContent = "- " + commentText; 

    fetch(`http://localhost:3000/drinks/${updateId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json" 
        },
        body: JSON.stringify({
          "comments": commentText
        })
    })

    //clear out textarea
    document.getElementById("commarea").value = "";

}

function deleteDrink(idKey) {
    
    let drinkName = vodkaArr[idKey - 1];
    let hyphenDrink = drinkName.replace(/\s+/g, '-');

    let alertConfirm = confirm("Are you sure you want to delete?");

    if (alertConfirm) {

        fetch(`http://localhost:3000/drinks/${idKey}`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json" 
            },
        })
        .then(resp => resp.json())
        .then(drink => console.log(drink))

        //Remove Drink info from the Dom
        const delElement = document.getElementById(hyphenDrink);
        console.log("delElement = ", delElement)
        delElement.remove();

        // Remove drink from vodka Array     
        vodkaArr.splice(idKey - 1, 1);

        //Remove drink from dropdown
        document.getElementById("selVodka").options.length = 0;

        //Re-populate dropdown
        populateDropDown(vodkaArr);

    }    
}

const initialize = () => {
    debugger
    let alertRbldJson = confirm("Rebuild JSON file?");
    if (alertRbldJson) {
        request()
    } else {
        // Reading Json and Building DOM
        fetchDrinks();
    }
}

//Fetch Vodka API
const request = async () => {
    const response = await fetch(drinkUrl);
    const json = await response.json();
    fetchUrlJson(json);
}

function updateLikeCount(idKey) {

    let isolateP = "p" + idKey;
    const likeParent = document.getElementById(isolateP);
    let drinkPLikes = likeParent.textContent 
    let num = drinkPLikes.indexOf(' ')
    let strLikes = drinkPLikes.slice(0, num);
    numLikes = parseInt(strLikes);
    numLikes++;

    fetch(`http://localhost:3000/drinks/${idKey}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json" 
        },
        body: JSON.stringify({
          "likes": numLikes,
        })
    })

    if (numLikes === 1) {
        likeParent.textContent = "1 Like";
    } else {
        likeParent.textContent = numLikes + " Likes";
    }
}

function fetchDrinks() {
   
    fetch("http://localhost:3000/drinks")
    .then(resp => resp.json())
    .then(data => { 
        const vodkaObj = data;
        renderDrinks(vodkaObj);
    })
    .catch(function (error) {
        handleError(error)
    })

}

function renderDrinks(vodkaObj) {

    vodkaArr.length = 0;
    let mixArr = [];
    let commentArray = [];

    let getListDiv = document.getElementById("drink-details");  

    let drinkItem = vodkaObj;
    
    for (let i = 0; i < drinkItem.length; i++) {

        mixArr.length = 0;
        commentArray.length = 0;
        
         let id = drinkItem[i].id;
         let drinkId = drinkItem[i].drinkId; 
         let drinkName = drinkItem[i].drinkName;
    
      
         // fill vodka Array to populate dropdown 
         vodkaArr.push(drinkName);

         let drinkAvatar = drinkItem[i].avatar;
         let drinkGlass = drinkItem[i].glassType;
         let drinkLikes = drinkItem[i].likes;

         let drinkDiv = document.createElement("div");
         drinkDiv.setAttribute("class", "drinks");
         let hyphenDrink = drinkName.replace(/\s+/g, '-');
         drinkDiv.setAttribute("id", hyphenDrink);
         getListDiv.append(drinkDiv);

         let h2Drink = document.createElement("h2");
         h2Drink.textContent = drinkName;
         drinkDiv.appendChild(h2Drink);

         let glassP = document.createElement("p");
         glassP.setAttribute("class","glass");
         glassP.innerHTML = "<i>Serve in a " + drinkGlass + "</i>";
         drinkDiv.appendChild(glassP);

         let idP = document.createElement("p");
         idP.textContent = drinkId;

        let idStr = "drink-id" + (id);

         idP.setAttribute("id", idStr)
         drinkDiv.appendChild(idP);

         document.getElementById(idStr).hidden = true;

         let drinkImg = document.createElement('img');
         drinkImg.setAttribute("src", drinkAvatar);
         drinkImg.setAttribute("class","drink-avatar");
         drinkImg.setAttribute("length","350");
         drinkImg.setAttribute("width","350");
         drinkDiv.appendChild(drinkImg);
         
         mixArr = drinkItem[i].ingredients;

         let h3Drink = document.createElement("h3");
         h3Drink.textContent = "Drink Ingredients";
         drinkDiv.appendChild(h3Drink);

         let olDrink = document.createElement("ol");
         drinkDiv.appendChild(olDrink);

         mixArr.forEach(ingredient => {
            let liDrink = document.createElement("li");
            liDrink.textContent = ingredient;
            drinkDiv.appendChild(liDrink);
         });

        let h3Instruct = document.createElement("h3");
        h3Instruct.textContent = "Instructions";
        drinkDiv.appendChild(h3Instruct);
  
        let instructions = drinkItem[i].instructions;
        let instructP = document.createElement("p");
        instructP.setAttribute("class","instruct");
        instructP.textContent = instructions;
        drinkDiv.appendChild(instructP);

        const commentElement = document.createElement('h3');
        commentElement.textContent = "Comments";
        drinkDiv.appendChild(commentElement);

        let comments = drinkItem[i].comments;

        let pComment = document.createElement("p");
        pComment.setAttribute("id", "comment" + id);
        pComment.setAttribute("class", "comment");
        if (comments > " ") {
             pComment.textContent = "- " + comments;
        } else { 
             pComment.textContent = ""
        }            
        drinkDiv.appendChild(pComment);

        let drinkP = document.createElement("p");
        let pAttr = "p" + id
        drinkP.setAttribute("id", pAttr)
        drinkP.setAttribute("class", "pLikes")
        drinkP.style.color = "darkolivegreen";
         if (drinkLikes === 1) {
             drinkP.textContent = "1 Like";
         } else {
             drinkP.textContent = drinkLikes + " Likes"
         }
         drinkDiv.appendChild(drinkP);

         let drinkBtn = document.createElement('button');
         drinkBtn.setAttribute("class", "like-btn");
         drinkBtn.setAttribute("id", id);
         drinkBtn.setAttribute("type", "button");
         drinkBtn.textContent = ("  Like  ");
         drinkDiv.appendChild(drinkBtn);

         drinkDiv.querySelector(".like-btn").addEventListener('click', () => 
            updateLikeCount(id))
 
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute("class", "delete-btn");
        deleteBtn.setAttribute("id", "del" + id);
        deleteBtn.setAttribute("type", "button");
        deleteBtn.textContent = (" Delete Drink ");
        drinkDiv.appendChild(deleteBtn);

        drinkDiv.querySelector(".delete-btn").addEventListener('click', () => 
            deleteDrink(id))

        let blankP = document.createElement('p');
        drinkDiv.appendChild(blankP);
      
    }

    populateDropDown(vodkaArr);
}

const populateDropDown = (vodkaArr) => {

    const getSelect = document.querySelector("#selVodka"); 

    vodkaArr.forEach(drink => {
        const vodkaOption = document.createElement("option")
        vodkaOption.setAttribute("value", drink)
        vodkaOption.text = drink
        getSelect.appendChild(vodkaOption)
    })  

}

//  All of Following Code relates to building JSON file

function fetchUrlJson(vodkaObj) {
    
    let mixArr = [];
    let drinkItem = vodkaObj.drinks;
    let drinkCtr = 1;

    for (let i = 0; i < drinkItem.length; i++) {   

        mixArr.length = 0;

         let idDrink = parseInt(drinkItem[i].idDrink)
         let drinkName = drinkItem[i].strDrink
         let drinkAvatar = drinkItem[i].strDrinkThumb
         let drinkGlass = drinkItem[i].strGlass
         let drinkLikes = 0;

         drinkName = drinkName.trim();
         
       
        if ((drinkItem[i].strMeasure1 !== null) && (drinkItem[i].strMeasure1 !== "")) {
            if ((drinkItem[i].strIngredient1 !== null) && (drinkItem[i].strIngredient1 !== "")) {
                mixArr.push(drinkItem[i].strMeasure1.trim() + " " + drinkItem[i].strIngredient1.trim());
            } else  {
                mixArr.push(drinkItem[i].strMeasure1.trim());
            }
        } else {
            if ((drinkItem[i].strIngredient1 !== null) && (drinkItem[i].strIngredient1 !== "")){
                mixArr.push(drinkItem[i].strIngredient1.trim());
            }
        }
  
        if ((drinkItem[i].strMeasure2 !== null) && (drinkItem[i].strMeasure2 !== "")) {
            if ((drinkItem[i].strIngredient2 !== null) && (drinkItem[i].strIngredient2 !== "")) {
                mixArr.push(drinkItem[i].strMeasure2.trim() + " " + drinkItem[i].strIngredient2.trim());
            } else  {
                mixArr.push(drinkItem[i].strMeasure2.trim());
            }
        } else {
            if ((drinkItem[i].strIngredient2 !== null) && (drinkItem[i].strIngredient2 !== "")){
                mixArr.push(drinkItem[i].strIngredient2.trim());
            }
        }
  
        if ((drinkItem[i].strMeasure3 !== null) && (drinkItem[i].strMeasure3 !== "")) {
            if ((drinkItem[i].strIngredient3 !== null) && (drinkItem[i].strIngredient3 !== "")) {
                mixArr.push(drinkItem[i].strMeasure3.trim() + " " + drinkItem[i].strIngredient3.trim());
            } else  {
                mixArr.push(drinkItem[i].strMeasure3.trim());
            }
        } else {
            if ((drinkItem[i].strIngredient3 !== null) && (drinkItem[i].strIngredient3 !== "")){
                mixArr.push(drinkItem[i].strIngredient3.trim());
            }
        }

        if ((drinkItem[i].strMeasure4 !== null) && (drinkItem[i].strMeasure4 !== "")) {
            if ((drinkItem[i].strIngredient4 !== null) && (drinkItem[i].strIngredient4 !== "")) {
                mixArr.push(drinkItem[i].strMeasure4.trim() + " " + drinkItem[i].strIngredient4.trim());
            } else  {
                mixArr.push(drinkItem[i].strMeasure4.trim());
            }
        } else {
            if ((drinkItem[i].strIngredient4 !== null) && (drinkItem[i].strIngredient4 !== "")){
                mixArr.push(drinkItem[i].strIngredient1.trim());
            }
        }
  
        if ((drinkItem[i].strMeasure5 !== null) && (drinkItem[i].strMeasure5 !== "")) {
            if ((drinkItem[i].strIngredient5 !== null) && (drinkItem[i].strIngredient5 !== "")) {
                mixArr.push(drinkItem[i].strMeasure5.trim() + " " + drinkItem[i].strIngredient5.trim());
            } else  {
                mixArr.push(drinkItem[i].strMeasure5.trim());
            }
        } else {
            if ((drinkItem[i].strIngredient5 !== null) && (drinkItem[i].strIngredient5 !== "")){
                mixArr.push(drinkItem[i].strIngredient5.trim());
            }
        }
  
        if ((drinkItem[i].strMeasure6 !== null) && (drinkItem[i].strMeasure6 !== "")) {
            if ((drinkItem[i].strIngredient6 !== null) && (drinkItem[i].strIngredient6 !== "")) {
                mixArr.push(drinkItem[i].strMeasure6.trim() + " " + drinkItem[i].strIngredient6.trim());
            } else  {
                mixArr.push(drinkItem[i].strMeasure6.trim());
            }
        } else {
            if ((drinkItem[i].strIngredient6 !== null) && (drinkItem[i].strIngredient6 !== "")){
                mixArr.push(drinkItem[i].strIngredient6.trim());
            }
        }
  
        let instructions = drinkItem[i].strInstructions;

        drinkObj = {
//            "drinkId": idDrink,
            "drinkName": drinkName,
            "avatar": drinkAvatar,
            "glassType": drinkGlass,
            "likes": 0,
            "instructions": instructions,
            "ingredients": mixArr,
            "comments": " "
        }
        
        postDrink(drinkObj);
        drinkCtr++;
    };
}

function postDrink(drinkObj) {

       fetch('http://localhost:3000/drinks', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(drinkObj)
       })
       .then(res => res.json())
       .then(drink => console.log(drink))
}

