import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';

import FindInPageIcon from '@mui/icons-material/FindInPage';
import { ModalVerRegistro } from './modalVerRegistro';
// import { ModalMostrarDetalle } from './modalMostrarDetalle';


export const BtnMostrarDetalle = ({row}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalVerRegistro 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
    />
   
 

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
      <Tooltip title="Mostrar detalle" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <FindInPageIcon fontSize="medium" color="info"/>
      </IconButton>
    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnMostrarDetalle);