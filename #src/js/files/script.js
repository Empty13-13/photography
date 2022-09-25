let dateTitle = document.querySelector('#dateReservation');
if (dateTitle) {
  let data = parseGetParams()
  let month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  console.log(data)

  if (data) {
    dateTitle.innerHTML = `<span>${data.date}</span> ${month[data.month - 1]} ${data.year}`
  }

  function parseGetParams() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for (var i = 0; i < __GET.length; i++) {
      var getVar = __GET[i].split("=");
      $_GET[getVar[0]] = typeof (getVar[1]) == "undefined" ? "" : getVar[1];
    }
    return $_GET;
  }
}