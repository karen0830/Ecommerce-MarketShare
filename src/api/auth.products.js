import instance from "./axios";

const ruta_protegida = () => {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const clienteAxios = instance.create({
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      return clienteAxios;
    }else{
      const clienteAxios = instance.create({
        headers: {
          'authorization': `Bearer null`
        }
      });
      return clienteAxios;
    }
}

export const getAllProductsCompany = async () => {
    try {
        const response = await ruta_protegida().get('/getAllProductsCompany');
        return response;
      } catch (ex) {
        console.log("error.status:", ex);
        return ex
      }
}