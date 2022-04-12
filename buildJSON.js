

console.log('got in');

const equityUrl = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json";
console.log('after url');
document.addEventListener("DOMContentLoaded", () => {
    console.log('in DOMContentLoaded');
    initialize();
  });

const handleError = (err =>  console.log('error = ' + err));    

const request = async () => {
    const response = await fetch(equityUrl);
    const json = await response.json();
    fetchUrlJson(json);
}

const initialize = () => {

    let alertRbldJson = confirm("Rebuild JSON file?");
    if (alertRbldJson) {
        request()
    } else {
        // Reading Json and Building DOM
        fetchTrades();
    }
}

function fetchTrades() {
   
    fetch("http://localhost:3000/equity")
    .then(resp => resp.json())
    .then(data => { 
        const tradeObj = data;
        renderTrades(tradeObj);
    })
    .catch(function (error) {
        handleError(error)
    })

}

function renderTrades(tradeObj) {

    let getListDiv = document.getElementById("equity-details");  

    let tradeItem = tradeObj;
    
    tradeItem.forEach((item) => {

         let member = item.member
         let discloseDate = item.discloseDate; 
         let transDate = item.transDate;
         let tickerSym = item.tickerSym
         let tickerCo = item.tickerCo
         let transType = item.transType
         let transAmt = item.transAmt
    
         let tradeDiv = document.createElement("div");
         tradeDiv.setAttribute("class", "drinks");
         getListDiv.append(tradeDiv);

         let h2Member = document.createElement("h2");
         h2Member.textContent = member;
         getListDiv.appendChild(h2Member);

         let pDate = document.createElement("p");
         pDate.textContent = discloseDate;
         getListDiv.appendChild(pDate);

         let pSym = document.createElement("p");
         pSym.textContent = tickerSym;
         getListDiv.appendChild(pSym);

         let pComp = document.createElement("p");
         pComp.textContent = tickerCo;
         getListDiv.appendChild(pComp);

         let pType = document.createElement("p");
         pType.textContent = transType;
         getListDiv.appendChild(pType);

         let pAmt = document.createElement("p");
         pAmt.textContent = transAmt;
         getListDiv.appendChild(pAmt);

         let hr1 = document.createElement("hr");
         getListDiv.appendChild(hr1);

         let hr2 = document.createElement("hr");
         getListDiv.appendChild(hr2);
    });

}

//  All of Following Code relates to building JSON file

function fetchUrlJson(equityObj) {

    console.log(equityObj);

    let equityTrans = equityObj;
    console.log(equityTrans)


    for (let i = 0; i < 6000; i++) {  

        let houseMember = equityTrans[i].representative

        if ((houseMember.includes('Pelosi')) || (houseMember.includes('Cheney'))) {
         
            let discloseDate = equityTrans[i].disclosure_date;
            let transDate = equityTrans[i].transaction_date;
            let tickerSym = equityTrans[i].ticker;
            let tickerCo = equityTrans[i].asset_description;
            let transType = equityTrans[i].type;
            let transAmt = equityTrans[i].amount;
            

            equityObj = {
                "member": houseMember,
                "discloseDate": discloseDate,
                "transDate": transDate,
                "tickerSym": tickerSym,
                "tickerCo": tickerCo,
                "transType": transType,
                "transAmt": transAmt
            }

            postEquity(equityObj);
        }
    };
}

function postEquity(equityObj) {
     
       console.log('in Post', equityObj) 

       fetch('http://localhost:3000/equity', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(equityObj)
       })
       .then(res => res.json())
       .then(equity => console.log(equity))
}


