var express = require('express')
const axios = require('axios');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


let isdone2=true;
function myTimer2() {
  if(isdone2){
    isdone2=false;
        axios({
          method:'get',
          url:'https://coincheck.com/api/rate/btc_jpy'
        }).then(function (response) {
            axios.get("https://script.google.com/macros/s/AKfycbwhq4DLdwrfkow57q2LaklmujQSWvTw3ztxYtyj6zUt5jN2tprd/exec?action=coincheck&price="+response.data.rate)
            .then((response)  =>  {
              isdone2=true;
            }, (error)  =>  {isdone2=true;})  
        })
        .catch(function (error) {
            console.log(error);
            isdone2=true;
        });
  }else{
    myTimer2();
  }
}
setInterval(myTimer2, 15000);



app.get('/', function(req, res) {
  res.send('HELLO2');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})