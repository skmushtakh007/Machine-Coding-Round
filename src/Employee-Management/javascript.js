(async function () {
  // Step - 1
  const data = await fetch('data.json');
  const res = await data.json();
  let employee = res;
  let selectedEmployeeId = employee[0].id;
  let selectedEmployee = employee[0];

  // Step - 2
  const employeeList = document.querySelector('.employees__names--list');
  const employeeInfo = document.querySelector('.employees__single--info');


  //Add Employee login later
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  addEmployeeForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val)=>{
      empData[val[0]] = val[1];
    });
    empData.id = employee[employee.length - 1].id + 1;
    empData.age  = new Date().getFullYear()- parseInt(empData.dob.slice(0,4),10);
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employee.push(empData);
    renderEmployee();      // Re-rendering whole thing
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  })


  // Step - 3.4  Select employee Logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployee();
      // Step - 3.5  render single employee
      renderSingleEmployee();
    }

    if(e.target.tagName === "I"){
      employee = employee.filter(
        (emp)=> String(emp.id) !== e.target.parentNode.id
      );
      if(String(selectedEmployeeId) === e.target.parentNode.id){
        selectedEmployeeId =employee[0]?.id || -1;
        selectedEmployee = employee[0] || {};
        renderSingleEmployee();
      }
    }
  })

  // Step - 3 
  const renderEmployee = () => {
    employeeList.innerHTML = "";
    employee.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee__names--item");

      // Step - 3.1   Logic after clicking on employee
      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");  //span
        selectedEmployee = emp;
      }
      // Step - 3.2
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
      employeeList.append(employee);
    })
  }

  // Step - 4  Render Single Employee
  const renderSingleEmployee = () => {
    //deleting employee


    employeeInfo.innerHTML = `<img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}</span>
        <span>${selectedEmployee.address}</span>
        <span>Email - ${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `
  }
  if (selectedEmployee) renderSingleEmployee();
  renderEmployee();
}) ();