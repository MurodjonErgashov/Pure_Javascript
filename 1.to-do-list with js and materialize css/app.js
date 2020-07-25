const btn = document.querySelector("input.btn");
const ul = document.querySelector("ul.collection");
const input = document.getElementById("task");
const clearTasks = document.querySelector("a.clear-tasks ");

// input change
input.addEventListener("keypress", onChange);
function onChange(e) {
  input.setAttribute("value", e.target.value);
}

btn.addEventListener("click", addTask);
function addTask(e) {
  let li = createLi();
  console.log(li);
  ul.appendChild(li);
  input.setAttribute("value", "");
  e.preventDefault();
}

// crate li
function createLi() {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  li.className = "collection-item";
  // create link
  let link = document.createElement("a");
  link.setAttribute("href", "#");
  link.className = "delete-item secondary-content";
  link.innerHTML = `<i class="fa fa-remove"></i>`;

  li.appendChild(link);
  return li;
}

// DELETE ONE ITEM
document.body.addEventListener("click", function (e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
  e.preventDefault();
});

// CLEAR ITEMS ALL
clearTasks.addEventListener("click", function (e) {
  var child = ul.lastElementChild;
  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
  e.preventDefault();
});
