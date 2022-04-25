import "./profileManagment.css"
import React from "react"
import axios from "axios"


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

	console.log(newUser)
	axios.post("http://localhost:3001/api/insert",
	{
		First:event.target.FirstName.value,
		Last:event.target.LastName.value,
		addy:event.target.Address1.value,
		addy2:event.target.Address2.value,
		city:event.target.City.value,
		zip:event.target.ZipCode.value,
		ST:x.value
	})
	return(newUser)
}
	

export default function Pmanagment() {
  return (
      <div class="container">
        <h2 className="header">
          Profile Managment
        </h2>
        <form onSubmit={handleSubmit}>
         <div className="formList">
        <label className="form">
        <input type="text" name="FirstName" placeholder="First Name" maxLength={100} className="inputs" required/>
          </label>

          <label className="form">
          <input  type="text" name="LastName" placeholder="Last Name" maxLength={50} className="inputs" required/>
          </label>
          <label className="form">
          <input type="text" name="Address1" placeholder="Address 1" maxLength={100} className="inputs" required/>
          </label>
          <label className="form">
          <input type="text" name="Address2" placeholder="Address 2(Optional)" className="inputs"/>
          </label>
          <label className="form" >
          <input type="text" name="City" placeholder="City" maxLength={100} className="inputs" required/>
        
          </label>
		
          <label className="form" >
            State
          <select id="ST" className="inputs select-category" required>, 
            	<option value="AL">AL</option>
            	<option value="AK">AK</option>
	            <option value="AR">AR</option>	
	            <option value="AZ">AZ</option>
	            <option value="CA">CA</option>
	            <option value="CO">CO</option>
	            <option value="CT">CT</option>
            	<option value="DC">DC</option>
            	<option value="DE">DE</option>
            	<option value="FL">FL</option>
            	<option value="GA">GA</option>
            	<option value="HI">HI</option>
	            <option value="IA">IA</option>	
            	<option value="ID">ID</option>
            	<option value="IL">IL</option>
            	<option value="IN">IN</option>
	            <option value="KS">KS</option>
            	<option value="KY">KY</option>
            	<option value="LA">LA</option>
            	<option value="MA">MA</option>
	            <option value="MD">MD</option>
           	  <option value="ME">ME</option>
	            <option value="MI">MI</option>
            	<option value="MN">MN</option>
	            <option value="MO">MO</option>	
            	<option value="MS">MS</option>
	            <option value="MT">MT</option>
	            <option value="NC">NC</option>	
	            <option value="NE">NE</option>
	            <option value="NH">NH</option>
            	<option value="NJ">NJ</option>
            	<option value="NM">NM</option>			
	            <option value="NV">NV</option>
            	<option value="NY">NY</option>
	            <option value="ND">ND</option>
	            <option value="OH">OH</option>
            	<option value="OK">OK</option>
            	<option value="OR">OR</option>
            	<option value="PA">PA</option>
            	<option value="RI">RI</option>
	            <option value="SC">SC</option>
            	<option value="SD">SD</option>
	            <option value="TN">TN</option>
	            <option value="TX">TX</option>
	            <option value="UT">UT</option>
	            <option value="VT">VT</option>
            	<option value="VA">VA</option>
	            <option value="WA">WA</option>
	            <option value="WI">WI</option>	
            	<option value="WV">WV</option>
            	<option value="WY">WY</option>
              </select>		
          
          </label>


          <label className="form">
          <input type="text" name="ZipCode" placeholder="ZipCode" min={7} className="inputs" required/>
          </label>
          <input className="submit_button" type="submit"/>
        </div>
		</form>
         
      </div>
  )
}
