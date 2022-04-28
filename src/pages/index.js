import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
// import { LatestOrders } from '../components/dashboard/latest-orders';
// import { LatestProducts } from '../components/dashboard/latest-products';
// import { Sales } from '../components/dashboard/sales';
// import { TasksProgress } from '../components/dashboard/tasks-progress';
// import { TotalCustomers } from '../components/dashboard/total-customers';
// import { TotalProfit } from '../components/dashboard/total-profit';
// import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';

import React from 'react'
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';

// import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import MoneyIcon from '@mui/icons-material/Money';

// import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';


const RenderContainer = () => {
  return (<Grid
    item
    lg={3}
    sm={6}
    xl={3}
    xs={12}
  >
    <Budget />
  </Grid>);
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
}

const DummyDropZone = styled.div`
  padding: 30px;
  margin-left: 10px; 
  margin-right: -10px;
  margin-bottom: -15px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  width: 100%;
  text-align: center;
`;

// const RealDropZone = styled.div`
//   box-sizing: border-box;
//   display: none;
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   left: 0;
//   top: 0;
//   z-index: 99999;

//   background: rgba(#60a7dc,.8);
//   border: 11px dashed #60a7dc;
// `;


function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*'});

  return (
     <DummyDropZone {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select fil es</p>
      </DummyDropZone>
  );
}


const RenderDropZone = () => {
  return (<Grid
    item
    // lg={3}
    // sm={6}
    // xl={3}
    // xs={{gridColumn: '12', gridRow: 'span 12'}}
    xs={12}
  // minHeight="100px"
  >
    <Card
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
        // sx={{ justifyContent: 'space-between' }}
        // xs={12}
        >
          <StyledDropzone />

        </Grid>

      </CardContent>
    </Card>

  </Grid>);
};

const Dashboard = () => (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>

    <Dropzone
      noClick
      onDrop={acceptedFiles => {
        console.log(acceptedFiles);
        // this.acceptFiles(acceptedFiles);
      }}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8
              }}
              paddingBottom={200}
            >
              <Container maxWidth={false}>
                <Grid
                  container
                  spacing={3}
                >
                  {RenderContainer()}
                  {RenderContainer()}
                  {RenderDropZone()}
                </Grid>
              </Container>
            </Box>

          </div>
        </section>
      )}
    </Dropzone>


  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
