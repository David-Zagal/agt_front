@Library('JenkinsfileComun')

// Declaración de parámetros para Jenkinsfile común. Debe contener los siguientes parámetros:
// Tecnologia,ExisteBD,ExisteRPT,LanzarSonar,SubCarpetaFTP,RutaPom,ParametrosMaven,DesaWindows
def params = [:]

// Para funciones específicas como compilación, sonarqube.... Los valores posibles son: java, net, tibco
params.put("Tecnologia","angular")

// Valores para FTP: 1 = Proyecto con RPT; 0 = Proyecto con sin RPT
// Si tiene BD, poner la ruta: personal/SAPROMIL/SAPROMIL_BD.git; si no tiene dejar con valor ""
params.put("ExisteBD","")
params.put("ExisteRPT","0")

// Ejecutar Analisis Sonarqube: 1 = si; 0 = no
params.put("LanzarSonar","0")




// Si es distinta de source/pom.xml, para "source/carpeta/pom.xml" se pone valor: "carpeta/"
params.put("RutaPackage","")

// Valores de nombre y rutas solo para PRE y PRO:
String [] NomDespliegue = new String[4]; // Tamaño total
String [] RutaDespliegue = new String[4]; // Tamaño total
NomDespliegue[0] = "PRE/AGT_FRONT.zip"
RutaDespliegue[0] = ""
NomDespliegue[1] = "PRO/AGT_FRONT.zip"
RutaDespliegue[1] = ""
// Si tuviera más de 1:
// Nombre archivo para despliegue: despliegue.ear
// Ruta entre source y target -> EJ: source/carpeta2/target/despliegue.war -> RutaDespliegue[1] = "carpeta2"
// NomDespliegue[1] = ""
// RutaDespliegue[1] = ""
// Una vez preparados los datos, se incluye en el Map de parámetros:
params.put("NomDespliegue",NomDespliegue);
params.put("RutaDespliegue",RutaDespliegue);

// Si el FTP va en subcarpeta, poner la barra (/) al inicio, sino dejar en blanco
params.put("SubCarpetaFTP","")

// Despliegue en entorno Desarrollo y Validación: Windows = 1; Linux = 0
params.put("DesaWindows","0") // OBSOLETO

// Eliminar archivos temporales Jenkins al finalizar
params.put("CleanWorkspace","1")

//////////////////////////////
///        PIPELINE        ///
//////////////////////////////

exec_pipeline_angular(params)	


//////////////////////////////
/// FUNCIONES A REEMPLAZAR ///
//////////////////////////////
public class Deploy implements Serializable  {

    // Desplegar Entorno Desarrollo. 
    // Realiza el despliege en la máquina que corresponde, subida de despliegues y 
    //        comandos de parada y arranque tomcat, apache, etc
    def deploy_develop_ftp(script){
        script.echo "FTP Desarrollo"
            script.sshagent(['jenkins-generated-ssh-key']) {
            
                // Máquina srvcceacml26
                // Actualización contenido estático.
                script.sh 'ssh root@srvcceacml26.mdef.es  systemctl stop apache_MAQUETAS.service'
                sleep(10)
                try{
                    script.sh 'ssh root@srvcceacml26.mdef.es ps -ef | grep apache_MAQUETAS | awk \'{print $2}\' | xargs kill -9'
                }catch(err){
                    script.echo "Parando Apache srv26:" + err
                }
                sleep(2)

                // -> Borrar  carpeta  AGT
                script.sh 'ssh root@srvcceacml26.mdef.es  rm -rf /opt/apaches/apache_MAQUETAS/www/html/AGT/'
                // -> Copiar el contenido y subcarpetas
                script.sh 'scp -r source/dist root@srvcceacml26.mdef.es:/opt/apaches/apache_MAQUETAS/www/html/AGT/'
                // -> Arrancar servicio Apache
                script.sh 'ssh root@srvcceacml26.mdef.es  systemctl start apache_MAQUETAS.service'                
                
            }

    }

   
    // Desplegar Entorno Validación. 
    // Realiza el despliege en la máquina que corresponde, subida de despliegues y 
    //        comandos de parada y arranque tomcat, apache, etc
    def deploy_validation_ftp(script){
        script.echo "FTP Validación"
         script.sshagent(['jenkins-generated-ssh-key']) {
            
                // Máquina srvcceacml55d
                // Actualización contenido estático.
                script.sh 'ssh root@srvcceacml55d.mdef.es  systemctl stop apache_MAQUETAS.service'
                sleep(10)
                try{
                    script.sh 'ssh root@srvcceacml55d.mdef.es ps -ef | grep apache_MAQUETAS | awk \'{print $2}\' | xargs kill -9'
                }catch(err){
                    script.echo "Parando Apache srv55:" + err
                }
                sleep(2)

                // -> Borrar  carpeta  AGT
                script.sh 'ssh root@srvcceacml55d.mdef.es  rm -rf /opt/apaches/apache_MAQUETAS/www/html/AGT/'
                // -> Copiar el contenido y subcarpetas
                script.sh 'scp -r source/dist root@srvcceacml55d.mdef.es:/opt/apaches/apache_MAQUETAS/www/html/AGT/'
                // -> Arrancar servicio Apache
                script.sh 'ssh root@srvcceacml55d.mdef.es  systemctl start apache_MAQUETAS.service'
                
                // Máquina srvcceacml56d
                // Actualización contenido estático.
                script.sh 'ssh root@srvcceacml56d  systemctl stop apache_MAQUETAS.service'
                sleep(10)
                try{
                    script.sh 'ssh root@srvcceacml56d ps -ef | grep apache_MAQUETAS | awk \'{print $2}\' | xargs kill -9'
                }catch(err){
                    script.echo "Parando Apache srv56:" + err
                }
                sleep(2)

                // -> Borrar  carpeta  AGT
                script.sh 'ssh root@srvcceacml56d  rm -rf /opt/apaches/apache_MAQUETAS/www/html/AGT/'
                // -> Copiar el contenido y subcarpetas
                script.sh 'scp -r source/dist root@srvcceacml56d:/opt/apaches/apache_MAQUETAS/www/html/AGT/'
                // -> Arrancar servicio Apache
                script.sh 'ssh root@srvcceacml56d  systemctl start apache_MAQUETAS.service'
            } 
    }
    
}

