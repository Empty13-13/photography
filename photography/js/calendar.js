let date1 = document.querySelector('#date1')
let calendarList1 = document.querySelector('#calendarList1')
let date2 = document.querySelector('#date2')
let calendarList2 = document.querySelector('#calendarList2')

if (date1 && calendarList1) {
  // region Vars
  let now = new Date()
  let next = new Date()
  next.setMonth(next.getMonth() + 1)
  let startNow = new Date()
  let startNext = new Date(next.valueOf())
  startNext.setFullYear(startNext.getFullYear() + 1)
  let month = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
  // endregion

  // region AddEventListeners
  let calendarBtns = document.querySelectorAll('.calendar-block-calendar__list-days');
  if (calendarBtns.length) {
    calendarBtns.forEach(item => {
      item.addEventListener("click", function (e) {
        let targetItem = e.target
        if (targetItem.closest('.calendar-block-calendar__day')) {
          let activeTarget = targetItem.closest('.calendar-block-calendar__day')
          if (!activeTarget.classList.contains('_full')) {
            if ((new Date()).setDate(activeTarget.innerText) >= startNow) {
              let activeBtn = document.querySelector('.calendar-block-calendar__day._active');
              if (activeBtn) {
                activeBtn.classList.remove('_active')
              }
              activeTarget.classList.add('_active')

              if (activeTarget.parentNode.id === 'calendarList2') {
                next.setDate(activeTarget.innerText)
              } else {
                now.setDate(activeTarget.innerText)
              }
              let date = now.getDate()
              let month = now.getMonth() + 1
              let year = now.getFullYear()
              console.log(date, month, year)
              window.location.href = `/reservation.html?date=${date}&month=${month}&year=${year}`
            }
          }
        }
      });
    })
  }
  // endregion

  print()

  // region Arrows
  let arrowLeft = document.querySelector('.block-calendar__arrow._left')
  let arrowRight = document.querySelector('.block-calendar__arrow._right')
  if (arrowLeft && arrowRight) {
    arrowLeft.addEventListener("click", function (e) {
      now.setMonth(now.getMonth() - 1)
      next.setMonth(next.getMonth() - 1)
      if (now < startNow) {
        now.setMonth(now.getMonth() + 1)
        next.setMonth(next.getMonth() + 1)
      } else {
        print()
      }
    });

    arrowRight.addEventListener("click", function (e) {
      now.setMonth(now.getMonth() + 1)
      next.setMonth(next.getMonth() + 1)
      if (next > startNext) {
        now.setMonth(now.getMonth() - 1)
        next.setMonth(next.getMonth() - 1)
      } else {
        print()
      }
    });
  }
  // endregion

  //Function of print data
  function print() {
    calendarList1.innerHTML = ""
    calendarList2.innerHTML = ""
    data = calculateDate()

    //add grayed days
    for (let i = 0; i < data.firstDay1 - 1; i++) {
      calendarList1.append(createDay())
    }
    for (let i = 0; i < data.firstDay2 - 1; i++) {
      calendarList2.append(createDay())
    }

    //add other days
    for (let i = 0; i < data.days1; i++) {
      let date = (new Date(now.valueOf())).setDate(i + 1)
      if (date < startNow) {
        calendarList1.append(createDay(i + 1,true))
      } else {
        calendarList1.append(createDay(i + 1))
      }
    }
    for (let i = 0; i < data.days2; i++) {
      calendarList2.append(createDay(i + 1))
    }

    date1.textContent = `${month[now.getMonth()]} ${now.getFullYear()} г.`
    date2.textContent = `${month[next.getMonth()]} ${next.getFullYear()} г.`

    function calculateDate() {
      let days1 = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      let firstDay1 = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-01`).getDay()
      firstDay1 = (firstDay1 === 0) ? 7 : firstDay1

      let days2 = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
      let firstDay2 = new Date(`${next.getFullYear()}-${next.getMonth() + 1}-01`).getDay()
      firstDay2 = (firstDay2 === 0) ? 7 : firstDay2

      return {firstDay1, days1, firstDay2, days2}
    }

    function createDay(day, nope = false) {
      let div = document.createElement('div')
      if (day) {
        div.classList.add('calendar-block-calendar__day')
        div.innerText = day
      } else {
        div.classList.add('_grayed')
      }
      if (nope) {
        div.classList.add('_nope')
      }
      return div
    }
  }
}