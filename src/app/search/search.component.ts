import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }
  user = {}
  isEmpty = true
  userFound = true
  getUserInfo() {
    let email = (<HTMLInputElement>document.querySelector('#searchbox')).value
    var data = JSON.stringify(
      {
        "email": email,
      }
    )
    this.APICall(data)
    this.resetForm()
    return false
  }

  async APICall(data) {
    var myHeaders = new Headers()

    myHeaders.append("Content-Type", "application/json")

    let response = await fetch("https://ej3zcj0z71.execute-api.us-east-2.amazonaws.com/dev", {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    })
    let result = await response.text()
    
    if (JSON.parse(result).errorType === "KeyError") {
      this.userFound = false
      this.isEmpty = true
      return;
    }
    this.user = await JSON.parse((result))
    if (this.user["body"] != undefined) {
      this.isEmpty = false
      this.userFound = true;
    }
  }

  resetForm() {
    (<HTMLInputElement>document.querySelector('#searchbox')).value = "";
  }
}
