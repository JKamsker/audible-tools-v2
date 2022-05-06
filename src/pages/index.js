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

import { v4 } from 'uuid';
// import {
//   setQuality,
//   enableEncode,
//   setOperatingSystem,
//   setOutputFormat
//   } from 'src/features/settings/settingsSlice';

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

  >
    <AudioBook {...bookData} />
  </Grid>);
};



const onFiles = async (files, addBookData) => {
  let converter = new OnlineConverter();



  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    let info = await converter.getInfo(file);

    const checksum = await extractChecksum(file);
    const bytes = await resolveActivationBytes(checksum);

    info = { ...info, checksum, activationBytes: bytes, getFile: () => file, key: v4() };

    addBookData(info)
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

  // const [bookData, setbookData] = useState(def);

  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.books.items);

  useEffect(async () => await OnlineConverter.initialize());
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
          {RenderBooks(bookData)}
          <AudioDropzone onDrop={(files) => onFiles(files, book => dispatch(addBook(book)))} />
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
