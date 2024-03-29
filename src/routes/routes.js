// project imports
// project imports
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';
import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';
import { FormularioRegistroAcciones } from 'views/pages/accionesCorrectivas/formularioRegistroAcciones';
import { ListaAcciones } from 'views/pages/accionesCorrectivas/listaAcciones';
import { ListaTranversal } from 'views/pages/accionesCorrectivas/tranversalidad/listaTranversal';
import { ReporteCorreo } from 'views/reporte/reporte';
import TabsTranversalidad from 'views/pages/accionesCorrectivas/tranversalidad/tabTranversalidad';
import PermisoModal from 'components/theme/SPermiso';
import { ListaCttoCstGen } from 'views/pages/accionesCorrectivas/tranversalidad/consultaTranversal/listaCttoCstGen';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CorreoDetalleAcciones } from 'views/pages/accionesCorrectivas/dashboard/correoAviso/correoDetalleAcciones';



const Routes =({data})=>{
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
  
    useEffect(() => {
      setActiveRoute(location.pathname);
    }, [location.pathname]);

//    console.log(activeRoute,'ruta activa')
  
    if(data.permiso.length > 0){

        const { rut, ctto } = data.datosSesion;
        const perUsu =  data.permiso[0].fk_perfil

        return (
            [{
                path: '/',
                element:  perUsu === 1 || perUsu ===2 ? <MainLayout permiso={perUsu}/>:<MensajeSinPermiso/>,
                children: [
                    {
                        path: '/inicio',
                        element: <Inicio permiso={perUsu}/>
                    },
                  
                    {
                        path: '/registro',
                        element: perUsu===1 || perUsu ===2 ?<ListaAcciones permiso={perUsu} usuario={rut} /> : <Navigate to='/web/accionesCorrectivas' />
                    
                    },
                    {
                        path: '/accCorrectivas',
                        element: perUsu===1 || perUsu ===2 ?<FormularioRegistroAcciones permiso={perUsu} usuario={rut} /> : <Navigate to='/web/accionesCorrectivas' />
                    
                    },
                    {
                        path: '/tranversal',
                        element: perUsu===1 || perUsu ===2 ?<TabsTranversalidad usuario={rut} tipo='3' estado='0' titulo='Estatus acciones correctivas' /> : <Navigate to='/web/accionesCorrectivas' />
                    },
                    {
                        path: '/consultaTranversal',
                        element: perUsu ===1 ?<ListaCttoCstGen usuario={rut} /> : <Navigate to='/web/accionesCorrectivas' />
                    },
                    {
                        path: '/CorreoDetalleAcciones',
                        element: <CorreoDetalleAcciones/>
                    },

                    {
                        path: '*',
                        element: <MensajeSinPermiso/>,  
                
                    },             
                    
                ]
            }]
        )
    }


    return(
        [
            {
                path: '/reporteCorreo',
                element: <ReporteCorreo/>,  

            },
            {
                path: '/CorreoDetalleAcciones',
                element: <CorreoDetalleAcciones/>,  

            },
            
            {
                path: '*',
                element: <MensajeSinPermiso/>,  

            },
        ] 
        
    )
}


export default Routes;