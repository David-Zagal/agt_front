export const constantes = {
  endpoints: {
      signin: 'api/auth/signin',
      signout: 'api/auth/logout',
      menu: 'app/mostrarMenu',
      userdata: 'app/user/user-data',
      dicodef: 'app/user/dicodef/',
      comprobarPermisos: 'app/permisos/',
      refresh: 'api/auth/refresh',
      versionBack: 'adm/monitor/infoAplicacion',

      // Files
      getFileDocumentum: 'app/file/descargaFicheroDocumento',
      // consultaFileDocumentum: 'app/dctm/consultaDocumento',
      createFileDocumentum: 'app/file/creacionDocumento',
      uploadFileDocumentum: 'app/file/subidaFicheroDocumento',
      deleteFileDocumentum: 'app/file/borradoDocumento',

      // Menu
      listOpcMenu: 'app/menu/list',
      monitor: 'adm/monitor/testcompleto',

      // Mantenimiento Beneficiarios
      listBeneficiarios: 'app/mant/beneficiario',
      addBeneficiario: 'app/mant/beneficiario',
      getBeneficiario: 'app/mant/beneficiario/',
      editBeneficiario: 'app/mant/beneficiario/',
      deleteBeneficiario: 'app/mant/beneficiario/',
      saveRoles: 'app/mant/beneficiario/roles',

      // Roles
      listRoles: 'app/adm/rol',

      // Usuarios
      listUsuarios: 'app/adm/usuario',
      addUsuario: 'app/adm/usuario/crearUsuarioCentro',
      getUsuario: 'app/adm/usuario/detalleUsuarioCentro/',
      getUsuarioDicodef: 'app/adm/usuario/dicodef/',
      editUsuario: 'app/adm/usuario/crearUsuarioCentro',
      deleteUsuario: 'app/adm/usuario/eliminar/',
      saveRolesUsuario: 'app/adm/usuario/roles',
      getRoles: 'app/adm/usuario/roles/',
      getRolesByUser: 'app/adm/usuario/listarRolesPorUsuario/',

      // Emplazamientos
      listEmplazamientos: 'app/mant/emplazamiento/listar',
      addEmplazamiento: 'app/mant/emplazamiento/crear',
      editEmplazamiento: 'app/mant/emplazamiento/modificar',
      deleteEmplazamiento: 'app/mant/emplazamiento/eliminar/',
      getEmplazamiento: 'app/mant/emplazamiento/obtener/',
      getEmplazamientoActivo: 'app/mant/emplazamiento/buscarEmplazActivos',
      
      // Centros
      listCentros: 'app/mant/centro/listar',
      addCentro: 'app/mant/centro/crear',
      editCentro: 'app/mant/centro/modificar',
      deleteCentro: 'app/mant/centro/eliminar/',
      getCentro: 'app/mant/centro/obtener/',

      // Identificacion
      enviarIdentificacion: 'app/mant/identificacion/validar',

       // Fabricantes
       fabricantes: 'app/mant/fabricante/listar',
       addFabricante: 'app/mant/fabricante/crear',
       editFabricante: 'app/mant/fabricante/modificar',
       deleteFabricante: 'app/mant/fabricante/eliminar/',
       getFabricante: 'app/mant/fabricante/obtener/',
       getFabricanteActivo: 'app/mant/fabricante/buscarFabricantesActivos',

       // Tarjeta Modelo
       tarjetas: 'app/mant/tarjetaModelo/listar',
       getTarjeta: 'app/mant/tarjetaModelo/obtener/',
       addTarjetaModelo: 'app/mant/tarjetaModelo/crear',
       editarTarjeta: 'app/mant/tarjetaModelo/modificar',
       deleteTarjeta: 'app/mant/tarjetaModelo/eliminar/',
       getTarjetaActivo: 'app/mant/tarjetaModelo/buscarTarjetaModeloActivos',

       // Tarjeta Tipo
       tarjetaTipo: 'app/mant/tarjetaTipo/listar',
       getTarjetaTipo: 'app/mant/tarjetaTipo/obtener/',
       addTarjetaTipo: 'app/mant/tarjetaTipo/crear',
       editarTarjetaTipo: 'app/mant/tarjetaTipo/modificar',
       deleteTarjetaTipo: 'app/mant/tarjetaTipo/eliminar/',
       getTarjetaTipoActivo: 'app/mant/tarjetaTipo/buscarTarjetaTipoActivos'
  },
  
  TOKEN_KEY: 'token',
  REFRESH_TOKEN_KEY: 'refreshToken',
  AUTHORIZATION_HEADER_KEY: 'Authorization'
};