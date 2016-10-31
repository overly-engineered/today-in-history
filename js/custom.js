function typeLoop(){
  document.getElementById('date').innerHTML = '';
  document.getElementById('insertable').innerHTML = '';
  $('#newQuote').addClass('hidden');
  var historyFact;
  var historyDate;
  var background;
  $.getJSON( "js/history.json", function( json ) {
    var filteredjson = json.todayinhistory.filter(function (row) {
      var jsonDateMonth = new Date(row.tih_date).getMonth();
      var curDateMonth = new Date().getMonth();
      if(jsonDateMonth === curDateMonth) {
        var jsonDateDay = new Date(row.tih_date).getDate();
        var curDateDay = new Date().getDate();
        if(jsonDateDay === curDateDay){
          return row;
        }
      }
    });
    var rand = Math.floor((Math.random() * filteredjson.length) + 1);
    historyFact = filteredjson[rand].tih_event;
    var background = 'rgb(' + Math.floor((new Date(filteredjson[rand].tih_date).getDay()) * 36) + ','  + Math.floor((new Date(filteredjson[rand].tih_date).getMonth()) * 30) + ',' + Math.floor((new Date(filteredjson[rand].tih_date).getFullYear()) * 0.1) + ')';
    console.log(background);
    document.body.style.background = background;
    historyDate = new Date(filteredjson[rand].tih_date).toDateString();;
    typeText(historyDate.toString(), 'date');
  });
  var textCounter = 0;
  var dateInsert = true;
  function typeText(textToInsert, destination){
    $('#'+destination+'').addClass('blinkCaret');
    setTimeout(function () {
      document.getElementById(destination).innerHTML += textToInsert.charAt(textCounter);
      textCounter++;
      if(textCounter < textToInsert.length){
        typeText(textToInsert, destination);
      } else if(dateInsert){
        $('#'+destination+'').removeClass('blinkCaret');
        textCounter = 0;
        dateInsert = false;
        typeText(historyFact, 'insertable');
      } else {
        $('#'+destination+'').removeClass('blinkCaret');
        $('#newQuote').removeClass('hidden')
      }
    }, 70)
  }
}
typeLoop();
