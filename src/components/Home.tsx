import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import Details from './Details';
import axios from 'axios';

import Intro from './Intro';

const drawerWidth = 240;

const theme = createTheme();
theme.typography.h3 = {
  fontWeight:'normal',
  color: "#222",
  whiteSpace: 'normal',
  fontSize: '2rem',
    '@media (min-width:600px)': {
      whiteSpace: 'nowrap',
    fontSize: '3rem',
  },
};

const useStyles = makeStyles((theme : any) => ({
  toolbar: {
    backgroundColor: '#5B8C5A',
  },
  intro: {
    margin: "20vh 0 20vh 0",
    '@media (max-width: 600px)' : {
      margin: "10vh 0 10vh 0",
    }
  },
  font: {
    color: "#222",
  },
  subFont : {
    color: "#696969",
  },
  introTitle : {
    color: "#222",
    textAlign: 'left', 
    '@media (max-width: 600px)' : {
      textAlign: 'center !important',
      marginBottom: '0px !important',
    }
  },
  introSubtitle: {
    color: "#696969",
    textAlign: 'left', 
    '@media (max-width: 600px)' : {
      fontSize: '1.2rem !important',
    }
  },
  footer: {
    backgroundColor: '#5B8C5A',
    color: '#fff',
    marginTop: '20vh'
  },
  speakersTitle: {
    marginBottom: '10vh',
    '@media (max-width: 600px)' : {
      fontSize: '2.4rem !important',
      textAlign: 'center !important',
    }
  },
  detailsInfoContainer: {
    display: 'flex', 
    margin: '10px', 
    alignItems:'flex-end',
    '@media (max-width: 600px)' : {
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'center',
    },
  },
  detailsInfoName: {
    '@media (max-width: 600px)' :{
      fontSize: '1.4rem !important',
      textAlign: 'center',
    },
  },
  detailsInfoTextContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    margin: '10px',
    '@media (max-width: 600px)' :{
      margin: '0px',
    },
  }
}));

const renderCards = (cardData :any, handleClickOpen : any) => {

  return (
    <React.Fragment>
      {cardData.map((item : any)=>(
        <Grid item key={item.title} xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}
        >
            <CardMedia
            className="card-img"
            component="img"
            sx={{ height: '240px'}}
            image={item.Headshot}
            alt={item.FullName}
            />
          <CardActions sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button size="small" onClick={()=>handleClickOpen(item.FullName)}>{item.FullName}</Button>
          </CardActions>
        </Card>
      </Grid>
      ))}
    </React.Fragment>
  )
}

const ParseDataToCardList = (result: any) => {
  
  if (result === undefined || !result.hasOwnProperty('data')){
    console.log("Err - Person query result undefined.");
    return [];
  }

  const Items = result.data.Items; 
  const cardList : any = [];

  //Iterate through DynamoDB table items.
  Items.forEach(function (item: any) {
    console.log(item.Headshot);
    const el = {
      'Headshot' : item.Headshot, 
      'FullName' : item.FullName
    };
    cardList.push(el);
  });


  return cardList;
}

//Main component
export default function Home() {

  const classes = useStyles();

  const [open, setOpen] = useState<Boolean>(false);
  const [cardList, setCardList] = useState<Array<Object>>([]);
  const [personData, setPersonData] = useState<Object>({});

  //Get initial records from DynamoDB
  useEffect(() => {
      async function fetchAllArticles() {
        const result = await axios(
          '/news-reader/all-people',
        ).catch((err)=>{
          console.log("request failed.");
        });
        const cardData = ParseDataToCardList(result);
        setCardList(cardData);
      };
      fetchAllArticles();
      },
    []
  );


  const handleClickOpen = (fullName : string) => {
    //Get person's video clip data, update personData
    getPersonData(fullName);
  };

  const getPersonData = (fullName : string) => {
    async function fetchClipsByPerson () {
      const result : any = await axios.post(
        '/news-reader/person-details', {params : {fullName}}
      ).catch((err)=>{
        console.log("request failed.");
      });
      if (result != null){
        setPersonData(result);
        setOpen(true);
      } 
    };
    fetchClipsByPerson();
  }


  const handleClose = (value : any) => {
    setOpen(false);
  };


  return (
    <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          flexGrow: 1, 
          p: 0, 
        }}
      >

      <AppBar 
      sx={{
        position: 'fixed',
        zIndex: theme.zIndex.drawer + 1,
      }}
      >
        <Toolbar className={classes.toolbar}>
          <SpeakerNotesIcon sx={{ mr: 2, fontSize: 40 }} />
          <Typography variant="h6" color="inherit" noWrap>
            HearingRoom
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Intro classes={classes}/>

      <Container sx={{ py: 0 }} maxWidth="lg">
        <Typography variant="h3" align="left" className={classes.speakersTitle}>
          Speakers
        </Typography>
        <Grid container spacing={4}>
            {renderCards(cardList, handleClickOpen)}
        </Grid>
      </Container>
      </Box>


    {/* Footer */}
    <Box sx={{ p: 6 }} className={classes.footer} component="footer">
      <Typography variant="subtitle1" align="center" component="p">
        Thanks for checking out our hackathon project!
      </Typography>
      <Copyright />
    </Box>

      {/* End footer */}
    </ThemeProvider>

    {/* Details Dialog Box */}
    <Details
        open={open}
        onClose={handleClose}
        data={personData}
        classes={classes}
    />
    </div>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © HearingRoom Hackathon Team '}
      {new Date().getFullYear()}
    </Typography>
  );
}