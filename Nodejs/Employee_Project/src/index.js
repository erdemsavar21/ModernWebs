import { Request } from "./request";
import { UI } from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmantInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeIdInput = document.getElementById("employeeId");
const employeeList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

eventListners();

function eventListners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeeList.addEventListener("click", UpdateOrDeleteEmployee);
    updateEmployeeButton.addEventListener("click",updateEmployee);
}

function getAllEmployees() {
    request.get()
        .then(employess => ui.addAllEmployeesToUI(employess))
        .catch(err => console.log(err));
}

function addEmployee(e) {
    const employeeName = nameInput.value.trim();
    const employeeDepartman = departmantInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartman === "" || employeeSalary === "") ui.showAlert("danger", "Please fill all areas..");
    else request.post({ name: employeeName, department: employeeDepartman, salary: Number(employeeSalary) })
        .then(employee => { ui.addEmployeeToUI(employee); ui.showAlert("info", "Employee added"); })
        .catch(err => ui.showAlert("danger", err));

    ui.clearInputs();
    e.preventDefault();
}

function updateEmployee(e) {
    const employeeName = nameInput.value.trim();
    const employeeDepartman = departmantInput.value.trim();
    const employeeSalary = salaryInput.value.trim();
    const employeeId = Number(employeeIdInput.value);

    if (employeeName === "" || employeeDepartman === "" || employeeSalary === "") ui.showAlert("danger", "Please fill all areas..");
    else request.patch(employeeId,{ name: employeeName, department: employeeDepartman, salary: Number(employeeSalary) })
        .then(employee => { getAllEmployees(); ui.clearInputs(); ui.showAlert("info", "Employee updated"); })
        .catch(err => ui.showAlert("danger", err));

    ui.clearInputs();
    e.preventDefault();
}

function UpdateOrDeleteEmployee(e) {
    if (e.target.id === "delete-employee") {
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        request.delete(id)
            .then(response => {
                getAllEmployees();
                ui.clearInputs();
                ui.showAlert("info", response);
            })
            .catch(err => console.log(err));
    } else if (e.target.id === "update-employee") {
        const id = e.target.parentElement.previousElementSibling.textContent;
        const salary = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const department = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        ui.clearInputs();
        nameInput.value = name;
        departmantInput.value = department;
        salaryInput.value = salary.toString();
        employeeIdInput.value = id;
        updateEmployeeButton.style.display = "block";
    }else{
        
    }
}

// request.get()
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

// request.post(  {
//     "name": "Umut Savar",
//     "department": "Salary",
//     "salary": 5000
// })
// .then(response => console.log(response))
// .catch(err => console.log(err));



