const inputBox = document.getElementById("input");
const listTodo = document.getElementsByClassName("list-todo");
const listContainer = document.querySelectorAll(".list-container");
const formTodo = document.querySelector(".container-form");

function saveData() {
  localStorage.setItem("data", listTodo[0].innerHTML);

  loadData();
}

function loadData() {
  listTodo[0].innerHTML = localStorage.getItem("data");

  // Mengambil semua elemet todo
  let todoNames = listTodo[0].querySelectorAll(".todo-name");

  // Mengambil semua elemen X
  let delTodo = listTodo[0].querySelectorAll(".x");

  // Menambahkan Event Listener ke element todo-name
  todoNames.forEach(function (todoName, index) {
    todoName.addEventListener("click", function () {
      this.classList.toggle("checked");
      saveData();
    });

    // Menambahkan Event Listener ke element logo delete
    let x = delTodo[index];
    x.addEventListener("click", function () {
      this.parentElement.remove();
      saveData();
      checkListTodoKosong();
    });
  });

  // Cek jika tidak ada element di dalam list todo
  if (listTodo[0].children.length > 0) {
    // Menghapus class "non-active" dari class list-container
    listContainer[0].classList.remove("non-active");
    // Menambah margin-top pada .container-form
    formTodo.classList.add("v2");
  } else {
    // Menambahkan class "non-active" ke class list-container
    listContainer[0].classList.add("non-active");
    // Menghapus margin-top pada .container-form
    formTodo.classList.remove("v2");
  }
}

loadData();

function addTask() {
  if (inputBox.value === "") {
    alert("You should write something!");
  } else {
    // Membuat elemen <ul> baru
    let ul = document.createElement("ul");

    // Membuat elemen <div> dengan class "ClistContainer-name"
    let todoNameDiv = document.createElement("div");
    todoNameDiv.className = "todo-name";

    // Membuat elemen <p> untuk teks tugas
    let taskText = document.createElement("p");
    taskText.textContent = inputBox.value;
    todoNameDiv.appendChild(taskText);

    // Menambahkan event listener untuk mengubah class saat diklik
    todoNameDiv.addEventListener("click", function () {
      this.classList.toggle("checked");
      saveData();
    });

    ul.appendChild(todoNameDiv);

    // Membuat elemen <div> dengan class "x"
    let xDiv = document.createElement("div");
    xDiv.className = "x";
    ul.appendChild(xDiv);

    // Menambahkan elemen <ul> ke dalam elemen dengan class "list-todo"
    listTodo[0].appendChild(ul);
    saveData();

    // Menambahkan event listener untuk menghapus list todo saat diklik x
    xDiv.addEventListener("click", function () {
      this.parentElement.remove();
      saveData();
      // Menjalankan Fungsi checkListTodoKosong
      checkListTodoKosong();
    });

    // Menghapus teks dari inputBox setelah tugas ditambahkan
    inputBox.value = "";
    saveData();
  }

  // Cek jika tidak ada element di dalam list todo
  if (listTodo[0].children.length > 0) {
    // Menghapus class "non-active" dari class list-container
    listContainer[0].classList.remove("non-active");
  } else {
    // Menambahkan class "non-active" ke class list-container
    listContainer[0].classList.add("non-active");
  }
}

function checkListTodoKosong() {
  // Cek jika tidak ada elemen di dalam list-todo
  if (listTodo[0].children.length === 0) {
    // Menambahkan class "non-active" ke class list-container
    listContainer[0].classList.add("non-active");
    // Menghapus margin-top pada .container-form
    formTodo.classList.remove("v2");
  } else {
    // Menambah margin-top pada .container-form
    formTodo.classList.add("v2");
  }
}