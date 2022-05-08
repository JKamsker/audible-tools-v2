import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { AudioBook } from '../components/dashboard/audiobook';
import { DashboardLayout } from '../components/dashboard-layout';

import React, { useEffect, useState } from 'react'
import AudioDropzone from '../components/dashboard/audio-dropzone';
import OnlineConverter from '../utils/online-converter';

import { extractChecksum, resolveActivationBytes } from '../utils/AaxChecksumExtractor'

import { useSelector, useDispatch } from 'react-redux'
import { addBook, updateProgress } from 'src/features/books/bookSlice';

import { v4 as uuid } from 'uuid';

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
      key: uuid(),
    };

    addBookData(info);
  }

  if (onProgress) {
    onProgress({ value: 0, finished: true });
  }
}


const Dashboard = () => {
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

      <Container maxWidth={false}>

        <Grid
          container
          spacing={3}
          style={{ marginTop: '1px' }}
        >
          {bookData.map((book) => (
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
              key={book.key}
            >
              <AudioBook {...book} />
          </Grid>))}
          <AudioDropzone
            onDrop={(files) => onFiles(
              files,
              book => dispatch(addBook(book)),
              callback => dispatch(updateProgress(callback))
            )} />
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
