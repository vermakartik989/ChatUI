import { LightningElement, wire } from 'lwc';
import UsersName from '@salesforce/apex/getUserName.UsersName';

export default class UIcreation extends LightningElement {

    open = false;
    numberOfFileds = [{id:1},{id:2},{id:3}];
    UserData=[];
    Fnameletter="AB";

    @wire(UsersName) 
    wiredAccounts ({ error, data }) {
        if (data) {
            //  console.log(data);
            let firstlastchar="";
            for(var i=0;i<data.length;i++){
                var splitdata = data[i].Name.split(" ");
                // console.log(splitdata);
                if(splitdata.length == 1){
                    // console.log("if block");
                    let word = splitdata[0];
                    var firstletter = word.charAt(0);
                    var secondletter = word.charAt(1);                  
                    let adding = firstletter + secondletter;
                    firstlastchar = adding.toUpperCase(); 
                }
                else{
                    let adding="";
                    // console.log("else block");
                    for(var j=0; j<2;j++){
                        let stringdata = splitdata[j];
                        let stringchar = stringdata.charAt(0);
                         adding += stringchar;
                         firstlastchar = adding.toUpperCase();
                        // console.log(firstlastchar);
                    }
                }
                this.UserData.push({"Id":data[i].Id,"Name":data[i].Name,"Alpha":firstlastchar});
                firstlastchar="";
            }
            // this.UserData = data;
            // console.log( this.UserData); 
       } else if (error) { 
           this.error = error;  
      }   
    }
    
    handleClick(){
        this.open=true;
    }
    closeMAmodal(){
        console.log("close model");
        this.open=false;
        // this.numberOfFileds = [{id:1},{id:2},{id:3}];
    }


    checkedValue(){
        console.log("checked Value");
        let result=[];
        let getcheck = this.template.querySelectorAll(".checkboxinput");
        for (var i = 0; i < getcheck.length; i++) {
            if (getcheck[i].checked) {
                result.push(getcheck[i].value);
            }
        }
        console.log(result);
    }
    // addRecord(){
    //     console.log("add record");
    //     let lengthOfFields = this.numberOfFileds.length;
    //     console.log(lengthOfFields);
    //     if(lengthOfFields < 10){
    //         this.numberOfFileds.push({id:lengthOfFields+1});
    //         console.log(this.numberOfFileds);
    //         this.open=false;
    //         this.open=true;
    //         this.topFunction();
    //     }
    // }

    // subtractRecord(){
    //     console.log("subtract Record");
    //     let lengthOfFields = this.numberOfFileds.length;
    //     console.log(lengthOfFields);
    //     if(lengthOfFields > 3){
    //     this.numberOfFileds.splice(lengthOfFields-1);
    //     // arr.splice(arr.length - 1);
    //     console.log(this.numberOfFileds);
    //     this.open=false;
    //     this.open=true
    //     }
    // }

    // handleScrollClick(){
    //     this.template.querySelector('.fieldss' + this.numberOfFileds.length).scrollIntoView({
    //         block: 'bottom',
    //         behavior: 'smooth'
    //     });
    // }

    // topFunction(){
    //      console.log("scrool");
    //      let el = document.querySelector('.special');
    //         el.scrollIntoView(true);
        
        // let length = this.numberOfFileds.length;
        // let str = "'."+length+"'";
        // console.log(str);
        // this.template.querySelector('.fieldss').scro //.scrollTo({top:0});
                 // console.log(el);
        // el.scrollIntoView(false);
        // const div = this.template.querySelector('.fieldss');
        // window.scrollTo(0, this.template.scrollHeight);
    // }


    // handleChange(event) {
    //     let i;
    //     let checkboxes = this.template.querySelectorAll('[data-id="checkbox"]')
    //     for(i=0; i<checkboxes.length; i++) {
    //         checkboxes[i].checked = event.target.checked;
    //     }
    // }

    
}   