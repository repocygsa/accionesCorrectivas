/* eslint-disable array-callback-return */
import { useState } from 'react';

import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import { SnackComponent } from 'components/theme/SnackComponent';

export const TableStock = () => {

    const [snackMensaje, setSnackMensaje] = useState('');

    return (
      <MainCard title="Entregas">
        <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje}/>

        <Grid container spacing={2} rowSpacing={1} mt={1}>
          <Grid item md={12} xs={12} align="right">
            aqui entregas
          </Grid>
        </Grid>

      </MainCard>
    )

}
