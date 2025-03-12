// chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
//   var url = tabs[0].url;
//   console.log("tabs", tabs);
// });

// chrome.history.search({ text: '', maxResults: 1000 }, function(data) {
//   data.forEach(function(page) {
//     console.log(page.url);
//   });
// });

let isShowBadge = false;

// Reload extension manually chrome.runtime.reload()
chrome.runtime.onStartup.addListener(function () {
  // console.log("onStartup");
  // toggleBadge();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(tabId, changeInfo, tab);
  //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
});

chrome.runtime.onInstalled.addListener(function () {
  // console.log("onInstalled");
  // toggleBadge();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request) {
    if (request.message) {
      if (request.message == "version") {
        sendResponse({ version: 1.0 });
      }
    }
  }
  return true;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active) {
    // do your things
    if (tab.url.includes("lipl.payrollonair.com")) {
      chrome.browserAction.setIcon({ path: "./logo_colored.png", tabId });
    }
    if (
      tab.url === "https://lipl.payrollonair.com/attendanceweek/currentweekcal"
    ) {
      // chrome.tabs.discard(tabId);
    }
  }
  // console.log(tabId, changeInfo, tab);
});

function getCookies(domain, name) {
  return chrome.cookies.get({ url: domain, name: name }, function (cookie) {
    // console.log(cookie.value);
    return cookie.value;
  });
}

async function getData() {
  // return;
  await fetch(
    "https://lipl.payrollonair.com/attendanceweek/getCurrentWeekCalData?employeeId=475",
    {
      headers: {
        // "X-CSRF-TOKEN": "Ge7gDPgQsRNUWPZp3w6dPWwztQhJAOYiPHnCvSpj",
        "X-CSRF-TOKEN": getCookies(
          "https://lipl.payrollonair.com",
          "XSRF-TOKEN"
        ),
        "Content-type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.redirected) {
        document.getElementById("mainDiv").innerHTML =
          "<span>Please <a href='https://lipl.payrollonair.com/dashboard' target='_blank'>Login</a> To Continue</span>";
        setTimeout(() => {
          alert("Please Login To Continue");
          window.open("https://lipl.payrollonair.com//dashboard");
        }, 1);
      } else {
        return res.json();
      }
    })
    .then((res) => {
      console.log(res);
      const {
        t_required_hour,
        t_total_hour,
        t_working_hour,
        t_break_hour,
        data,
      } = res;
      if (t_required_hour && t_total_hour && t_working_hour && t_break_hour) {
        // chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000" });

        toggleBadge();

        chrome.storage.sync.set({ t_required_hour: t_required_hour });
        chrome.storage.sync.set({ t_total_hour: t_total_hour });
        chrome.storage.sync.set({ t_working_hour: t_working_hour });
        chrome.storage.sync.set({ t_break_hour: t_break_hour });
        chrome.storage.sync.set({ last_updated: new Date().toLocaleString() });
        chrome.storage.sync.set({
          todaysRemaining: getTodaysRemainingHours(data, t_working_hour),
        });
        chrome.storage.sync.set({
          t_completesAt: getRemainingTime(
            getTodaysRemainingHours(data, t_working_hour)
          ),
        });
        chrome.storage.sync.set({
          weeksRemainingHours: getWeeksRemainingHours(
            t_required_hour,
            t_working_hour
          ),
        });

        chrome.storage.sync.get(["t_required_hour"], (e) => {
          document.getElementById("t_required_hour").innerHTML =
            e.t_required_hour;
            console.log(e);
        });
        chrome.storage.sync.get(["t_total_hour"], (e) => {
          document.getElementById("t_total_hour").innerHTML = e.t_total_hour;
        });
        chrome.storage.sync.get(["t_working_hour"], (e) => {
          document.getElementById("t_working_hour").innerHTML =
            e.t_working_hour;
        });
        chrome.storage.sync.get(["t_break_hour"], (e) => {
          document.getElementById("t_break_hour").innerHTML = e.t_break_hour;
        });
        chrome.storage.sync.get(["last_updated"], (e) => {
          document.getElementById("last_updated").innerHTML = e.last_updated;
        });
        chrome.storage.sync.get(["todaysRemaining"], (e) => {
          document.getElementById("todaysRemaining").innerHTML =
            e.todaysRemaining;
          document
            .getElementById("todaysRemaining")
            .setAttribute(
              "data-title",
              "થઈ ગ્યા" == e.todaysRemaining
                ? "હવે તમે ઘર ભેંગીના થાવ રાહ કોની જોવો છો "
                : getRemainingTime(e.todaysRemaining) + " વાગે ઘરે જવાનું થાશે"
            );
          if ("થઈ ગ્યા" == e.todaysRemaining) {
            document.getElementById("todaysRemaining").className =
              "li-color-primary";
          }
        });
        chrome.storage.sync.get(["weeksRemainingHours"], (e) => {
          document.getElementById("weeksRemainingHours").innerHTML =
            e.weeksRemainingHours;
          document.getElementById("weeksRemainingHours").innerHTML =
            e.weeksRemainingHours;
        });
        chrome.storage.sync.get(["leaveHours"], (e) => {
          document.getElementById("leaveHoursInput").value = e.leaveHours || 0;
          onChangeLeaveHours();
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function onChangeLeaveHours() {
  var element = document.getElementById("leaveHoursText");
  var leaveHoursInput = document.getElementById("leaveHoursInput");
  var todaysRemaining = document.getElementById("todaysRemaining").innerHTML;
  var todaysRemainingInSeconds = moment.duration(todaysRemaining).asSeconds();
  var leaveHours = moment
    .duration(leaveHoursInput.value + ":00:00")
    .asSeconds();
  var diffrence = todaysRemainingInSeconds - leaveHours;

  if (Math.sign(leaveHoursInput.value) === -1) {
    element.innerHTML = "પપ્પુ છો?";
    return;
  }

  if (Math.sign(diffrence) === -1) {
    element.innerHTML = "નક્કી તારામાં ખર્ચો છે";
    return;
  }
  var remainingHours = moment()
    .startOf("day")
    .seconds(diffrence)
    .format("HH:mm:ss");
  var remainingTime = getRemainingTime(remainingHours);

  element.innerHTML = remainingHours;
  element.setAttribute("data-title", remainingTime);
  chrome.storage.sync.set({ leaveHours: leaveHoursInput.value });
}

function getRemainingTime(hhmmss) {
  var seconds = moment.duration(hhmmss).asSeconds();
  return moment().seconds(seconds).format("hh:mm:ss");
}

// function getTodaysRemainingHours(data, t_working_hour) {
//   // todaysRemaining starts
//   // var tillDateTotalHours = (data.chartDataArr.length + 1) * 8 + ":00:00";
//   var tillDateTotalHours = (data.chartDataArr.length + 1) * 8 + `:${(data.chartDataArr.length + 1) * 36}:00`;

//   var sum = 0;
//   for (i = 0; i < data.chartDataArr.length; i++) {
//     sum += moment.duration(data.chartDataArr[i].working_hour).asSeconds();
//   }
//   var total = moment.duration(tillDateTotalHours).asSeconds();
//   if (data.chartDataArr.length === 4 ){
//     total = sum + 30960
//   }
//   // console.log(tillDateTotalHours); // 48:00:00 something like
//   // var total = moment.duration(tillDateTotalHours).asSeconds();
//   var worked = moment.duration(t_working_hour).asSeconds();
//   if (total - worked < 0) {
//     return "થઈ ગ્યા";
//   }
function getTodaysRemainingHours(data, t_working_hour) {
  // todaysRemaining starts
  // var tillDateTotalHours = (data.chartDataArr.length + 1) * 8 + ":00:00";
  console.log(data, "Data>>>>>>")
  var tillDateTotalHours =
    (data.chartDataArr.length + 1) * 8 +
    `:${(data.chartDataArr.length + 1) * 36}:00`;

  var sum = 0;
  for (i = 0; i < data.chartDataArr.length; i++) {
    sum += moment.duration(data.chartDataArr[i].working_hour).asSeconds();
  }
  var total = moment.duration(tillDateTotalHours).asSeconds();
  if (data.chartDataArr.length === 5) {
    total = sum + 30960;
  }
  // console.log(tillDateTotalHours); // 48:00:00 something like
  // var total = moment.duration(tillDateTotalHours).asSeconds();
  var worked = moment.duration(t_working_hour).asSeconds();
  if (total - worked < 0) {
    return "થઈ ગ્યા";
  }

  var momentInSeconds = moment.duration(total - worked, "seconds");
  todaysRemaining =
    ("0" + Math.floor(momentInSeconds.asHours())).slice(-2) +
    ":" +
    ("0" + momentInSeconds.minutes()).slice(-2) +
    ":" +
    ("0" + momentInSeconds.seconds()).slice(-2);
  return todaysRemaining;
  // todaysRemaining ends
}

function getWeeksRemainingHours(t_required_hour, t_working_hour) {
  var required = moment.duration(t_required_hour).asSeconds();
  var worked = moment.duration(t_working_hour).asSeconds();

  // console.log(required, worked);
  if (required - worked < 0) {
    return "થઈ ગ્યા";
  }
  var momentInSeconds = moment.duration(required - worked, "seconds");
  weeksRemainingHours =
    ("0" + Math.floor(momentInSeconds.asHours())).slice(-2) +
    ":" +
    ("0" + momentInSeconds.minutes()).slice(-2) +
    ":" +
    ("0" + momentInSeconds.seconds()).slice(-2);
  // console.log(weeksRemainingHours);
  return weeksRemainingHours;
}

function toggleBadge() {
  chrome.storage.sync.get(["show_badge"], (e) => {
    chrome.browserAction.setBadgeText({ text: "" });
    if (e.show_badge) {
      isShowBadge = e.show_badge;
      chrome.storage.sync.get(["t_working_hour"], (e) => {
        chrome.browserAction.setBadgeText({ text: e.t_working_hour });
      });
    }
  });
}

// front end code to verify extenstion installation
// var hasExtension = false;
// var requiredVersion = 1;

// chrome.runtime.sendMessage("dbbkbigjhfappobnclpahjbcngellbnc", { message: "version" },
//     function (reply) {
//         if (reply) {
//             if (reply.version) {
//                 if (reply.version >= requiredVersion) {
//                     hasExtension = true;
//                 }
//             }
//         }
//         else {
//           hasExtension = false;
//         }
//     });

// chrome.management.onDisabled.addListener(function() {
//   window.close();
// });
// get
// moment("2015-01-01").startOf('day')
//     .seconds(s)
//     .format('H:mm:ss');
