let myForm = document.getElementById('my-form');
let searchBar = document.getElementById('search-bar');
let resultSection = document.getElementById('reslut-section');
let finalData = document.getElementById('final-data');
let clearButton = document.getElementById('cross-svg');
let inputValue = searchBar.value.trim();
let errorMessage = document.createElement('p');
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    finalData.innerHTML = '';
    inputValue = searchBar.value;
    if (inputValue == '') {
        errorMessage.style.color = 'red';
        errorMessage.textContent = "**Enter Something, Input Value Can't Be Empty";
        myForm.append(errorMessage);
        errorMessage.style.visibility='visible';
    }
    else {
        errorMessage.style.visibility = 'hidden';
        renderData();
    }
});
// fetching the data from the URL
let renderData =  () => {
    let url = ` https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${inputValue}`;
    fetch(url)
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            else {
                throw Error("error");
            }
        })
        .then((data) => {
            console.log(data);
            if (data.query.searchinfo.totalhits === 0) {
                alert("Please Seacrh Valid input");
                searchBar.value = '';
            }
            else {
                displayData(data);
            }
        })
        .catch((error) => {
            alert("Make sure Your System is Connected to Network");
            console.log(error);
        });
}
// Display The Data From The API
let displayData = (data) => {
    data.query.search.forEach(element => {
        let heading = document.createElement('a');
        let link = document.createElement('a');
        let snippet = document.createElement('p');
        let urlLink = `http://en.wikipedia.org/?curid=${element.pageid}`

        heading.setAttribute('id', 'heading')
        heading.innerText = element['title'];
        heading.setAttribute('href', urlLink)
        heading.setAttribute('target','_blank')
        finalData.append(heading);

        link.setAttribute('href', urlLink);
        link.setAttribute('id','link')
        link.setAttribute('target','_blank')
        link.innerText = urlLink;
        finalData.append(link);

        snippet.setAttribute('id', 'snippet');
        snippet.innerHTML = element.snippet;
        finalData.append(snippet);
    })
}
// clear the input Value
clearButton.addEventListener('click', function () {
    searchBar.value = '';
});

