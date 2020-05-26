import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  preAPICall() {
    let firstname = (<HTMLInputElement>document.querySelector('#firstname')).value
    let lastname = (<HTMLInputElement>document.querySelector('#lastname')).value
    let address = (<HTMLInputElement>document.querySelector('#address')).value
    let mobile = (<HTMLInputElement>document.querySelector('#mobile')).value
    let email = (<HTMLInputElement>document.querySelector('#email')).value
    let dob = (<HTMLInputElement>document.querySelector('#dob')).value;
    var data = JSON.stringify(
      {
        "firstname": firstname,
        "lastname": lastname,
        "address": address,
        "mobile": mobile,
        "email": email,
        "dob": dob
      }
    )
    this.APICall(data)
    this.resetForm()
    return false
  }
  
  APICall(data) {
    var myHeaders = new Headers()

    myHeaders.append("Content-Type", "application/json")

    fetch("https://jjc78kbiej.execute-api.us-east-2.amazonaws.com/dev", {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
  }

  resetForm()
  {
    (<HTMLInputElement>document.querySelector('#firstname')).value = "";
    (<HTMLInputElement>document.querySelector('#lastname')).value = "";
    (<HTMLInputElement>document.querySelector('#address')).value = "";
    (<HTMLInputElement>document.querySelector('#mobile')).value = "";
    (<HTMLInputElement>document.querySelector('#email')).value = "";
    (<HTMLInputElement>document.querySelector('#dob')).value = "";
  }
}
