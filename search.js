// Search function
function search(query) {
    query = query.toLowerCase();

    const doctorResults = data.doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(query) || doctor.specialty.toLowerCase().includes(query)
    );

    const patientResults = data.patients.filter(patient => 
        patient.firstName.toLowerCase().includes(query) ||
        patient.lastName.toLowerCase().includes(query) ||
        patient.injury.toLowerCase().includes(query)
    );

    const appointmentResults = data.appointments.filter(appointment => 
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.disease.toLowerCase().includes(query) ||
        appointment.doctor.toLowerCase().includes(query)
    );

    displayResults(doctorResults, patientResults, appointmentResults);
}


function displayResults(doctorResults, patientResults, appointmentResults) {
    const doctorContainer = document.getElementById('doctors-results');
    const patientContainer = document.getElementById('patients-results');
    const appointmentContainer = document.getElementById('appointments-results');

    doctorContainer.innerHTML = '';
    patientContainer.innerHTML = '';
    appointmentContainer.innerHTML = '';

    if (doctorResults.length > 0) {
        doctorContainer.innerHTML = '<h3>Doctors:</h3>';
        doctorResults.forEach(doctor => {
            doctorContainer.innerHTML += `<p>${doctor.name} (${doctor.specialty})</p>`;
        });
    } else {
        doctorContainer.innerHTML = '<p>No doctors found.</p>';
    }

    if (patientResults.length > 0) {
        patientContainer.innerHTML = '<h3>Patients:</h3>';
        patientResults.forEach(patient => {
            patientContainer.innerHTML += `<p>${patient.firstName} ${patient.lastName} - Injury: ${patient.injury}</p>`;
        });
    } else {
        patientContainer.innerHTML = '<p>No patients found.</p>';
    }

    if (appointmentResults.length > 0) {
        appointmentContainer.innerHTML = '<h3>Appointments:</h3>';
        appointmentResults.forEach(appointment => {
            appointmentContainer.innerHTML += `<p>${appointment.patientName} - Disease: ${appointment.disease} - Doctor: ${appointment.doctor} - Date: ${appointment.date} - Time: ${appointment.time}</p>`;
        });
    } else {
        appointmentContainer.innerHTML = '<p>No appointments found.</p>';
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-query').value;
    if (query) {
        search(query);
    } else {
        alert('Please enter a search query');
    }
});