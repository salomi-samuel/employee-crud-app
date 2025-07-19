let token = "";

// LOGIN
window.login = async function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById("login-form").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    getEmployees();
  } else {
    alert("Login failed");
  }
};

// CREATE
window.createEmployee = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const department = document.getElementById("department").value;
  const salary = document.getElementById("salary").value;

  const res = await fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, department, salary }),
  });

  if (res.ok) {
    alert("Employee added");
    clearForm();
    getEmployees();
  } else {
    alert("Error adding employee");
  }
};

// GET ALL
async function getEmployees() {
  const res = await fetch("/api/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const employees = await res.json();
  const list = document.getElementById("employee-list");
  list.innerHTML = "";

  employees.forEach((emp) => {
    const item = document.createElement("li");
    item.textContent = `${emp.name} (${emp.email}) - ₹${emp.salary}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteEmployee(emp._id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Update";
    editBtn.onclick = () => populateForm(emp);

    item.appendChild(delBtn);
    item.appendChild(editBtn);

    list.appendChild(item);
  });
}

// UPDATE
window.updateEmployee = async function () {
  const id = document.getElementById("emp-id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const department = document.getElementById("department").value;
  const salary = document.getElementById("salary").value;

  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, department, salary }),
  });

  if (res.ok) {
    alert("Employee updated");
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("update-btn").style.display = "none";
    clearForm();
    getEmployees();
  } else {
    alert("Error updating employee");
  }
};

// DELETE
async function deleteEmployee(id) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    alert("Employee deleted");
    getEmployees();
  } else {
    alert("Error deleting employee");
  }
}

// POPULATE FOR EDITING
function populateForm(emp) {
  document.getElementById("emp-id").value = emp._id;
  document.getElementById("name").value = emp.name;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("salary").value = emp.salary;

  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("update-btn").style.display = "inline-block";
}

// CLEAR FORM
function clearForm() {
  document.getElementById("emp-id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("department").value = "";
  document.getElementById("salary").value = "";
}
