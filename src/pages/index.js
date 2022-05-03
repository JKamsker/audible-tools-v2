import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { AudioBook } from '../components/dashboard/audiobook';
import { Sales } from '../components/dashboard/sales';
import { DashboardLayout } from '../components/dashboard-layout';

import React from 'react'
import { useDropzone } from 'react-dropzone';
import AudioDropzone from './audio-dropzone';
import { TotalProfit } from 'src/components/dashboard/total-profit';
// import { GetInfo } from '../utils/online-converter';

import { getInfo } from 'react-mediainfo'

const RenderContainer = () => {
  return (<Grid
    item
    xl={3}
    lg={4}
    sm={6}
    xs={12}

  >

    <AudioBook name="Book"
      author="James Islington"
      title="The Shadow of What Was Lost: The Licanius Trilogy, Book 1"
      fileName="TheShadowofWhatWasLostTheLicaniusTrilogyBook1_ep6.aax"
      checksum="a4cfea52649d6efc12c5174b6b51dd523f102fa1"
      activationBytes="9f786605"
      duration="25:36"
    />
  </Grid>);
};

const RenderProfit = () => {
  return (<Grid
    item
    lg={3}
    sm={6}
    xl={3}
    xs={12}
  >
    <TotalProfit />
  </Grid>);
};

const onFiles = async (files) => {
  console.log(files);
  const info = await getInfo(files[0]);
  // debugger;




  for (let i = 0; i < files.length; i++) {
    // let res = await GetInfo(files[i]);
    debugger;
  }
}

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard | Material Kit
        </title>
      </Head>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          {RenderContainer()}
          {RenderContainer()}
          {RenderContainer()}
          {RenderContainer()}
          {RenderContainer()}
          {RenderProfit()}
          <AudioDropzone onDrop={onFiles} />
        </Grid>
      </Container>
    </>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
