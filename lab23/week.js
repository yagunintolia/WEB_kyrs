let lang = askLang();

function askLang() {
    let lng = prompt('Виберіть мову "ua" або "en"?');
    if (lng === null) {
        return askLang();
    }
    lng = lng.toLowerCase();
    if (lng === 'ua' || lng === 'en') {
      return lng;
    }
    else {
      alert('Некоректна відровідь("ua" або "en")');
      return askLang();
    }
}

const weekdayArr = {
    "Ask": {
        "en": "Enter the day number of the week (from 1 to 7)?",
        "ua": "Введіть номер дня неділі від 1 до 7?",
    },
    "Err": {
        "en": "Wrong data input! Try again!",
        "ua": "Введені неправильні дані! Спробуйте ще раз!",
    },
    "1": {
        "en": "Monday",
        "ua": "Понеділок",
    },
    "2": {
        "en": "Tuesday",
        "ua": "Вівторок",
    },
    "3": {
        "en": "Wednesday",
        "ua": "Середа",
    },
    "4": {
        "en": "Thursday",
        "ua": "Четвер",
    },
    "5": {
        "en": "Friday",
        "ua": "П’ятниця",
    },
    "6": {
        "en": "Saturday",
        "ua": "Субота",
    },
    "7": {
        "en": "Sunday",
        "ua": "Неділя",
    }
};

function askWeekday() {
    let num = prompt(weekdayArr["Ask"][lang]);
    if (num === null) {
        return askWeekday();
    }
    if (num >= 1 && num <= 7) {
        num = Math.trunc(num)
        alert(weekdayArr[num][lang]);
    }
    else {
      alert(weekdayArr["Err"][lang]);
      return askWeekday();
    }
}

askWeekday() 