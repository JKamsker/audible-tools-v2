import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { AudioBook } from '../components/dashboard/audiobook';
import { DashboardLayout } from '../components/dashboard-layout';

import React, { useEffect, useState } from 'react'
import AudioDropzone from '../components/dashboard/audio-dropzone';
import OnlineConverter from '../utils/online-converter';

import { extractChecksum, resolveActivationBytes } from '../utils/AaxChecksumExtractor'

import { useSelector, useDispatch } from 'react-redux'
import { addBook } from 'src/features/books/bookSlice';
import LinearProgress from '@mui/material/LinearProgress';

import { v4 } from 'uuid';

const RenderBooks = (bookData) => {
  return bookData.map((book, index) => RenderBook(book));
}

const RenderBook = (bookData) => {
  return (<Grid
    item
    xl={3}
    lg={4}
    sm={6}
    xs={12}
    key={bookData.key}
  >
    <AudioBook {...bookData} />
  </Grid>);
};



const onFiles = async (files, addBookData, onProgress) => {
  let converter = new OnlineConverter();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    let info = await converter.getInfo(file, ({ current, total, percent }) => {
      const absoluteProgress = (i / files.length) * 100;

      const chunkSize = (1 / files.length);
      const progress = absoluteProgress + (chunkSize * percent);

      console.log({
        progress,
        i,
        current,
        total,
        percent,
        absoluteProgress
      });

      if (onProgress) {
        onProgress({ value: progress, finished: false });
      }
    });

    const checksum = await extractChecksum(file);
    const bytes = await resolveActivationBytes(checksum);

    info = {
      ...info,
      checksum,
      activationBytes: bytes,
      key: v4(),
      // getFile: () => file,
    };

    addBookData(info);
  }

  if (onProgress) {
    onProgress({ value: 100, finished: true });
  }
}


const Dashboard = () => {
  // const def = false ? [{
  //   name: "Book",
  //   author: "TestAuthor",
  //   title: "TestTitle",
  //   fileName: "TestFileName.file",
  //   checksum: "deadbeef",
  //   activationBytes: "deadbeef",
  //   duration: "25:36",
  // }] : [];
  const [progress, setProgress] = React.useState({ value: 0, finished: true });

  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.books.items);

  useEffect(async () => await OnlineConverter.initialize());
  return (
    <>
      <Head>
        <title>
          AAX Converter
        </title>
      </Head>
      <LinearProgress variant="determinate" 
          value={progress?.value} 
          style={{ display: progress.finished ? 'none' : 'block' }} 
      />
      <Container maxWidth={false}>

        <Grid
          container
          spacing={3}
          style={{ marginTop: '1px' }}
        >
          {RenderBooks(bookData)}
          <AudioDropzone 
            onDrop={(files) => onFiles(files, book => dispatch(addBook(book)), callback => {
            setProgress(callback);
          })} />
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
