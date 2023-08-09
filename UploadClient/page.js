
$(document).on("change", ".FileUploadBudget", function (e) {
    //Read File
    var selectedFile = document.getElementById("inputFile").files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;            
            EnviarFile(base64, fileToLoad.name, fileToLoad.type, fileToLoad.name.split('.').pop());
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }

});

function EnviarFile(filebase64, filename, type, FileExtension) {      
        console.log("Enviando arquivo..."); 
        let Objdata = { "file": filebase64, "filename": filename, "typefile": type, "fileExtension": FileExtension };
        console.log(Objdata);
        let run = { authorization: false, control: "UploadFiles", data: Objdata };
        $.ApiPOST(run).done(function (data) {           
            $("#inputFile").val("");
            var response = JSON.stringify(data);
            var final = JSON.parse(response);
            $(".content").append(final["return"]);           

        }).fail(function (jqXHR, textStatus, errorThrown) {                     

            if (jqXHR.status == 0) {
               
            } else if (jqXHR.status == 404) {
               
            } else if (jqXHR.status == 500) {
                
            } else if (exception === 'parsererror') {
                
            } else if (exception === 'timeout') {
               
            } else if (exception === 'abort') {
                
            } else {
               
            }
        });
    } 
