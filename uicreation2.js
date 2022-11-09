import { LightningElement, track, wire } from 'lwc';
import UsersName from '@salesforce/apex/uicreation2.UsersAndGroupData';
// import Groups from '@salesforce/apex/uicreation2.Groups';


export default class Uicreation2 extends LightningElement {

    
    open = false;
    groupData=[];
    UserData=[];
    editeData=[];
    Fnameletter="AB";
    groupRawData=[];
    Arrow = false;
    iconName="utility:chevronright";
    removebock;
    groupingdata=true;

    handleClick(){
        this.open=true;
    }

    closeMAmodal(){
        console.log("close model");
        this.open=false;
        // this.numberOfFileds = [{id:1},{id:2},{id:3}];
    }

    @wire(UsersName) 
    wiredAccounts ({ error, data }) {
        if (data) {
            // console.log(data.UserID);
            console.log("***********************************UICREATION 2***************************************");
            let firstlastchar="";
            for(var i=0;i<data.length;i++){
                if(data[i].ObjectName == "User"){
                    var splitdata = data[i].UserName.split(" ");
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
                    this.UserData.push({"userId":data[i].UserID,"UserName":data[i].UserName,"Alpha":firstlastchar});
                    firstlastchar="";
                    console.log("this.UserData-->>    ",this.UserData);
                }
                
                else if(data[i].ObjectName == "Group"){
                    
                    var lengthOfMembers = data[i].GroupMembersList.length;
                    console.log( data[i].GroupMembersList[0].Name);
                    console.log( data[i].GroupMembersList[1].Name);
                    var len = lengthOfMembers - 2;
                    var grpshowname = data[i].GroupMembersList[0].Name + "," +data[i].GroupMembersList[1].Name + " + " + len +" Others";
                    console.log("grpshowname--> ",grpshowname);
                    console.log("*******$$$$$$$$$$$- ",data[i].GroupMembersList);
                    var rowData = data[i].GroupMembersList;
                    console.log("rowData->  ",rowData);
                    this.editeData=[];

                    let firstlastAlpha="";
                    // for(var i=0;i<rowData.length;i++){
                    //     var splitdata = rowData[i].Name.split(" ");
                    //      console.log(splitdata);
                    //     if(splitdata.length == 1){
                    //          console.log("if block");
                    //         let word = splitdata[0];
                    //         var firstletter = word.charAt(0);
                    //         var secondletter = word.charAt(1);                  
                    //         let adding = firstletter + secondletter;
                    //         firstlastAlpha = adding.toUpperCase(); 
                    //     }
                    //     else{
                    //         let adding="";
                    //          console.log("else block");
                    //         for(var j=0; j<2;j++){
                    //             let stringdata = splitdata[j];
                    //             let stringchar = stringdata.charAt(0);
                    //             adding += stringchar;
                    //             firstlastAlpha = adding.toUpperCase();
                    //             // console.log(firstlastchar);
                    //         }
                    //     }
                    //     this.editeData.push({"userId":rowData[i].Id,"UserName":rowData[i].Name,"Alpha":firstlastAlpha});
                    //     firstlastAlpha="";
                    // }
                    // console.log("editeData->  ",this.editeData);
                        this.groupData.push({"groupNumberId":i,"groupShowName":grpshowname,"groupId":data[i].GroupId,
                        "groupName":data[i].GroupName,
                        "GData":data[i].GroupMembersList,"length":lengthOfMembers});
                        console.log(this.groupData);
                        // data[i].GroupMembersList
                }
            }
           
            }else if (error) { 
                this.error = error;  
           }
       } 

    // @wire(Groups) 
    // wiredAccounts ({ error, data }) {
    //     if (data) {
    //         console.log(data);
    //         this.groupsData=data
    //         console.log(this.groupsData);
    //         }else if (error) { 
    //             this.error = error;  
    //        }
    //    } 
    doYourAction(event){
        console.log("click on arrow");
        var query =  event.target.dataset.id;
        console.log(query);
        // this.iconName = "utility:chevronright";
        // this.iconName = "utility:chevrondown";
       
        var getArrow = this.template.querySelectorAll('.Arrowbutton');
        console.log(getArrow);
      
        
        for(var i=0; i<getArrow.length;i++){
            var arrowvalue = getArrow[i].dataset.id;
            var iconnme = getArrow[i].iconName;
            console.log("arrowvalue-> ",arrowvalue);

            var getDisplayDiv = this.template.querySelectorAll('.displayclass');
            console.log("getDisplayDiv- ",getDisplayDiv.length);
            var getAllDiv = this.template.querySelectorAll('.ArrowDiv');
            console.log("getAllDiv- ",getAllDiv.length);

            if(iconnme == "utility:chevronright" && query == arrowvalue){
                console.log("outer if");
                getArrow[i].iconName = "utility:chevrondown";

                for(var k=0; k<getAllDiv.length;k++){
                    console.log("loop");
                    var divid = getAllDiv[k].dataset.id;
                    console.log("107 divid- ",divid);
                    // console.log(getAllDiv[k].style);
                    if(divid == query && query == arrowvalue){
                        console.log(divid+"-----"+query+"-------"+arrowvalue);
                        console.log("loop if");
                        this.removebock = getAllDiv[k];
                        getAllDiv[k].classList.remove('ArrowDiv'); //= "display:block;";
                        getAllDiv[k].classList.add('displayclass');
                    }
                    else{
                        console.log("==============");
                        // getAllDiv[k].style.cssText = "display:none;"
                        getAllDiv[k].classList.remove('displayclass');
                        getAllDiv[k].classList.add('ArrowDiv'); //= "display:block;";
                       
                    }
                }

                for(var m=0;m<getDisplayDiv.length;m++){
                    var divid = getDisplayDiv[m].dataset.id;
                    console.log(divid+"-----"+query+"-------"+arrowvalue);
                        getDisplayDiv[m].classList.remove('displayclass');
                        getDisplayDiv[m].classList.add('ArrowDiv'); 
                }
            }
            else if(iconnme == "utility:chevrondown" && query == arrowvalue){
                console.log("else ifffff");
                console.log(this.removebock);
                getArrow[i].iconName = "utility:chevronright";
                this.removebock.classList.remove('displayclass');
                this.removebock.classList.add('ArrowDiv');

            }
            
            else {
                console.log("*********************** outer else");
                getArrow[i].iconName = "utility:chevronright";

                console.log(query+"*******"+arrowvalue);
                

                
                }

               
            
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


        // if(this.Arrow == true){
        //     this.Arrow = false;
        // }
        // else{
        //     this.Arrow = true;
        // }
    
    
}