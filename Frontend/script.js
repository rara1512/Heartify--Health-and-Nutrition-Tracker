let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}


function check(){
    let url = window.location.href;
    const myArray = url.split("#");
    var token = myArray[0];
    if (token == 'https://heartify-ui.s3.amazonaws.com/iindex.html'){
        location.replace("https://heartify-ui.s3.amazonaws.com/Home.html");
    }else{
        location.replace("https://heartify.auth.us-east-1.amazoncognito.com/login?client_id=61pld0ditfs0el2k4knvfmncl8&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://heartify-ui.s3.amazonaws.com/iindex.html");
    }
    
}

function checko(){
    let url = window.location.href;
    const myArray = url.split("#");
    var token = myArray[0];
    if (token == 'https://heartify-ui.s3.amazonaws.com/iindex.html'){
        location.replace("http://ec2-52-23-196-124.compute-1.amazonaws.com:8501/");
    }else{
        location.replace("https://heartify.auth.us-east-1.amazoncognito.com/login?client_id=61pld0ditfs0el2k4knvfmncl8&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://heartify-ui.s3.amazonaws.com/iindex.html");
    }
    
}

function getInfo(e)
{
    e.preventDefault();
    var age = document.getElementById('age').value;
    var sex = document.getElementById('sex').value;
    var cp = document.getElementById('cp').value;
    var trestbps = document.getElementById('trestbps').value;
    var chol = document.getElementById('chol').value;
    var fbs = document.getElementById('fbs').value;
    var restecg = document.getElementById('restecg').value;
    var thalach = document.getElementById('thalach').value;
    var exang = document.getElementById('exang').value;
    var oldpeak = document.getElementById('oldpeak').value;
    var slope = document.getElementById('slope').value;
    var ca = document.getElementById('ca').value;
    var thal = document.getElementById('thal').value;
    
    if( age == "" ) {
        alert( "Please provide your age!" );
        document.myForm.age.focus() ;
        return false;
    }
    if (age > 100 || age < 20 ){
        alert( "Please provide valid Age between 20 and 100!" );
        document.myForm.age.focus() ;
        return false;
     }
    if( sex != "0" && sex != "1" ) {
        alert( "Please enter your sex!" );
        document.myForm.sex.focus() ;
        return false;
    }
    if (cp != "0" && cp != "1" && cp != "2" && cp != "3" ){
        alert( "Please enter your chest pain type!" );;
        document.myForm.cp.focus() ;
        return false;
     }

     if (trestbps > 200 || trestbps < 94 ){
        alert( "Please provide valid resting BP between 94 and 200!" );
        document.myForm.trestbps.focus() ;
        return false;
     }
     if (chol > 564 || chol < 126 ){
        alert( "Please provide valid Serum Colestrol level between 126 and 564!" );
        document.myForm.chol.focus() ;
        return false;
     }
     if( fbs != "0" && fbs != "1" ) {
        alert( "Please enter your Fasting Blood Sugar!" );
        document.myForm.fbs.focus() ;
        return false;
    }
    if( restecg != "0" && restecg != "1" && restecg != "2") {
        alert( "Please enter your Resting ECG results!" );
        document.myForm.restecg.focus() ;
        return false;
    }
    if (thalach > 202 || thalach < 71 ){
        alert( "Please provide valid Max Heart Rate between 71 and 202!" );
        document.myForm.thalach.focus() ;
        return false;
     }
     if( exang != "0" && exang != "1" ) {
        alert( "Please enter your Exercise-Induced Angina Field!" );
        document.myForm.exang.focus() ;
        return false;
    }
    if (oldpeak > 6.2 || oldpeak < 0 ){
        alert( "Please provide valid ST between 0 and 6.2!" );
        document.myForm.oldpeak.focus() ;
        return false;
    }
    if( slope != "0" && slope != "1" && slope != "2") {
        alert( "Please enter your Slope Of The Peak Exercise!" );
        document.myForm.slope.focus() ;
        return false;
    }
    if (ca > 4 || ca < 0 ){
        alert( "Please provide valid Number Of Major Vessels between 0 and 4!" );
        document.myForm.ca.focus() ;
        return false;
    }
    
    if( thal != "0" && thal != "1" && thal != "2") {
        alert( "Please enter Thalassemia!" );
        document.myForm.Thal.focus() ;
        return false;
    }


    fetch('https://peyvvinyva.execute-api.us-east-1.amazonaws.com/Prod/predict-heart-disease',{
                method:'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                  },
                body: JSON.stringify({age:age,sex:sex,cp:cp,trestbps:trestbps,chol:chol,fbs:fbs,restecg:restecg,thalach:thalach,exang:exang,oldpeak:oldpeak,slope:slope,ca:ca,thal:thal})
                })
                .then(response => response.json())
                .then((response) => {alert("You will get results in email."+JSON.stringify(response.body))})
                .catch(err=>{alert(err)})
}

// alert("start will be: ")
//     var age = document.getElementById('age').value;
//     var sex = document.getElementById('sex').value;
//     var trestbps = document.getElementById('trestbps').value;
//     var chol = document.getElementById('chol').value;
//     var fbs = document.getElementById('fbs').value;
//     var restecg = document.getElementById('restecg').value;
//     var thalach = document.getElementById('thalach').value;
//     var exang = document.getElementById('exang').value;
//     var oldpeak = document.getElementById('oldpeak').value;
//     var slope = document.getElementById('slope').value;
//     var ca = document.getElementById('ca').value;
//     var thal = document.getElementById('thal').value;
//     alert(sex);
//     var apigClient = apigClientFactory.newClient({
//         apiKey: 'xZCtKeSs3s1vlzJMqiaBl9Zt8t0KIozxGfcKGHI6'
//     });
//     var body = {'age':age,'sex':sex,'trestbps':trestbps,'chol':chol,'fbs':fbs,'restecg':restecg,'thalach':thalach,'exang':exang,'oldpeak':oldpeak,'slope':slope,'ca':ca,'thal':thal};
//     var params = {};
//     var additionalParams = {};

//     apigClient.predictHeartDiseasePost(params, body , additionalParams).then(function(result){
//         alert("result will be: ")
//         alert(result)
//     }).catch( function(result){
//     });