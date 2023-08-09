namespace ExemploUploadApi.Model
{
    public class FileWR
    {
        /// <summary>
        /// Cria um diretorio 
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool CreateDirectory(string path)
        {
            try
            {
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                    return true;
                }
                else
                {
                    return false;
                }
            }

            catch 
            {
                return false;
            }
        }
    }
}
