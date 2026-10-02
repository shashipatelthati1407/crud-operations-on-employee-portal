import { useEffect, useState } from "react";
import "./App.css";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
  // =========================
  // EMPLOYEE LIST
  // =========================
  const [employees, setEmployees] = useState([]);

  // =========================
  // ADD EMPLOYEE
  // =========================
  const [ename, setEname] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // =========================
  // SEARCH EMPLOYEE
  // =========================
  const [searchId, setSearchId] = useState("");
  const [searchEmployee, setSearchEmployee] = useState(null);

  // =========================
  // UPDATE EMPLOYEE
  // =========================
  const [updateId, setUpdateId] = useState("");
  const [updateEname, setUpdateEname] = useState("");
  const [updateSalary, setUpdateSalary] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updateState, setUpdateState] = useState("");

  // =========================
  // GET ALL EMPLOYEES
  // =========================
  const getEmployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:9989/api/v1/getEmpList"
      );

      const data = await response.json();

      console.log("Employees from backend:", data);

      setEmployees(data);

    } catch (error) {
      console.log(error);
      alert("Could not connect to Spring Boot");
    }
  };

  // =========================
  // CREATE EMPLOYEE
  // =========================
  const createEmployee = async () => {

    if (
      ename.trim() === "" ||
      salary === "" ||
      age === "" ||
      city.trim() === "" ||
      state.trim() === ""
    ) {
      alert("Please fill all employee details");
      return;
    }

    const employee = {
      ename: ename,
      salary: Number(salary),
      age: Number(age),
      city: city,
      state: state
    };

    try {

      const response = await fetch(
        "http://localhost:9989/api/v1/createEmp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        }
      );

      if (response.ok) {

        alert("Employee added successfully!");

        setEname("");
        setSalary("");
        setAge("");
        setCity("");
        setState("");

        getEmployees();

      } else {

        alert("Employee could not be created");

      }

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

    }
  };

  // =========================
  // DELETE EMPLOYEE
  // =========================
  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete Employee " + id + "?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:9989/api/v1/delEmp/" + id,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {

        alert("Employee deleted successfully!");

        getEmployees();

      } else {

        alert("Employee could not be deleted");

      }

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

    }
  };

  // =========================
  // GET EMPLOYEE BY ID
  // =========================
  const getEmployeeById = async () => {

    if (searchId === "") {
      alert("Please enter Employee ID");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:9989/api/v1/getEmp/" + searchId
      );

      if (response.ok) {

        const data = await response.json();

        setSearchEmployee(data);

      } else {

        alert("Employee not found");

        setSearchEmployee(null);

      }

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

    }
  };

  // =========================
  // START UPDATE
  // =========================
  const startUpdate = (employee) => {

    setUpdateId(employee.eid);
    setUpdateEname(employee.ename);
    setUpdateSalary(employee.salary);
    setUpdateAge(employee.age);
    setUpdateCity(employee.city);
    setUpdateState(employee.state);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

  // =========================
  // UPDATE EMPLOYEE
  // =========================
  const updateEmployee = async () => {

    if (updateId === "") {

      alert("Please select an employee");

      return;
    }

    const employee = {};

    if (updateEname.trim() !== "") {
      employee.ename = updateEname;
    }

    if (updateSalary !== "") {
      employee.salary = Number(updateSalary);
    }

    if (updateAge !== "") {
      employee.age = Number(updateAge);
    }

    if (updateCity.trim() !== "") {
      employee.city = updateCity;
    }

    if (updateState.trim() !== "") {
      employee.state = updateState;
    }

    if (Object.keys(employee).length === 0) {

      alert("Please enter at least one field");

      return;
    }

    try {

      const response = await fetch(
        "http://localhost:9989/api/v1/updateEmp/" + updateId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        }
      );

      if (response.ok) {

        alert("Employee updated successfully!");

        getEmployees();

        setUpdateId("");
        setUpdateEname("");
        setUpdateSalary("");
        setUpdateAge("");
        setUpdateCity("");
        setUpdateState("");

      } else {

        alert("Employee could not be updated");

      }

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

    }
  };

  // =========================
  // PAGE LOAD
  // =========================
  useEffect(() => {

    getEmployees();

  }, []);

  // =========================
  // DASHBOARD CALCULATIONS
  // =========================

  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (total, employee) =>
      total + Number(employee.salary || 0),
    0
  );

  const averageSalary =
    totalEmployees > 0
      ? totalSalary / totalEmployees
      : 0;
if (!isLoggedIn) {
  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          EP
        </div>

        <h1>Employee Portal</h1>

        <p className="login-subtitle">
          Login to your dashboard
        </p>

        <input
          type="text"
          placeholder="Username"
          id="username"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
        />

        <button
          className="login-button"
          onClick={() => {

            const username =
              document.getElementById("username").value;

            const password =
              document.getElementById("password").value;

            if (
              username === "admin" &&
              password === "1234"
            ) {
              setIsLoggedIn(true);
            } else {
              alert("Invalid username or password");
            }

          }}
        >
          Login
        </button>

        <p className="login-hint">
          Demo login: admin / 1234
        </p>

      </div>

    </div>
  );
}
  // =========================
  // WEBSITE
  // =========================

  return (

    <div className="dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">
            EP
          </div>

          <div>
            <h2>Employee</h2>
            <span>Portal</span>
          </div>
        </div>

        <nav className="sidebar-menu">

          <a href="#dashboard" className="active">
            🏠 Dashboard
          </a>

          <a href="#employees">
            👥 Employees
          </a>

          <a href="#add">
            ➕ Add Employee
          </a>

          <a href="#update">
            ✏️ Update Employee
          </a>

        </nav>

        <div className="sidebar-bottom">

          <p>Employee Management</p>

          <span>React + Spring Boot</span>

        </div>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          <div>

            <h1>Dashboard</h1>

            <p>
              Welcome to your Employee Management Portal
            </p>

          </div>

          <button
            className="refresh-button"
            onClick={getEmployees}
          >
            🔄 Refresh
          </button>

        </header>


        {/* =========================
            STATISTICS
        ========================= */}

        <section className="stats-container">

          <div className="stat-card">

            <div className="stat-icon blue">
              👥
            </div>

            <div>

              <p>Total Employees</p>

              <h2>{totalEmployees}</h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              💰
            </div>

            <div>

              <p>Total Salary</p>

              <h2>
                ₹{totalSalary.toLocaleString("en-IN")}
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              📊
            </div>

            <div>

              <p>Average Salary</p>

              <h2>
                ₹{Math.round(averageSalary).toLocaleString("en-IN")}
              </h2>

            </div>

          </div>

        </section>


        {/* =========================
            EMPLOYEE TABLE
        ========================= */}

        <section
          className="dashboard-card"
          id="employees"
        >

          <div className="section-header">

            <div>

              <h2>Employee List</h2>

              <p>
                Manage all employees from here
              </p>

            </div>

            <span className="employee-count">
              {totalEmployees} Employees
            </span>

          </div>


          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Salary</th>

                  <th>Age</th>

                  <th>City</th>

                  <th>State</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {employees.map((employee) => (

                  <tr key={employee.eid}>

                    <td>
                      <span className="employee-id">
                        #{employee.eid}
                      </span>
                    </td>

                    <td>

                      <div className="employee-name">

                        <div className="avatar">
                          {employee.ename
                            ? employee.ename.charAt(0).toUpperCase()
                            : "?"}
                        </div>

                        <strong>
                          {employee.ename || "No Name"}
                        </strong>

                      </div>

                    </td>

                    <td>
                      ₹{Number(employee.salary || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {employee.age}
                    </td>

                    <td>
                      {employee.city || "-"}
                    </td>

                    <td>
                      <span className="state-badge">
                        {employee.state || "-"}
                      </span>
                    </td>

                    <td>

                      <button
                        className="edit-button"
                        onClick={() =>
                          startUpdate(employee)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteEmployee(employee.eid)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* =========================
            SEARCH EMPLOYEE
        ========================= */}

        <section className="dashboard-card">

          <div className="section-header">

            <div>

              <h2>🔍 Find Employee</h2>

              <p>
                Search an employee using Employee ID
              </p>

            </div>

          </div>


          <div className="search-box">

            <input
              type="number"
              placeholder="Enter Employee ID"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
            />

            <button onClick={getEmployeeById}>
              Search Employee
            </button>

          </div>


          {searchEmployee && (

            <div className="search-result">

              <h3>
                Employee Details
              </h3>

              <div className="details-grid">

                <p>
                  <strong>ID:</strong>
                  {searchEmployee.eid}
                </p>

                <p>
                  <strong>Name:</strong>
                  {searchEmployee.ename}
                </p>

                <p>
                  <strong>Salary:</strong>
                  ₹{searchEmployee.salary}
                </p>

                <p>
                  <strong>Age:</strong>
                  {searchEmployee.age}
                </p>

                <p>
                  <strong>City:</strong>
                  {searchEmployee.city}
                </p>

                <p>
                  <strong>State:</strong>
                  {searchEmployee.state}
                </p>

              </div>

            </div>

          )}

        </section>


        {/* =========================
            ADD EMPLOYEE
        ========================= */}

        <section
          className="dashboard-card"
          id="add"
        >

          <div className="section-header">

            <div>

              <h2>➕ Add Employee</h2>

              <p>
                Add a new employee to the system
              </p>

            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>Employee Name</label>

              <input
                type="text"
                placeholder="Enter name"
                value={ename}
                onChange={(e) =>
                  setEname(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Salary</label>

              <input
                type="number"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) =>
                  setSalary(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Age</label>

              <input
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>City</label>

              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>State</label>

              <input
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
              />

            </div>

          </div>


          <button
            className="primary-button"
            onClick={createEmployee}
          >
            ➕ Save Employee
          </button>

        </section>


        {/* =========================
            UPDATE EMPLOYEE
        ========================= */}

        <section
          className="dashboard-card"
          id="update"
        >

          <div className="section-header">

            <div>

              <h2>✏️ Update Employee</h2>

              <p>
                Select an employee from the table or enter the details manually
              </p>

            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>Employee ID</label>

              <input
                type="number"
                placeholder="Employee ID"
                value={updateId}
                onChange={(e) =>
                  setUpdateId(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                placeholder="New employee name"
                value={updateEname}
                onChange={(e) =>
                  setUpdateEname(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Salary</label>

              <input
                type="number"
                placeholder="New salary"
                value={updateSalary}
                onChange={(e) =>
                  setUpdateSalary(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Age</label>

              <input
                type="number"
                placeholder="New age"
                value={updateAge}
                onChange={(e) =>
                  setUpdateAge(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>City</label>

              <input
                type="text"
                placeholder="New city"
                value={updateCity}
                onChange={(e) =>
                  setUpdateCity(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>State</label>

              <input
                type="text"
                placeholder="New state"
                value={updateState}
                onChange={(e) =>
                  setUpdateState(e.target.value)
                }
              />

            </div>

          </div>


          <button
            className="primary-button"
            onClick={updateEmployee}
          >
            ✏️ Update Employee
          </button>


          {updateId && (

            <button
              className="cancel-button"
              onClick={() => {

                setUpdateId("");
                setUpdateEname("");
                setUpdateSalary("");
                setUpdateAge("");
                setUpdateCity("");
                setUpdateState("");

              }}
            >
              Cancel
            </button>

          )}

        </section>


        {/* FOOTER */}

        <footer>

          Employee Portal © 2026

        </footer>

      </main>

    </div>
  );
}

export default App;