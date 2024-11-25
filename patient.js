document.getElementById("btns").addEventListener("click", patientdata)

 async function patientdata(){

    const tit = document.getElementById('title').value;
    const fName = document.getElementById('firstName').value;
    const lName = document.getElementById('lastName').value;
    const gen = document.getElementById('gender').value;
    const inj = document.getElementById('injury').value;
    const condi = document.getElementById('condition').value;
    const ph= document.getElementById('phone').value;
    const el = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const doctor = document.getElementById('doctor').value;  

    let api = "http://localhost:3000/patient";
try{
    const response= await fetch(api,{
        method : "POST",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify({
            "title": tit,
            "firstName": fName,
            "lastName": lName,
            "gender": gen,
            "injury": inj,
            "condition": condi,
            "phone": ph,
            "email": el,
            "dob": dob,
            "city": city,
            "address": address,
            "consultingDoctor": doctor
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