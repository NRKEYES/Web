
var body = document.querySelector('body');

var requestURL = './GoodStuff.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json  charset=utf-8';
request.send();


function Load_Shit(jsonObj){
    var myPara = document.createElement('p');
    myPara.textContent = 'LoadingShit';
    body.appendChild(myPara);
}


request.onload = function() {
    var data = request.response;
    var parsed = JSON.parse(data);

    for (let key in parsed) {
        var set = parsed[key];
        for(let key2 in set){
          var myPara = document.createElement('p');
          myPara.textContent = set[key2];
          body.appendChild(myPara);
        }
    }

    Load_Shit(data);

    for (let key in parsed) {
        var set = parsed[key];
        var myPara = document.createElement('p');
        myPara.textContent = set['Energy'];
        body.appendChild(myPara);
    }
};
