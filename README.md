# FileuploadApi
Projeto de exemplo para fazer upload de arquivos via webApi C#

Aqui compartilho com vocês um projeto simples que criei para facilitar upload de arquivos em PDF via WebAPI .netCore 6.0
Voce pode adaptar o código para fazer upload em outros formatos de arquivo, não se limitando a apenas PDF.

Exemplo de código wm c# no controller:

    [Route("api/[controller]")]
    [ApiController]
    public class UploadFiles : ControllerBase
    {
        private IWebHostEnvironment Host;
        private ObjResult Result;
        public UploadFiles(IWebHostEnvironment Host, ObjResult Result)
        {
            this.Host = Host;
            this.Result = Result;
        }

        [HttpPost]
        public ActionResult Post([FromBody] ObjComplement base64file)
        {
            try
            {
                Guid code = Guid.NewGuid();
                string srcfolder = string.Format("{0}/galeria/{1}.pdf", Host.WebRootPath, code.ToString()[..10]);
                string Path = string.Format("{0}/galeria", Host.WebRootPath);
                FileWR.CreateDirectory(Path);


                string Arquivo = Regex.Replace(base64file.File, @"^data:application\/[a-zA-Z]+;base64,", string.Empty);
                byte[] bytes = Convert.FromBase64String(Arquivo);

                FileStream stream = new FileStream(srcfolder, FileMode.CreateNew);
                BinaryWriter writer = new BinaryWriter(stream);
                writer.Write(bytes, 0, bytes.Length);
                writer.Close();

                Result.Return= string.Format("====================================================================<br>" +
                    "<p>**** ARQUIVO SALVO ****</p><p>{0}</p><====================================================", srcfolder);

                return Ok(Result);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }

Exemplo do código em jquery no cliente para fazer o upload:

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




    
