// const extenstionId = "dbbkbigjhfappobnclpahjbcngellbnc";
// let messageType = "";

// function showContent(data) {
//   // document.documentElement.style.height = "100%";
//   // document.body.style.height = "100%";
//   // document.documentElement.style.width = "100%";
//   // document.body.style.width = "100%";

//   var div = document.createElement("div");
//   var shadowRoot = div.attachShadow({ mode: "open" });
//   var form = document.createElement("form");
//   var aTagShuffle = document.createElement("a");
//   var aTagCategory = document.createElement("a");
//   var shuffleButton = document.createElement("button");

//   //append all elements
//   document.body.appendChild(div);
//   // shadowRoot.appendChild(div);
//   shadowRoot.appendChild(form);
//   form.appendChild(aTagShuffle);
//   form.appendChild(aTagCategory);
//   form.appendChild(shuffleButton);
//   //set attributes for div
//   div.id = "myDivId";
//   div.style.position = "fixed";
//   div.style.top = "calc(50% - 115px)";
//   div.style.right = "20px";
//   div.style.width = "75px";
//   div.style.height = "230px";
//   div.style.backgroundColor = "transparent";
//   div.style.border = "1px solid red";
//   div.style.zIndex = 1000000;
//   div.style.background = "white";

//   //set attributes for form
//   form.action = "";

//   //set attributes for btn
//   //"btn.removeAttribute( 'style' );
//   aTagCategory.href = "https://www.google.com";
//   aTagCategory.innerHTML = "Category";
//   aTagCategory.style.position = "absolute";
//   aTagCategory.target = "_blank";
//   aTagCategory.style.top = "50%";
//   aTagCategory.style.left = "0%";

//   aTagShuffle.href = "https://www.google.com";
//   aTagShuffle.innerHTML = "Shuffle";
//   aTagShuffle.style.position = "absolute";
//   // aTagShuffle.target = '_self';
//   aTagShuffle.style.top = "10%";
//   aTagShuffle.style.left = "0%";

//   shuffleButton.innerHTML = "NextMovie";
//   shuffleButton.type = "button";
//   shuffleButton.style.position = "absolute";
//   // aTagPopup.target = "_popup";
//   shuffleButton.style.top = "70%";
//   shuffleButton.style.background = "black";
//   shuffleButton.style.color = "white";

//   shuffleButton.style.left = "0%";
//   shuffleButton.style.height = "30px";
//   shuffleButton.style.width = "100%";
//   shuffleButton.onclick = function(e) {
//     // console.log(e, this);
//     this.setAttribute("disabled", true);
//     this.innerHTML = "Loading Please Wait...";
//     sendMessage("shuffle");
//   };
//   // alert('gone');
// }
// showContent("");
// sendMessage("version");

// function sendMessage(messageType) {
//   chrome.runtime.sendMessage(extenstionId, { message: messageType }, function(reply) {
//     var requiredVersion = 1;

//     if (!reply) {
//       hasExtension = false;
//       return;
//     }

//     console.log("reply", reply);
//     switch (messageType) {
//       case "version":
//         if (reply.version) {
//           if (reply.version >= requiredVersion) {
//             hasExtension = true;
//           }
//         }
//         break;
//       case "shuffle":
//         if (reply.url) {
//           window.location.href = reply.url;
//         }
//         break;

//       default:
//         break;
//     }
//   });
// }

// // getData();
