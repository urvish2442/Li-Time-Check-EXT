
let myImage = `url("https://media.tenor.com/GKV5z3gt17MAAAAC/birthday-celebrate.gif?${moment().format('DD-MM-YYYY')}")`;


// let myImage = `url("http://192.168.0.52/images/white.gif")`;
document.documentElement.style
    .setProperty('--backgroundImage', myImage);

setTimeout(() => {
  document.body.classList.add("animate");
}, 1000);

let counter = 0;
if (new Date('2025-06-02').getTime() <= new Date().getTime()) {
  document.getElementById("mainDiv").innerHTML = `
  <h1>This Version is Expired <br><br>Please Update Your Version</h1>
  <a style="position:absolute" target="_blank" href="https://www.dropbox.com/sh/aswxfestxrxptpi/AADOVUnmNhiyU0Woom3hgJ4fa?dl=0">
    <h1> Check This Link For New Version</h1>
  </a>
  `;
} else {

  getData();

  document.getElementById("todayDate").innerHTML = moment().format("ddd, DD-MMM-YY");


  chrome.storage.sync.get(["themeMode"], e => {
    if (e.themeMode === "dark") {
      toogleMode();
    }
  });

  chrome.storage.sync.get(["last_updated"], e => {
    document.getElementById("last_updated").innerHTML = e.last_updated;
  });
  chrome.storage.sync.get(["t_required_hour"], e => {
    document.getElementById("t_required_hour").innerHTML = e.t_required_hour;
  });
  chrome.storage.sync.get(["t_total_hour"], e => {
    document.getElementById("t_total_hour").innerHTML = e.t_total_hour;
  });
  chrome.storage.sync.get(["t_working_hour"], e => {
    document.getElementById("t_working_hour").innerHTML = e.t_working_hour;
  });
  chrome.storage.sync.get(["t_completesAt"], e => {
    document.getElementById("completesAt").innerHTML = e.t_completesAt;
  });
  chrome.storage.sync.get(["t_break_hour"], e => {
    document.getElementById("t_break_hour").innerHTML = e.t_break_hour;
  });
  chrome.storage.sync.get(["todaysRemaining"], e => {
    document.getElementById("todaysRemaining").innerHTML = e.todaysRemaining;
  });
  chrome.storage.sync.get(["weeksRemainingHours"], e => {
    document.getElementById("weeksRemainingHours").innerHTML = e.weeksRemainingHours;
  });
  chrome.storage.sync.get(["leaveHours"], e => {
    document.getElementById("leaveHoursInput").value = e.leaveHours;
      onChangeLeaveHours();
  });
  completesAt

  // console.log('chrome.system.cpu', );
  // chrome.system.cpu.getInfo(e => {
  //   console.log("cpu", e);
  // });
  // chrome.system.storage.getInfo(e => {
  //   console.log("storage", e);
  // });
  // chrome.system.memory.getInfo(e => {
  //   console.log("memory", e);
  // });
  // chrome.system.display.getInfo(e => {
  //   console.log("display", e);
  // });
  // setTimeout(() => {
  // console.log(isShowBadge);
  // const elementShowBadge = document.getElementById("showBadge");
  // if (elementShowBadge) {
  //   elementShowBadge.onclick = onClickShowBadge;
  // }
  document.getElementById("sunIcon").onclick = toogleMode;
  document.getElementById("moonIcon").onclick = toogleMode;
  document.getElementById("leaveHoursInput").onchange = onChangeLeaveHours;
  // }, 1000);

  // function onClickShowBadge(element) {
  //   chrome.storage.sync.set({ show_badge: element.target.checked }, () => {
  //     toggleBadge();
  //   });
  // }


  function getRemainingTime(hhmmss) {
    var seconds = moment.duration(hhmmss).asSeconds();
    return moment()
      .seconds(seconds)
      .format("hh:mm:ss");
  }

  function toogleMode() {
    const container = document.querySelector(".li-time-popup");
    // console.log(container.className);
    if (container.className.includes("dark")) {
      container.className = "li-time-popup";
      chrome.storage.sync.set({
        themeMode: "light"
      });
    } else {
      container.className = "li-time-popup dark";
      chrome.storage.sync.set({
        themeMode: "dark"
      });
    }
  }

  // document.getElementsByTagName("body")[0].onclick = onBodyClick;

  // function onBodyClick() {
  //   counter++;
  //   // console.log("gone");
  //   if (counter > 6) {
  //     alert("સુકામ પિન મારો છો .. નવરા લાગો છો..");
  //     counter = 0;
  //   }
  // }

  // ,
  //   "chrome_url_overrides": {
  //     "newtab": "popup.html"
  //   }
}