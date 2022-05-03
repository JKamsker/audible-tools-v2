import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { IconButton } from '@mui/material';
import Image from 'next/image'


// import TestCover from './TestCover.jpg';
const myLoader = ({ src, width, quality }) => {
  return `http://localhost:3000/static/images/TestCover.jpg`
}

export const AudioBook = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item sx={{
          display: {
            xs: "none", md: "flex"
          },
          justifyContent: 'center',
          alignItems: 'center',

        }} md={4}>
          {/* <CardMedia component="img" image={TestCover} /> */}
          <Image
            loader={myLoader}
            src="me.png"
            alt="Picture of the author"
            width={500}
            height={500}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <Grid item xs={12}> */}
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            style={{ display: 'inline-block', width: '100%' }}
            noWrap
          >
            {props.fileName}
          </Typography>
          {/* </Grid> */}
          {renderText("Title", props.title)}
          {renderText("Author", props.author)}
          {renderText("Checksum", props.checksum, true)}
          {renderText("Activation Bytes", props.activationBytes, true)}
          {renderText("Runtime", props.duration)}
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
function renderText(description, text, enableCopy = false) {
  const copyField = !enableCopy ? <></> : (<CopyToClipboard text={text} style={{ padding: '0px' }}>
    <IconButton >
      <FileCopyOutlinedIcon />
    </IconButton>
  </CopyToClipboard>);

  return (
    <Typography
      color="textPrimary"
      variant="h7"
      noWrap
      style={{ display: 'inline-block', width: '100%' }}
    >
      {copyField}
      {description}: {text}
    </Typography>
  );


}

