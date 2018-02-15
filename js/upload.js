
// TODO: NEGAR PONTO(.) quando estiver a fazer download

window.onload = function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCg29yu31bTSVSFr0BUmonMEskj-EbnNBk",
    authDomain: "engenheirosproject.firebaseapp.com",
    databaseURL: "https://engenheirosproject.firebaseio.com",
    projectId: "engenheirosproject",
    storageBucket: "engenheirosproject.appspot.com",
  };
  firebase.initializeApp(config);

  var progressChip = document.getElementById("progressChip").style.display="none";

  if(document.cookie === ""){
    document.getElementById('page').classList.add('hidden');
    document.getElementById('page2').classList.remove('hidden');
  }

  $("#archiveNameET").alphanum({
        disallow: ".&[]#/"
  });
};

    var percentshow = document.getElementById("percentshow");
    var spinner = document.getElementById("spinner");
    var upbutton = document.getElementById("upbutton");
    var progress = document.getElementById("p1");


      function upload() {
        var selectedFile = document.getElementById("fileInput").files[0];

        var fileRawGivenName = document.getElementById("archiveNameET").value;

        var selectedCadeiraName = document.getElementById("cadeiraS2").value;
        var selectedFileValue = document.getElementById("fileInput").value;

        var percentshow = document.getElementById("percentshow");
        var pauseicon = document.getElementById("pauseIcon");
        var resumeicon = document.getElementById("resumeIcon");

        var snackbarContainer = document.getElementById("toast");

        var databaseRef = firebase.database().ref();

        console.log(selectedCadeiraName, "sel cade");

        // Check if form has been filled:
        if((selectedFileValue === "") | ((fileRawGivenName === "") | (fileRawGivenName === " ")) | (selectedCadeiraName === "")){
          // If form is not yet filled completely
          var message = {message: "Por favor preencha todos os dados acima." };
          snackbarContainer.MaterialSnackbar.showSnackbar(message);

        // If form is filled
        }else{
          //Set the name of the OriginalSelectedFileName
          var ogName = selectedFile.name;

          // Create a storage ref
          var storageRef = firebase.storage().ref('Engenheiros/' + selectedCadeiraName + "/" + ogName);

          // Upload the file now
          task = storageRef.put(selectedFile);

          task.on('state_changed',

              function progress(snapshot){
                var percentageRaw = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                var percentage = Math.round(percentageRaw * 100) / 100;
                upbutton.disabled = true;
                document.getElementById("p1").style.width = percentage + "%";
                progressChip.style.display = "block";
                percentshow.innerHTML = percentage + "%";
              },

              function (error){
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    var message = {message: "Não tem permissão para efectuar a operação." };
                    snackbarContainer.MaterialSnackbar.showSnackbar(message);
                    break;

                  case 'storage/canceled':
                    // User canceled the upload
                    upbutton.disabled = false;
                    var message = {message: "Operação cancelada." };
                    snackbarContainer.MaterialSnackbar.showSnackbar(message);
                    break;

                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    var message = {message: "Erro no upload! Tente novamente." };
                    snackbarContainer.MaterialSnackbar.showSnackbar(message);
                    break;
                }
              },

              function complete(){
                upbutton.disabled=false;
                console.log("upload complete!");
                progressChip.style.display="none";

                var message = {message: "Upload efectuado com sucesso!" };
                snackbarContainer.MaterialSnackbar.showSnackbar(message);

                // set the link to Firebase database
                var downloadURL = task.snapshot.downloadURL;
                var rawFileSize = task.snapshot.totalBytes;
                // get the date and time of upload and store it as a key on firebase
                var trc = task.snapshot.metadata.timeCreated;
                console.log(trc);
                var timeCreated = trc.substring(8, 10) + "-" + trc.substring(5, 7) + "-" + trc.substring(0, 4) + " pelas " + (parseInt(trc.substring(11, 13)) + 2) + ":" + trc.substring(14,16) + "m";

                var fileGivenName = "(" + timeCreated + ")" + " <b>" + fileRawGivenName;


                // Convert the size to Megabytes or Kilobytes acordingly for better usage data
                if (rawFileSize <= 999999) {
                    var rawSizeInKB = rawFileSize / 1000;
                    var sizeInKB = Math.round(rawSizeInKB * 100) / 100;
                    // do something if the file accepts to convert to kilobytes..

                    var arranged_downloadlink = "<a target='_blank' href=" + "'" + downloadURL + "'" + "class='mdl-button mdl-js-button mdl-color-text--white mdl-button--raised mdl-js-ripple-effect mdl-color--grey-800'><i class='material-icons mdl-color-text--white'>file_download</i>" + " (" + sizeInKB + " kB)" +  "</a>"
                    // Put the file, inside /cadeira/, named after the inputText.
                    // ..making a download button that when clicked exectutes * fileDownload();
                    databaseRef.child(selectedCadeiraName + "/" + fileGivenName).set(arranged_downloadlink);


                } else if (rawFileSize > 999999) {
                    var rawSizeInMB = rawFileSize / 1000000;
                    var sizeInMB = Math.round(rawSizeInMB * 100) / 100;
                    // do something if the file accepts to convert to megabytes..

                    var arranged_downloadlink = "<a target='_blank' href=" + "'" + downloadURL + "'" + "class='mdl-button mdl-js-button mdl-color-text--white mdl-button--raised mdl-js-ripple-effect mdl-color--teal-300'><i class='material-icons mdl-color-text--white'>file_download</i>" + " (" + sizeInMB + " MB)" +  "</a>"
                    // Put the file, inside /cadeira/, named after the inputText.
                    // ..making a download button that when clicked exectutes * fileDownload();
                    databaseRef.child(selectedCadeiraName + "/" + fileGivenName).set(arranged_downloadlink);

                };

              }
            );
          };
      }

      function pauseUpload() {
        document.getElementById("pauseIcon").style.display="none";
        document.getElementById("resumeIcon").style.display="inline-block";
        spinner.classList.remove("is-active");

        var pauseTask = task;
        pauseTask.pause();

      }

      function resumeUpload(){
        document.getElementById("resumeIcon").style.display="none";
        document.getElementById("pauseIcon").style.display="inline-block";
        spinner.classList.add("is-active");
        var resumeTask = task;
        resumeTask.resume();
      }

      function cancelUpload() {
        progressChip.style.display="none";
        upbutton.disabled=false;
        p1.style.width="0%";

        var cancelTask = task;
        cancelTask.cancel();
        console.log("cancelled");
      }











/////RELATED TO A LIBRARY CALLED (jquery.alphanum) for preventing characters on TextInputs. Dont delete unless you're sure.
(function($){$.fn.alphanum=function(settings){var combinedSettings=getCombinedSettingsAlphaNum(settings);var $collection=this;setupEventHandlers($collection,trimAlphaNum,combinedSettings);return this};$.fn.alpha=function(settings){var defaultAlphaSettings=getCombinedSettingsAlphaNum("alpha");var combinedSettings=getCombinedSettingsAlphaNum(settings,defaultAlphaSettings);var $collection=this;setupEventHandlers($collection,trimAlphaNum,combinedSettings);return this};$.fn.numeric=function(settings){var combinedSettings=getCombinedSettingsNum(settings);var $collection=this;setupEventHandlers($collection,trimNum,combinedSettings);$collection.blur(function(){numericField_Blur(this,combinedSettings)});return this};var DEFAULT_SETTINGS_ALPHANUM={allow:"",disallow:"",allowSpace:true,allowNewline:true,allowNumeric:true,allowUpper:true,allowLower:true,allowCaseless:true,allowLatin:true,allowOtherCharSets:true,forceUpper:false,forceLower:false,maxLength:NaN};var DEFAULT_SETTINGS_NUM={allowPlus:false,allowMinus:true,allowThouSep:true,allowDecSep:true,allowLeadingSpaces:false,maxDigits:NaN,maxDecimalPlaces:NaN,maxPreDecimalPlaces:NaN,max:NaN,min:NaN};var CONVENIENCE_SETTINGS_ALPHANUM={alpha:{allowNumeric:false},upper:{allowNumeric:false,allowUpper:true,allowLower:false,allowCaseless:true},lower:{allowNumeric:false,allowUpper:false,allowLower:true,allowCaseless:true}};var CONVENIENCE_SETTINGS_NUMERIC={integer:{allowPlus:false,allowMinus:true,allowThouSep:false,allowDecSep:false},positiveInteger:{allowPlus:false,allowMinus:false,allowThouSep:false,allowDecSep:false}};var BLACKLIST=getBlacklistAscii()+getBlacklistNonAscii();var THOU_SEP=",";var DEC_SEP=".";var DIGITS=getDigitsMap();var LATIN_CHARS=getLatinCharsSet();function getBlacklistAscii(){var blacklist="!@#$%^&*()+=[]\\';,/{}|\":<>?~`.-_";blacklist+=" ";return blacklist}function getBlacklistNonAscii(){var blacklist="¬"+"€"+"£"+"¦";return blacklist}function setupEventHandlers($textboxes,trimFunction,settings){$textboxes.each(function(){var $textbox=$(this);$textbox.off(".alphanum").on("keyup.alphanum change.alphanum paste.alphanum",function(e){var pastedText="";if(e.originalEvent&&e.originalEvent.clipboardData&&e.originalEvent.clipboardData.getData)pastedText=e.originalEvent.clipboardData.getData("text/plain");setTimeout(function(){trimTextbox($textbox,trimFunction,settings,pastedText)},0)}).on("keypress.alphanum",function(e){var charCode=!e.charCode?e.which:e.charCode;if(isControlKey(charCode)||e.ctrlKey||e.metaKey)return;var newChar=String.fromCharCode(charCode);var selectionObject=$textbox.selection();var start=selectionObject.start;var end=selectionObject.end;var textBeforeKeypress=$textbox.val();var potentialTextAfterKeypress=textBeforeKeypress.substring(0,start)+newChar+textBeforeKeypress.substring(end);var validatedText=trimFunction(potentialTextAfterKeypress,settings);if(validatedText!=potentialTextAfterKeypress)e.preventDefault()})})}function numericField_Blur(inputBox,settings){var fieldValueNumeric=parseFloat($(inputBox).val());var $inputBox=$(inputBox);if(isNaN(fieldValueNumeric)){$inputBox.val("");return}if(isNumeric(settings.min)&&fieldValueNumeric<settings.min)$inputBox.val("");if(isNumeric(settings.max)&&fieldValueNumeric>settings.max)$inputBox.val("")}function isNumeric(value){return!isNaN(value)}function isControlKey(charCode){if(charCode>=32)return false;if(charCode==10)return false;if(charCode==13)return false;return true}function trimTextbox($textBox,trimFunction,settings,pastedText){var inputString=$textBox.val();if(inputString==""&&pastedText.length>0)inputString=pastedText;var outputString=trimFunction(inputString,settings);if(inputString==outputString)return;var caretPos=$textBox.alphanum_caret();$textBox.val(outputString);if(inputString.length==outputString.length+1)$textBox.alphanum_caret(caretPos-1);else $textBox.alphanum_caret(caretPos)}function getCombinedSettingsAlphaNum(settings,defaultSettings){if(typeof defaultSettings=="undefined")defaultSettings=DEFAULT_SETTINGS_ALPHANUM;var userSettings,combinedSettings={};if(typeof settings==="string")userSettings=CONVENIENCE_SETTINGS_ALPHANUM[settings];else if(typeof settings=="undefined")userSettings={};else userSettings=settings;$.extend(combinedSettings,defaultSettings,userSettings);if(typeof combinedSettings.blacklist=="undefined")combinedSettings.blacklistSet=getBlacklistSet(combinedSettings.allow,combinedSettings.disallow);return combinedSettings}function getCombinedSettingsNum(settings){var userSettings,combinedSettings={};if(typeof settings==="string")userSettings=CONVENIENCE_SETTINGS_NUMERIC[settings];else if(typeof settings=="undefined")userSettings={};else userSettings=settings;$.extend(combinedSettings,DEFAULT_SETTINGS_NUM,userSettings);return combinedSettings}function alphanum_allowChar(validatedStringFragment,Char,settings){if(settings.maxLength&&validatedStringFragment.length>=settings.maxLength)return false;if(settings.allow.indexOf(Char)>=0)return true;if(settings.allowSpace&&Char==" ")return true;if(!settings.allowNewline&&(Char=="\n"||Char=="\r"))return false;if(settings.blacklistSet.contains(Char))return false;if(!settings.allowNumeric&&DIGITS[Char])return false;if(!settings.allowUpper&&isUpper(Char))return false;if(!settings.allowLower&&isLower(Char))return false;if(!settings.allowCaseless&&isCaseless(Char))return false;if(!settings.allowLatin&&LATIN_CHARS.contains(Char))return false;if(!settings.allowOtherCharSets){if(DIGITS[Char]||LATIN_CHARS.contains(Char))return true;else return false}return true}function numeric_allowChar(validatedStringFragment,Char,settings){if(DIGITS[Char]){if(isMaxDigitsReached(validatedStringFragment,settings))return false;if(isMaxPreDecimalsReached(validatedStringFragment,settings))return false;if(isMaxDecimalsReached(validatedStringFragment,settings))return false;if(isGreaterThanMax(validatedStringFragment+Char,settings))return false;if(isLessThanMin(validatedStringFragment+Char,settings))return false;return true}if(settings.allowPlus&&Char=="+"&&validatedStringFragment=="")return true;if(settings.allowMinus&&Char=="-"&&validatedStringFragment=="")return true;if(Char==THOU_SEP&&settings.allowThouSep&&allowThouSep(validatedStringFragment))return true;if(Char==DEC_SEP){if(validatedStringFragment.indexOf(DEC_SEP)>=0)return false;if(settings.allowDecSep&&settings.maxDecimalPlaces===0)return false;if(settings.allowDecSep)return true}return false}function countDigits(string){string=string+"";return string.replace(/[^0-9]/g,"").length}function isMaxDigitsReached(string,settings){var maxDigits=settings.maxDigits;if(maxDigits===""||isNaN(maxDigits))return false;var numDigits=countDigits(string);if(numDigits>=maxDigits)return true;return false}function isMaxDecimalsReached(string,settings){var maxDecimalPlaces=settings.maxDecimalPlaces;if(maxDecimalPlaces===""||isNaN(maxDecimalPlaces))return false;var indexOfDecimalPoint=string.indexOf(DEC_SEP);if(indexOfDecimalPoint==-1)return false;var decimalSubstring=string.substring(indexOfDecimalPoint);var numDecimals=countDigits(decimalSubstring);if(numDecimals>=maxDecimalPlaces)return true;return false}function isMaxPreDecimalsReached(string,settings){var maxPreDecimalPlaces=settings.maxPreDecimalPlaces;if(maxPreDecimalPlaces===""||isNaN(maxPreDecimalPlaces))return false;var indexOfDecimalPoint=string.indexOf(DEC_SEP);if(indexOfDecimalPoint>=0)return false;var numPreDecimalDigits=countDigits(string);if(numPreDecimalDigits>=maxPreDecimalPlaces)return true;return false}function isGreaterThanMax(numericString,settings){if(!settings.max||settings.max<0)return false;var outputNumber=parseFloat(numericString);if(outputNumber>settings.max)return true;return false}function isLessThanMin(numericString,settings){if(!settings.min||settings.min>0)return false;var outputNumber=parseFloat(numericString);if(outputNumber<settings.min)return true;return false}function trimAlphaNum(inputString,settings){if(typeof inputString!="string")return inputString;var inChars=inputString.split("");var outChars=[];var i=0;var Char;for(i=0;i<inChars.length;i++){Char=inChars[i];var validatedStringFragment=outChars.join("");if(alphanum_allowChar(validatedStringFragment,Char,settings))outChars.push(Char)}var outputString=outChars.join("");if(settings.forceLower)outputString=outputString.toLowerCase();else if(settings.forceUpper)outputString=outputString.toUpperCase();return outputString}function trimNum(inputString,settings){if(typeof inputString!="string")return inputString;var inChars=inputString.split("");var outChars=[];var i=0;var Char;for(i=0;i<inChars.length;i++){Char=inChars[i];var validatedStringFragment=outChars.join("");if(numeric_allowChar(validatedStringFragment,Char,settings))outChars.push(Char)}return outChars.join("")}function isUpper(Char){var upper=Char.toUpperCase();var lower=Char.toLowerCase();if(Char==upper&&upper!=lower)return true;else return false}function isLower(Char){var upper=Char.toUpperCase();var lower=Char.toLowerCase();if(Char==lower&&upper!=lower)return true;else return false}function isCaseless(Char){if(Char.toUpperCase()==Char.toLowerCase())return true;else return false}function getBlacklistSet(allow,disallow){var setOfBadChars=new Set(BLACKLIST+disallow);var setOfGoodChars=new Set(allow);var blacklistSet=setOfBadChars.subtract(setOfGoodChars);return blacklistSet}function getDigitsMap(){var array="0123456789".split("");var map={};var i=0;var digit;for(i=0;i<array.length;i++){digit=array[i];map[digit]=true}return map}function getLatinCharsSet(){var lower="abcdefghijklmnopqrstuvwxyz";var upper=lower.toUpperCase();var azAZ=new Set(lower+upper);return azAZ}function allowThouSep(currentString){if(currentString.length==0)return false;var posOfDecSep=currentString.indexOf(DEC_SEP);if(posOfDecSep>=0)return false;var posOfFirstThouSep=currentString.indexOf(THOU_SEP);if(posOfFirstThouSep<0)return true;var posOfLastThouSep=currentString.lastIndexOf(THOU_SEP);var charsSinceLastThouSep=currentString.length-posOfLastThouSep-1;if(charsSinceLastThouSep<3)return false;var digitsSinceFirstThouSep=countDigits(currentString.substring(posOfFirstThouSep));if(digitsSinceFirstThouSep%3>0)return false;return true}function Set(elems){if(typeof elems=="string")this.map=stringToMap(elems);else this.map={}}Set.prototype.add=function(set){var newSet=this.clone();for(var key in set.map)newSet.map[key]=true;return newSet};Set.prototype.subtract=function(set){var newSet=this.clone();for(var key in set.map)delete newSet.map[key];return newSet};Set.prototype.contains=function(key){if(this.map[key])return true;else return false};Set.prototype.clone=function(){var newSet=new Set;for(var key in this.map)newSet.map[key]=true;return newSet};function stringToMap(string){var map={};var array=string.split("");var i=0;var Char;for(i=0;i<array.length;i++){Char=array[i];map[Char]=true}return map}$.fn.alphanum.backdoorAlphaNum=function(inputString,settings){var combinedSettings=getCombinedSettingsAlphaNum(settings);return trimAlphaNum(inputString,combinedSettings)};$.fn.alphanum.backdoorNumeric=function(inputString,settings){var combinedSettings=getCombinedSettingsNum(settings);return trimNum(inputString,combinedSettings)};$.fn.alphanum.setNumericSeparators=function(settings){if(settings.thousandsSeparator.length!=1)return;if(settings.decimalSeparator.length!=1)return;THOU_SEP=settings.thousandsSeparator;DEC_SEP=settings.decimalSeparator}})(jQuery);(function($){function caretTo(el,index){if(el.createTextRange){var range=el.createTextRange();range.move("character",index);range.select()}else if(el.selectionStart!=null){el.focus();el.setSelectionRange(index,index)}}function caretPos(el){if("selection"in document){var range=el.createTextRange();try{range.setEndPoint("EndToStart",document.selection.createRange())}catch(e){return 0}return range.text.length}else if(el.selectionStart!=null){return el.selectionStart}}$.fn.alphanum_caret=function(index,offset){if(typeof index==="undefined"){return caretPos(this.get(0))}return this.queue(function(next){if(isNaN(index)){var i=$(this).val().indexOf(index);if(offset===true){i+=index.length}else if(typeof offset!=="undefined"){i+=offset}caretTo(this,i)}else{caretTo(this,index)}next()})}})(jQuery);(function(e){var t=function(e){return e.replace(/([a-z])([a-z]+)/gi,function(e,t,n){return t+n.toLowerCase()}).replace(/_/g,"")},n=function(e){return e.replace(/^([a-z]+)_TO_([a-z]+)/i,function(e,t,n){return n+"_TO_"+t})},r=function(e){return e?e.ownerDocument.defaultView||e.ownerDocument.parentWindow:window},i=function(t,n){var r=e.Range.current(t).clone(),i=e.Range(t).select(t);if(!r.overlaps(i)){return null}if(r.compare("START_TO_START",i)<1){startPos=0;r.move("START_TO_START",i)}else{fromElementToCurrent=i.clone();fromElementToCurrent.move("END_TO_START",r);startPos=fromElementToCurrent.toString().length}if(r.compare("END_TO_END",i)>=0){endPos=i.toString().length}else{endPos=startPos+r.toString().length}return{start:startPos,end:endPos}},s=function(t){var n=r(t);if(t.selectionStart!==undefined){if(document.activeElement&&document.activeElement!=t&&t.selectionStart==t.selectionEnd&&t.selectionStart==0){return{start:t.value.length,end:t.value.length}}return{start:t.selectionStart,end:t.selectionEnd}}else if(n.getSelection){return i(t,n)}else{try{if(t.nodeName.toLowerCase()=="input"){var s=r(t).document.selection.createRange(),o=t.createTextRange();o.setEndPoint("EndToStart",s);var u=o.text.length;return{start:u,end:u+s.text.length}}else{var a=i(t,n);if(!a){return a}var f=e.Range.current().clone(),l=f.clone().collapse().range,c=f.clone().collapse(false).range;l.moveStart("character",-1);c.moveStart("character",-1);if(a.startPos!=0&&l.text==""){a.startPos+=2}if(a.endPos!=0&&c.text==""){a.endPos+=2}return a}}catch(h){return{start:t.value.length,end:t.value.length}}}},o=function(e,t,n){var i=r(e);if(e.setSelectionRange){if(n===undefined){e.focus();e.setSelectionRange(t,t)}else{e.select();e.selectionStart=t;e.selectionEnd=n}}else if(e.createTextRange){var s=e.createTextRange();s.moveStart("character",t);n=n||t;s.moveEnd("character",n-e.value.length);s.select()}else if(i.getSelection){var o=i.document,u=i.getSelection(),f=o.createRange(),l=[t,n!==undefined?n:t];a([e],l);f.setStart(l[0].el,l[0].count);f.setEnd(l[1].el,l[1].count);u.removeAllRanges();u.addRange(f)}else if(i.document.body.createTextRange){var f=document.body.createTextRange();f.moveToElementText(e);f.collapse();f.moveStart("character",t);f.moveEnd("character",n!==undefined?n:t);f.select()}},u=function(e,t,n,r){if(typeof n[0]==="number"&&n[0]<t){n[0]={el:r,count:n[0]-e}}if(typeof n[1]==="number"&&n[1]<=t){n[1]={el:r,count:n[1]-e}}},a=function(e,t,n){var r,i;n=n||0;for(var s=0;e[s];s++){r=e[s];if(r.nodeType===3||r.nodeType===4){i=n;n+=r.nodeValue.length;u(i,n,t,r)}else if(r.nodeType!==8){n=a(r.childNodes,t,n)}}return n};jQuery.fn.selection=function(e,t){if(e!==undefined){return this.each(function(){o(this,e,t)})}else{return s(this[0])}};e.fn.selection.getCharElement=a})(jQuery);