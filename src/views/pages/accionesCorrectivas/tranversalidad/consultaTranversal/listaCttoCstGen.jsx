/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { SocketContext } from 'context/SocketContext';
import { getContratosCstGen } from 'helpers/gets';
import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MainCard from 'ui-component/cards/MainCard';
import { FormAccionesFilter } from '../../formAccionesFilter';
import { TablaCttoCstGen } from './tablaCttoCstGen';



export const ListaCttoCstGen = ({permiso, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

    const filtroInicial = {
      emp_inf:'0',
      ctt_inf: 'Todo',
      pos_inf:'',
  }

    const [filtrosStock, setFiltroStock] = useState(filtroInicial)

    const queryClient = useQueryClient();
    const { socket } = useContext(SocketContext);
  //  const [usuario, setUsuario] = useState('');


    

    const {
      data: DataCst, 
      isLoading:isLoadingDataCst
  } = useQuery(['QueryCst',filtrosStock], 
      ()=>getContratosCstGen(filtrosStock)
  );



    

    return (

  <>
  
  <MainCard title="Listado de registros">

  <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} /><Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
      
       <Grid item md={12} xs={12}>
       <FormAccionesFilter setFiltroStock={setFiltroStock} usuario={usuario} setSnackMensaje={setSnackMensaje}/>
     </Grid>
  



        <Grid item md={12} xs={12}>
          {isLoadingDataCst ? '' : <TablaCttoCstGen dataRegistroStock={DataCst.data.result} setSnackMensaje={setSnackMensaje} user={usuario}  />}
        </Grid>
      </Grid>
      </MainCard>
      </>

    )

}

