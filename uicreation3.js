import { LightningElement, wire } from 'lwc';
import UsersName from '@salesforce/apex/uicreation3.UsersName';

export default class Uicreation3 extends LightningElement {

    open=false;
    UserData=[];
    Fnameletter="AB";


    handleClick(){
        // this.open=true;
        if(this.open == true){
            this.open=false;
            
        }
        else{
            this.open = true;
            // this.template.querySelector(`[data-id = 'modalPopup']`).className = 'slds-modal slds-fade-in-open sectioncss open-section';
            console.log("click to open");
        }
    }

    closeMAmodal(){
        console.log("close model");
        this.open=false;
        // this.template.querySelector(`[data-id = 'modalPopup']`).className = 'slds-modal slds-fade-in-open sectioncss';
            console.log("click to close");
        // this.numberOfFileds = [{id:1},{id:2},{id:3}];
    }

    @wire(UsersName) 
    wiredAccounts ({ error, data }) {
        if (data) {
            console.log("***********************************UICREATION 3***************************************");
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
}