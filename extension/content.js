/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Banks = {
  net: {
      id: 0,
      banks:{
          icici : 44,
          hdfc: 36,
          sbi: 1,
          fed: 22,
          pnb: 34,
          axis: 39,
          obc: 43,
          ing: 47,
          cbi: 50,
          syndicate: 54,
          yes: 60,
          idbi: 52,
          kotak: 46,
          bob: 37
          
      }
  },
  credit : {
       id: 1,
       banks:{
           citi: 32,
           icici: 41,
           hdfc: 57
       }
  }    ,
  debit: {
       id: 2,
       banks:{
           citi: 32,
           icici: 41,
           hdfc: 57
       }
  }    
      
}  
;

////////////////////////////////////////////////////////////////
DO_REFRESH = true;
setTimeout(function(){
    
if(window.location.hostname === 'www.irctc.co.in'){
        configSetup();
}
if($("#avlAndFareForm").length !==0){
    console.log("starting 1..");
    setTimeout(function(){refresh();}, 100);
    //setTimeout(function(){clickWhenAvailable();}, 100);
}
if($("#addPassengerForm\\:psdetail\\:0\\:psgnName").length !==0){
    console.log("filling form..");
    fillForm();
}
if($("#jpBook\\:payOption\\:0").length !==0)
            selectBank();

if($("#CITI_CREDIT_RAD").length !==0){
            console.log("citi card");
            setTimeout(function(){
                fillCitiCardDetails();
            },200);
            
}
if($("#uid_tb_r").length !== 0){
    console.log("citi ipin");
    enterIpin();
}

},100);

function refresh(){
    console.log("refreshing ..");
    var chkPageObj=$(".refresh-avl-enq");
    console.log(chkPageObj[0]);
    if((chkPageObj==undefined || chkPageObj[0]==undefined || chkPageObj.length === 0) && DO_REFRESH===true){
        setTimeout(function(){refresh();}, 1000);
        return;
    }else{
        console.log("outside the loop ..");
        console.log(chkPageObj[0]);
        simulateClick(chkPageObj[0]);
        clickWhenAvailable();
    }
}
 
function clickWhenAvailable(){
    var chkPageObj=$("#j_idt295_body");
    if((chkPageObj===undefined || chkPageObj.find("a").length === 0) && DO_REFRESH===true){
        setTimeout(function(){refresh();}, 1000);
        return;
    }
    DO_REFRESH = false;
    simulateClick($("#j_idt295_body").find("a")[0]);
}


function simulateClick(obj,success) {
  console.log(obj);  
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !obj.dispatchEvent(evt);  
  if(success){
      success();
  }
/*

  if(canceled) {
    // A handler called preventDefault
    alert("canceled");
  } else {
    // None of the handlers called preventDefault
    alert("not canceled");
  }
  */
}


function fillForm(){
    for(var i in FORM_DETAILS.passengers){
        $("#addPassengerForm\\:psdetail\\:"+i+"\\:psgnName")
                .val(FORM_DETAILS.passengers[i].name);
        
        $("#addPassengerForm\\:psdetail\\:"+i+"\\:psgnAge")
                .val(FORM_DETAILS.passengers[i].age);
        
        $("#addPassengerForm\\:psdetail\\:"+i+"\\:psgnGender")
                .val(FORM_DETAILS.passengers[i].gender);
        
        $("#addPassengerForm\\:psdetail\\:"+i+"\\:berthChoice")
                .val(FORM_DETAILS.passengers[i].berth);
        
        if($("#addPassengerForm\\:psdetail\\:"+i+"\\:idCardNumber")){
            $("#addPassengerForm\\:psdetail\\:"+i+"\\:idCardNumber")
                .val(FORM_DETAILS.passengers[i].id);
        }
        if($("#addPassengerForm\\:psdetail\\:"+i+"\\:idCardType")){
            $("#addPassengerForm\\:psdetail\\:"+i+"\\:idCardType")
                .val(FORM_DETAILS.passengers[i].id_type);
        }
        if(FORM_DETAILS.passengers[i].senior){
            setTimeout(function(){
                $("#addPassengerForm\\:psdetail\\:"+i+"\\:concessionOpt")
                    .prop('checked', true);
                $("#addPassengerForm\\:psdetail\\:"+i+"\\:concessionOpt")
                        .removeAttr('disabled');
               setTimeout(function(){    
                    //alert(i);
                    //
                    //console.log($("#addPassengerForm\\:psdetail\\:"+i+"\\:psgnGender"));
                    //$("#addPassengerForm\\:psdetail\\:"+i+"\\:psgnGender").change();
                    //console.log($("#addPassengerForm\\:psdetail\\:"+i+"\\:psgnGender").change()); 
                },10000);
            },200);
            
        }
        if($("#addPassengerForm\\:psdetail\\:"+i+"\\:foodChoice")){
            $("#addPassengerForm\\:psdetail\\:"+i+"\\:foodChoice")
                .val(FORM_DETAILS.passengers[i].meal);
        }
        
    }
    $("#addPassengerForm\\:mobileNo")
                .val(FORM_DETAILS.mobile);
    $("#j_captcha").focus();
    
    
}

    function selectBank(){
        if(
            !FORM_DETAILS.payment_type
            || ! Banks[FORM_DETAILS.payment_type]
            || ! Banks[FORM_DETAILS.payment_type].banks[FORM_DETAILS.bank]
          )
            return;
        
        var type = Banks[FORM_DETAILS.payment_type].id; 
        var bank = Banks[FORM_DETAILS.payment_type].banks[FORM_DETAILS.bank];
        simulateClick($("#jpBook\\:payOption\\:"+type)[0]);
        setTimeout(function(){
           $(".selected-bank-list").val(bank);
           simulateClick($("#validate")[0]);
        },200);
    }

function fillCitiCardDetails(){
    console.log("waiting citi card");
    console.log($("input[name=cardNum1]"));
    if(!$("input[name=cardNum1]") || isHidden($("input[name=cardNum1]")[0])){
       setTimeout(function(){
           fillCitiCardDetails();
           return;
       },200); 
    }else{
        console.log("filling card");
        setTimeout(function(){
            console.log(FORM_DETAILS);
            $("input[name=cardNum1]")[0].value = FORM_DETAILS.card_number.substr(0,4);
            $("input[name=cardNum2]")[0].value = FORM_DETAILS.card_number.substr(4,4);
            $("input[name=cardNum3]")[0].value = FORM_DETAILS.card_number.substr(8,4);
            $("input[name=cardNum4]")[0].value = FORM_DETAILS.card_number.substr(12,4);

            var expiry = FORM_DETAILS.card_expiry.split('/');
            $("#HtmlMonth")[0].value = expiry[0];
            $("#HtmlYear")[0].value = expiry[1];
            $("input[name='HtmlCVVNum']")[0].value = FORM_DETAILS.card_cvv;
            simulateClick($("#submitciti")[0]);
        },100);
    }
}

function enterIpin(){
     simulateClick($("#uid_tb_r")[0]);
     if(FORM_DETAILS.card_ipin){
        setTimeout(function(){
            $("input[name='useridanswer']")[0].value = FORM_DETAILS.card_ipin;
            simulateClick($(".next_btn")[0]);
        },200);
     }
}

function isHidden(el) {
    if(!el || el === undefined)
        return true;
    return (el.offsetParent === null);
}


function configSetup(){
    var options='<div>          <p style="              font-family: monospace;          ">            - gender: M, F     <br>       - berth: SL, SU, UB, MB, LB <br>            - id_type: NULL_IDCARD, DRIVING_LICENSE, PASSPORT, PANCARD <br>            - meal: V, N <br>            - payment_type: net, debit, credit <br>            - bank: citi,hdfc,icici,sbi <br><br> ...bank details are optional <br> ...card details works only for citi bank debit card <br>                                                        </p>            </div>';
    var configTextarea = '<textarea id="prefill_text" style="width: 595px;height: 380px;"></textarea>';
    $("body").prepend($("<button class='config_hidden' id='prefill_show'>Irctc Prefill Form Details</button><div class='config_shown' style='display:none; width:600px;height:400px;position: absolute;margin-top: 30px;z-index: 1000;background: aliceblue;'>"+options+configTextarea+"</div><button class='config_shown' id='prefill_save'>Save</button><button class='config_shown'  id='prefill_cancel'>Cancel</button><button class='config_shown' id='prefill_reset'>Reset</button>"));
    if(localStorage.prefillDetails === undefined){
        localStorage.setItem('prefillDetails',JSON.stringify(FORM_DETAILS,null, 4));
    }
    var origFormDetails = JSON.stringify(FORM_DETAILS,null,4);
    FORM_DETAILS = JSON.parse(localStorage.prefillDetails);
    setTimeout(function(){
    //localStorage.setItem('prefillDetails',JSON.stringify(FORM_DETAILS,null, 4));
       $("#prefill_text").text(localStorage.prefillDetails);
       $(".config_hidden").show();
       $(".config_shown").hide();

       $("#prefill_show").click(function(){
           $("#prefill_text").val(JSON.stringify(FORM_DETAILS,null,4));
           $(".config_hidden").hide();
           $(".config_shown").show();
       });
       
       $("#prefill_cancel").click(function(){
           $(".config_hidden").show();
           $(".config_shown").hide();
       });
       $("#prefill_save").click(function(){
           try{
               FORM_DETAILS = JSON.parse($("#prefill_text").val());
               localStorage.setItem('prefillDetails',JSON.stringify(FORM_DETAILS,null, 4));
           }catch(e){
               alert("Please enter details correctly.");
               $(".config_hidden").show();
               $(".config_shown").hide();
               return;
           }
           $(".config_hidden").show();
           $(".config_shown").hide();
       });
       
       $("#prefill_reset").click(function(){
           $("#prefill_text").val(origFormDetails);
       });
       
    },100);
    
    
}