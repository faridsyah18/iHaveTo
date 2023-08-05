const inputBox = document.getElementById("input");
const listTodo = document.getElementsByClassName("list-todo");
const listContainer = document.querySelectorAll(".list-container");
const formTodo = document.querySelector(".container-form");

// Fungsi saveData() bertujuan untuk menyimpan data todo ke dalam localStorage.
function saveData() {
  localStorage.setItem("data", listTodo[0].innerHTML);

  // Setelah data disimpan, memuat kembali data dari localStorage menggunakan fungsi loadData().
  loadData();
}

// Fungsi loadData() bertujuan untuk memuat data todo dari localStorage dan menampilkan di halaman.
function loadData() {
  // Mengambil elemen todo dari localStorage dan menambahkannya ke dalam listTodo[0].
  listTodo[0].innerHTML = localStorage.getItem("data");

  // Mengambil semua elemen todo yang ada di listTodo[0].
  let todoNames = listTodo[0].querySelectorAll(".todo-name");

  // Mengambil semua elemen delete (X) yang ada di listTodo[0].
  let delTodo = listTodo[0].querySelectorAll(".x");

  // Menambahkan Event Listener ke setiap elemen todo untuk toggle class "checked" saat diklik.
  todoNames.forEach(function (todoName, index) {
    todoName.addEventListener("click", function () {
      this.classList.toggle("checked");
      saveData(); // Setelah setiap perubahan, data disimpan kembali ke localStorage.
    });

    // Menambahkan Event Listener ke setiap elemen delete (X) untuk menghapus todo saat diklik.
    let x = delTodo[index];
    x.addEventListener("click", function () {
      this.parentElement.remove();
      saveData(); // Setelah setiap perubahan, data disimpan kembali ke localStorage.
      checkListTodoKosong(); // Memeriksa apakah list todo kosong setelah menghapus.
    });
  });

  // Memeriksa apakah list todo kosong atau tidak untuk menampilkan/menyembunyikan elemen lain.
  if (listTodo[0].children.length > 0) {
    // Jika list todo tidak kosong, maka tampilkan elemen container-form dan hapus class "non-active" dari list-container.
    listContainer[0].classList.remove("non-active");
    formTodo.classList.add("v2"); // Tambahkan margin-top pada .container-form.
  } else {
    // Jika list todo kosong, maka sembunyikan elemen container-form dan tambahkan class "non-active" pada list-container.
    listContainer[0].classList.add("non-active");
    formTodo.classList.remove("v2"); // Hapus margin-top pada .container-form.
  }
}

// Fungsi addTask() bertujuan untuk menambahkan tugas baru ke dalam list todo.
function addTask() {
  if (inputBox.value === "") {
    // Jika inputBox kosong, tampilkan pesan alert "You have to write something!".
    let alertText = document.querySelector(".container-form form p");
    if (!alertText) {
      const alert = document.createElement("p");
      alert.textContent = "You have to write something!";
      const alertCont = () => {
        formTodo.children[0].appendChild(alert);
      };
      alertCont();
    }
  } else {
    // Jika inputBox tidak kosong, hilangkan pesan alert (jika ada).
    let alertText = document.querySelector(".container-form form p");
    if (alertText) {
      alertText.classList.add("not-active");
    } else {
      alertText.classList.remove("not-active");
    }

    // Membuat elemen <ul> baru untuk menampung todo baru.
    let ul = document.createElement("ul");

    // Membuat elemen <div> dengan class "todo-name".
    let todoNameDiv = document.createElement("div");
    todoNameDiv.className = "todo-name";

    // Membuat elemen <p> untuk menampilkan teks tugas.
    let taskText = document.createElement("p");
    taskText.textContent = inputBox.value;
    todoNameDiv.appendChild(taskText);

    // Menambahkan event listener untuk toggle class "checked" saat elemen todo diklik.
    todoNameDiv.addEventListener("click", function () {
      this.classList.toggle("checked");
      saveData(); // Setelah setiap perubahan, data disimpan kembali ke localStorage.
    });

    ul.appendChild(todoNameDiv);

    // Membuat elemen <div> dengan class "x" untuk tombol delete.
    let xDiv = document.createElement("div");
    xDiv.className = "x";
    ul.appendChild(xDiv);

    // Menambahkan elemen <ul> ke dalam elemen dengan class "list-todo".
    listTodo[0].appendChild(ul);
    saveData(); // Setelah menambahkan todo baru, data disimpan kembali ke localStorage.

    // Menambahkan event listener pada tombol delete (X) untuk menghapus todo saat diklik.
    xDiv.addEventListener("click", function () {
      this.parentElement.remove();
      saveData(); // Setelah setiap perubahan, data disimpan kembali ke localStorage.
      checkListTodoKosong(); // Memeriksa apakah list todo kosong setelah menghapus.
    });

    // Menghapus teks dari inputBox setelah tugas ditambahkan.
    inputBox.value = "";
    saveData(); // Setelah setiap perubahan, data disimpan kembali ke localStorage.
  }

  // Memeriksa apakah list todo kosong atau tidak untuk menampilkan/menyembunyikan elemen lain.
  if (listTodo[0].children.length > 0) {
    // Jika list todo tidak kosong, maka tampilkan elemen container-form dan hapus class "non-active" dari list-container.
    listContainer[0].classList.remove("non-active");
  } else {
    // Jika list todo kosong, maka sembunyikan elemen container-form dan tambahkan class "non-active" pada list-container.
    listContainer[0].classList.add("non-active");
  }
}

// Fungsi checkListTodoKosong() bertujuan untuk memeriksa apakah list todo kosong atau tidak.
function checkListTodoKosong() {
  // Jika list todo kosong, maka sembunyikan elemen container-form dan hapus margin-top pada .container-form.
  if (listTodo[0].children.length === 0) {
    listContainer[0].classList.add("non-active");
    formTodo.classList.remove("v2");
  } else {
    // Jika list todo tidak kosong, maka tampilkan elemen container-form dan tambahkan margin-top pada .container-form.
    formTodo.classList.add("v2");
  }
}
