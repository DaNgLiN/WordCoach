var input = document.getElementById("query");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("q").click();
    }
});

function searching() {
   savetext();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText)[0];
            //console.log(obj)
            //document.getElementById("demo").innerHTML="Loading....!!!";
            document.getElementById("demo").style.display = "block";
            if(obj.hasOwnProperty('phonetic')&&obj.hasOwnProperty('origin')){
            var result = `<table>
					<tr><td>Word:-</td>
						<td>`+ obj.word + `</td>
						</tr>
					<tr><td>Phonetic:-</td>
						<td>`+ obj.phonetic + `</td>
						</tr>
					<tr><td>Origin:-</td>
						<td>`+ obj.origin + `</td>
						</tr>
					</table>`
            var result2 = ""
            for (var i in obj.meaning) {
                result2 += `
						<ul>
							<li>
								<span>`+ i + `</span>
								<ul>
									<li>Definition:-`+ obj.meaning[i][0].definition + `</li>
									<li>Example:-`+ obj.meaning[i][0].example + `</li>
								</ul>
							</li>
						</ul>`
            }
            var result3 = ""
            if (obj.meaning.hasOwnProperty('noun')) {
                if (obj.meaning.noun[0].hasOwnProperty('synonyms')) {
                    for (var i in obj.meaning.noun[0].synonyms) {
                        if (i => 0) {
                            result3 += `
					<ul>
					<li>`+ obj.meaning.noun[0].synonyms[i] + `</li>

					</ul>`
                        }
                    }
                }
            }
            else if (obj.meaning.hasOwnProperty('adjective')) {
                if (obj.meaning.adjective[0].hasOwnProperty('synonyms')) {
                    for (var i in obj.meaning.adjective[0].synonyms) {
                        if (i >= 0) {
                            result3 += `
								<ul>
									<li>`+ obj.meaning.adjective[0].synonyms[i] + `</li>
								</ul>`
                        }
                    }
                }
            }
            else if (obj.meaning.hasOwnProperty('transitive')) {
                if (obj.meaning.transitive[0].hasOwnProperty('synonyms')) {
                    for (var i in obj.meaning.transitive[0].synonyms) {
                        if (i >= 0) {
                            result3 += `
								<ul>
									<li>`+ obj.meaning.transitive[0].synonyms[i] + `</li>
								</ul>`
                        }
                    }
                }
            }
            else{
                result3 =""
            }

            document.getElementById("demo").innerHTML = `<span>` + result + `</span>Meaning:-<span>` + result2 + `</span>Synonyms:-<span>` + result3 + `</span>`;

        }
        else{
            document.getElementById("demo").style.display="none";
            swal({
                title: "Invialid input!",
                text: "Check your spelling",
                icon: "error",
                button: "okay",
              });
              document.getElementById("query").value="";
        }
    }
    };
    xhttp.open("GET", "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + query.value + "&lang=en", true);
    xhttp.onload =function(){
    if(xhttp.status===404){
        
        swal(xhttp.statusText+xhttp.status,"","warning");
        document.getElementById("query").value="";
        
    }
}
    xhttp.send();
}

function savetext(){
console.log('input save function on construction')
}