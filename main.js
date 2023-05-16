const getPageData = ()=>{
  let data = { title: document.title, accessedOn: new Date().toLocaleString(), fileName: "", url: window.location.href};
  data.fileName = data.title.replace(/[^A-Z0-9]/gi, "-").toLowerCase();
  return data
}

const NewNotePageObsidian = () => {
  let data = getPageData()
  let blockObject = `${data.fileName}

.[source, object]
- url : ${data.url}
- accessed : ${data.accessedOn}
- title : ${data.title}

`;
  navigator.clipboard.writeText(blockObject);
};

const NewReadingListItem = () => {
  let data = getPageData()
  let blockObject = `.[${data.fileName}, object]
- url : ${data.url}
- accessed : ${data.accessedOn}
- title : ${data.title}
- read : false

`;
  navigator.clipboard.writeText(blockObject);
};

const buttons = [
  {
    title: "+ New page",
    note: "To generate a new page in Obsidian to take website notes",
    method: NewNotePageObsidian,
  },
 {
    title: "+ New Reading list item",
    note: "To generate a item to add to a reading list",
    method: NewReadingListItem,
  },
];

const generateButton = () => {
  let h = `<ul>`;
  buttons.map((btn, idx) => {
    h += `<li style="padding:2px;margin:2px">  <button title="${btn.note}" class="actionTask" data-actionIndex="${idx}">${btn.title}</button>  </li>`;
  });
  h += "</ul>";
  return h;
};

const loadHTMLModel = () => {
  let btncontent = generateButton();
	// https://www.codexworld.com/simple-modal-popup-javascript-css/
  let html = `<style>.mpopup{display:none;position:fixed;z-index:1;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.4)}.modal-content,.modal-footer,.modal-header{background-color:#fff}.modal-content{position:relative;margin:auto;padding:0;width:450px;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);-webkit-animation-name:animatetop;-webkit-animation-duration:.4s;animation-name:animatetop;animation-duration:.4s;border-radius:.3rem}.modal-body,.modal-header{padding:2px 12px}.modal-header{color:#333;border-bottom:1px solid #e9ecef;border-top-left-radius:.3rem;border-top-right-radius:.3rem}.modal-header h2{font-size:1.25rem;margin-top:14px;margin-bottom:14px}.modal-footer{padding:1rem;color:#333;border-top:1px solid #e9ecef;border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;text-align:right}.close{color:#888;float:right;font-size:28px;font-weight:700}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer}@-webkit-keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}@keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}</style>
	<div id="mpopupBox" class="mpopup"><div class="modal-content">
  <div class="modal-header"><span class="close">x</span><h2>Automation tasks</h2></div>
  <div class="modal-body">${btncontent}</div>
  <div class="modal-footer1"></div></div></div>`;
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = html;
  document.body.insertAdjacentElement("beforeend", modalDiv);
};

/** to load the modal with functionality */
modalHTMLLoaded = false;
const loadModal = () => {
  if (!modalHTMLLoaded) {
    // include modal html if not already loaded
    loadHTMLModel();
    modalHTMLLoaded = true;
  }
  var mpopup = document.getElementById("mpopupBox");
  mpopup.style.display = "block";
  // Close modal once close element is clicked
  var close = document.getElementsByClassName("close")[0];
  close.onclick = function () {
    mpopup.style.display = "none";
  };

	// https://stackoverflow.com/a/19655662
  var elements = document.getElementsByClassName("actionTask");
  var myFunction = function () {
    var attribute = this.getAttribute("data-actionIndex");
    // alert(attribute);
		let theButton = buttons[parseInt(attribute)]
		theButton.method()
  };
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", myFunction, false);
  }

};
// window.onload = async function () {
//   loadModal();
// };
loadModal();