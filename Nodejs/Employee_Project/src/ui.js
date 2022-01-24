export class UI {
    constructor() {
        this.employeelist = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmantInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.alertArea = document.getElementById("alert-area");
        this.employeeIdInput = document.getElementById("employeeId");
    }
    
    addAllEmployeesToUI(employees) {
        this.employeelist.innerHTML = "";
        let result = "";
        employees.forEach(employee => {
            result += `<tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`
        });

        this.employeelist.innerHTML = result;
    }

    addEmployeeToUI(employee){
        this.employeelist.innerHTML += `<tr>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>`
    }

    clearInputs(){
        this.nameInput.value = "";
        this.departmantInput.value = "";
        this.salaryInput.value = "";
        this.employeeIdInput.value = "";
        this.updateButton.style.display = "none";
    }

    showAlert(type, message) {
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        this.alertArea.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 2000);
    };
}