document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("save").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        finalUpdate();
    });

    display(); // Display appointments when the page loads
});

let uid = null;

async function editDisplay(arg) {
    console.log("Editing appointment with ID:", arg); 
    let url = `http://localhost:3000/Appointment`;
    let mydata = await fetch(url);
    let data = await mydata.json();
    console.log("Fetched data:", data); 

    uid = arg;
    let a = data.find((e) => e.id == arg);

    if (a) {
        document.getElementById("id").value = a.id;
        document.getElementById("name").value = a.patientName; 
        document.getElementById("disease").value = a.disease;
        document.getElementById("doctor").value = a.doctor;
        document.getElementById("date").value = a.date;
        document.getElementById("time").value = a.time;
        document.getElementById("ed").style.display = "block"; // Show the edit form
       // document.querySelector(".right").style.filter = "blur(2px)"; // Blur the background
    } 
    else {
        console.error("Appointment not found"); 
    }
}

async function finalUpdate() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let dis = document.getElementById("disease").value;
    let doc = document.getElementById("doctor").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    let obj = {
        id: id,
        patientName: name,
        disease: dis,
        doctor: doc,
        date: date,
        time: time
    };

    console.log("Updating appointment:", obj); 

    try {
        let response = await fetch(`http://localhost:3000/Appointment/${uid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("Update result:", result); 
        
        document.getElementById("ed").style.display = "none"; // Hide the form after saving
        display(); // Refresh the display to show updated data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function display() {
    let table = `<table id="tab" width="100%" border="2" height="450px" >
                    <tr>
                        <th  style= color="red";>ID</th>
                        <th>Name</th>
                        <th>Disease</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>`;
    
    let url = "http://localhost:3000/Appointment";
    let mydata = await fetch(url);
    let data = await mydata.json();

    data.forEach((key) => {
        table += 
        `<tr>
                <td>${key.id}</td>
                <td>${key.patientName}</td>
                <td>${key.disease}</td>
                <td>${key.doctor}</td>
                <td>${key.date}</td>
                <td>${key.time}</td>
                <td>
                    <a href="#" onclick="editDisplay('${key.id}')">
                        <i class="fa-solid fa-pen-to-square fa-lg" style="color: #3609be;"></i> 
                    </a>
                </td>
         </tr>`;
    });
    
    table += `</table>`;
    document.getElementById("show").innerHTML = table;
}
