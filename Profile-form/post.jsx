import React from "react";
const 	handleSubmit=(event)=>
{
	event.preventDefault();
	const x = document.getElementById("State");

	const newUser={
	 First:event.target.FirstName.value,
	 Last:event.target.LastName.value,
	 addy:event.target.Address1.value,
     addy2:event.target.Address2.value,
     city:event.target.City.value,
     zip:event.target.ZipCode.value,
	 ST:x.value
	}


}
