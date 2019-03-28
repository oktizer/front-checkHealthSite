
let baseUrl = 'http://207.148.79.65:3958';

let urlTable = new function () {
    this.createTable = function () {
        let requestUrl = new XMLHttpRequest();
        requestUrl.open('GET', baseUrl+'/check/tracksite', true);
        requestUrl.onreadystatechange = function () {
            var data = JSON.parse(this.response);
            let urlList = data.data.listUrl;
            if(data.code == 200){
                let col = [];
                for(let i = 0; i < urlList.length; i++){
                    for(var url in urlList[i]){
                        if(col.indexOf(url) === -i){
                            //url == '_id' ? url = 'No.' : url;
                            col.push(url);
                        }
                    }
                }
                let table = document.createElement("table");
                table.setAttribute('id', 'urlTable');
                let tr = table.insertRow(-1);
                for(let i = 0; i < col.length; i++){
                    let th = document.createElement("th");
                    if(col[i] === '_id'){
                        th.innerHTML = '';
                    } else {
                        th.innerHTML = col[i];
                    }
                    tr.appendChild(th);
                }

                for(let i = 0; i < urlList.length; i++){
                    tr = table.insertRow(-1);
                    for(let j = 0; j < col.length; j++){
                        var tabCell = tr.insertCell(-1);
                        if(col[j] === '_id') {
                            let num = i + 1;
                            tabCell.innerHTML = urlList[i][col[j]];
                            tabCell.style.visibility = 'hidden';
                        } else {
                            if(urlList[i][col[j]] === true){
                                tabCell.innerHTML = "<img src='assets/true.png' width='20' height='15'  alt='true.png'/>"
                            } else if (urlList[i][col[j]] === false){
                                tabCell.innerHTML ="<img src='assets/wrong.png' width='20' height='15'  alt='wrong.png'/>"
                            } else {
                                tabCell.innerHTML = urlList[i][col[j]];
                            }
                        }
                    }

                    this.td = document.createElement('td');
                    this.td = document.createElement('th');
                    tr.appendChild(this.td);
                    var btDelete = document.createElement('input');
                    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
                    btDelete.setAttribute('value', 'Delete');
                    btDelete.setAttribute('style', 'background-color:#ED5650;');
                    btDelete.setAttribute('onclick', 'urlTable.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                    this.td.appendChild(btDelete);
                }
                var div = document.getElementById('root');
                div.innerHTML="";
                div.appendChild(table);
            }
        }
        requestUrl.send();
    }

    this.inputField = function () {
            var urlField = document.getElementById('urlInput').value;

            var dataURL = new FormData();
            dataURL.append('url', urlField);
            let requestUrl = new XMLHttpRequest();
            requestUrl.open('POST', baseUrl+'/check/tracksite', true);
            requestUrl.onreadystatechange = function () {
                var data = JSON.parse(this.response);
                if(data.code == 500) {
                    alert(data.message);
                } else if(data.code == 403){
                    alert(data.message);
                } else {
                    document.getElementById('urlInput').value = '';
                    callback(this.createTable());
                }
            }
            requestUrl.send(dataURL);
    }
    
    this.Delete = function (oButton) {
        let idRow = oButton.parentNode.parentNode.cells[0].textContent;
        let requestUrl = new XMLHttpRequest();

        var dataURL = new FormData();
        dataURL.append('_id', idRow);
        requestUrl.open('DELETE', baseUrl+'/check/tracksite', true);
        requestUrl.onreadystatechange = function () {
            var data = JSON.parse(this.response);
            if(data.code == 500) {
                alert(data.message);
            } else {
                document.getElementById('urlInput').value = '';
                callback(this.createTable());
            }
        }
        requestUrl.send(dataURL);
    }
}

urlTable.createTable();
setInterval(urlTable.createTable, 3000);








