document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const doctorSelect = document.getElementById('doctor');

    // Fetching doctor data from db.json
    fetch('db.json')
    .then(response => {
        console.log('Response status:', response.status); // Log the response status
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        const doctors = data.doctors;
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    // Handling form submission
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const patientName = document.getElementById('patientName').value;
        const disease = document.getElementById('disease').value;
        const doctorId = doctorSelect.value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const appointment = {
            patientName,
            disease,
            doctorId, // Storing the doctor's ID
            date,
            time
        };

        console.log('Appointment booked:', appointment);

        // Here you can add code to send this appointment data to your backend/server if needed
        // Example: fetch('/api/appointments', { method: 'POST', body: JSON.stringify(appointment), headers: { 'Content-Type': 'application/json' } })
         
        document.getElementById("btn").addEventListener("click", Appointment)

 async function Appointment(){

    const patientn = document.getElementById('patientName').value;
    const dis= document.getElementById('disease').value;
    const doc = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
  

    let api = "http://localhost:3000/Appointment";
try{
    const response= await fetch(api,{
        method : "POST",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify({
            "patientName": patientn,
            "disease":dis ,
            "doctor":doc ,
            "date": date,
            "time": time,
        
        })
    });

    if (!response.ok) {  // Check if the response is okay
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json(); // Assuming the server responds with JSON
    console.log(data); // Log the response data
    alert("Data saved successfully!");
} catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    alert("Error saving data: " + error.message);
}
 }
   
   
    });
});
