# File PDF UPLOAD WebAPI C#
Projeto de exemplo para fazer upload de arquivos via webApi C#

Aqui compartilho com vocês um projeto simples que criei para facilitar upload de arquivos em PDF via WebAPI .netCore 6.0
Voce pode adaptar o código para fazer upload em outros formatos de arquivo, não se limitando a apenas PDF.

Exemplo de código em c# no controller:

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








    
