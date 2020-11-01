
var selectedRow = null

function onFormSubmit() {
    if (validate1() && validate2()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        }
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = [];
    formData["name"] = document.getElementById("name").value;
    formData["surname"] = document.getElementById("surname").value;
    formData["age"] = document.getElementById("age").value;
    formData["averageball"] = document.getElementById("averageball").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.surname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.averageball;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
                       
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("averageball").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("surname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("averageball").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.surname;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.averageball;
}



function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}


function validate1() {
    isValid = true;
    if (document.getElementById("surname").value == "") {
        isValid = false;
        document.getElementById("surnameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("surnameValidationError").classList.contains("hide"))
            document.getElementById("surnameValidationError").classList.add("hide");
    }
    return isValid;
}

function validate2() {
    isValid = true;
    if (document.getElementById("averageball").value == "") {
        isValid = false;
        document.getElementById("averageballValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("averageballValidationError").classList.contains("hide"))
            document.getElementById("averageballValidationError").classList.add("hide");
    }
    return isValid;
}
