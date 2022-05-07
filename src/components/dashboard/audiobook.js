import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Image from 'next/image'



// import TestCover from './TestCover.jpg';
const myLoader = ({ src, width, quality }) => {
  // if(props.cover){
  //   return <Image src={props.cover} width={width} quality={quality} />
  // }
  return `http://localhost:3000/static/images/TestCover.jpg`
}

export const AudioBook = (props) => {
  const url = "data:image/png;base64," + props.cover;
  const xLoader = props.cover ? () => url : myLoader;
  // alert(props.getFile().name);

  // const example = ({ data }) => <img src={`data:image/png;base64,${props.cover}`} />
  const coverImage = <Image
    loader={xLoader}
    src="Cover.png"
    alt="Cover Image"
    width={500}
    height={500}
    className="CoverImage" />;

  return (
    <Card
      sx={{ height: '100%' }}

    // {...props}
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
            alignItems: 'center'
          }} md={4}>
            {/* <CardMedia component="img" image={TestCover} /> */}
            {coverImage}
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
          <Grid item xs={12} >
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight:'10px', marginBottom:'10px' }}
            >
              Convert
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{  marginBottom:'10px' }}

            >
              Generate Command
            </Button>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};
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

