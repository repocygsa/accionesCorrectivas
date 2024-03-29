import { Grid, Link, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo, useState } from 'react';


import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import {BtnEditarTransversal} from './editarTranversalidad/btnEditarTransversal';

import {BtnMostrarDetalleTran} from './editarTranversalidad/btnMostrarDetalleTran';
import { BtnCancelAcc } from './cttosTranversal/btnCancelAcc';






export const TablaAccionesTran = ({dataRegistroStock, setSnackMensaje, usuario, ctto, empre }) => {


  const [showFullContent, setShowFullContent] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState(40);

  const handleVerMasClick = () => {
    setShowFullContent(!showFullContent);
  };

  const CustomMedCorrCell = ({ medCorrectiva }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        {expanded ? medCorrectiva : medCorrectiva.slice(0, 80)}&nbsp;
        {medCorrectiva.length > 80 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            type="button"
            component="button"
            sx={{ fontSize: 'inherit' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </Link>
        )}
      </div>
    );
  };

  const CustomEstatusCell2 = ({ estatus, est , com }) => {
     
    let textColor = 'black'; // Color predeterminado
    if(est){
    if(est === 3){
      textColor ='red';
      estatus='No Aplica'
    }else if (est === 1) {
        textColor ='blue';
        estatus='Sin complementar'
      
      } else if (est === 2) {
        textColor = 'green';
        estatus=`Complementado`;
        if(com===3){
          textColor = 'green';
          estatus=`Complementado`;
        }
      }else if(com===4){
        textColor = 'red';
        estatus=`Eliminado`;
      }
    }else{
      textColor ='blue';
      estatus='Sin complementar'
    }
  
    return (
      <Typography style={{ color: textColor }}>
        {estatus}
      </Typography>
    );
  };

      const CustomEstatusCell = ({ estatus, porcentaje }) => (
        <Box position="relative" display="inline-flex">
        <CircularProgress size={30} variant="determinate" value={porcentaje} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(porcentaje)}%`}</Typography>
        </Box>
      </Box>
        );


    const columnasDatosStock=[  
      {
        field:'accion',
        headerName:'Acciones',
        headerAlign: 'center',
        minWidth: 150,
        renderCell:(params)=> 
        <>
          {/* 
         <BtnEditar row={params.row}/> */} 
        
         <BtnEditarTransversal row={params.row} usuario={usuario} ctto={ctto} empre={empre} setSnackMensaje={setSnackMensaje}/>
         <BtnCancelAcc row={params.row} setSnackMensaje={setSnackMensaje} ctto={ctto} usuario={usuario}/>
         <BtnMostrarDetalleTran row={params.row}/>
         
        </>,
    },

    
     {
        field:'estP',
        headerName:'Estado',
        align:'left',
        minWidth: 180,
        renderCell:(params)=> 
        <>
            <CustomEstatusCell2 estatus='' est={params.row.estado_complemento}  com={params.row.cerradas}/>
            
          { /* <BtnMostrarDetalle row={params.row} /> */ }  
            
        </>,
    }, 

    {
      field:'fCierr',
      headerName:'Fecha de cierre',
      align:'left',
      minWidth: 150,
      valueGetter:(params)=>moment(params.row.inc_det_fecha_cierre).format('DD-MM-YYYY')
  },    
    {
      field:'medcorr',
      headerName:'Acción correctiva',
      align:'left',
      minWidth: 500,
      renderCell: (params) => <CustomMedCorrCell medCorrectiva={params.row.inc_med_correctiva} />,
  },


 
     
       
       
    ];

    return (

        <Grid container spacing={1} mt={1} rowSpacing={1}>
            <Grid item md={12} xs={12}>
                {
                dataRegistroStock.length === 0 ?
                <Typography variant="h4" color="primary">
                  No se encontraron datos
                </Typography>
                :
                <>
                <DataGrid    
                    autoHeight
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    getRowId={(row) => row.id}
                    columns={columnasDatosStock} 
                    rows={dataRegistroStock} 
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    getEstimatedRowHeight={() => 100}
                    getRowHeight={() => 'auto'}
                />
                </>
                }
            </Grid>
        </Grid>

    )

}
export default memo(TablaAccionesTran);


