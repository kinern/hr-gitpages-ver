import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import {makeStyles} from '@mui/styles';

import StickyNote2Icon from '@mui/icons-material/StickyNote2';

import Details from './Details';
import axios from 'axios';

import NavBar from './NavBar';

const theme = createTheme();

const drawerWidth = 240;

const useStyles = makeStyles((theme : any) => ({
  toolbar: {
    backgroundColor: '#5B8C5A',
  },
  intro: {
    margin: "20vh 0 20vh 0",
  },
  font: {
    color: "#222",
  },
  subFont : {
    color: "#696969",
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
          <Box sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <CardContent>
              <CardMedia
              className="card-img"
              component="img"
              sx={{width:'180px', height: '240px'}}
              image={item.imageUrl}
              alt="random"
              />
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Button size="small" onClick={()=>handleClickOpen(item.FullName)}>{item.FullName}</Button>
            </CardActions>
          </Box>
        </Card>
      </Grid>
      ))}
    </React.Fragment>
  )
}

const ParseDataToCardList = (result: any) => {

  /*
  //Test data
  var cardList : Array<Object> = [
    {
      'imageUrl' : '/images/unsplash-senate-building.jpg',
      'FullName' : 'John Smith',
    },
    {
      'imageUrl' : '/images/unsplash-senate-building.jpg',
      'FullName' : 'Joe Perry',
      
    }
  ];
  */
  
  if (result === undefined || !result.hasOwnProperty('data')){
    console.log("Err - Person query result undefined.");
    return [];
  }

  const Items = result.data.Items; 
  const cardList : any = [];

  //Iterate through DynamoDB table items.
  Items.forEach(function (item: any) {
    const el = {
      'imageUrl' : '/images/unsplash-senate-building.jpg', 
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
          '/news-reader/people',
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
        '/news-reader/clips', {params : {fullName}}
      ).catch((err)=>{
        console.log("request failed.");
      });
      if (result != null){
        setPersonData(result);
      } else {
        const data = {};
        setPersonData(data);
      }
      setOpen(true);
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

      {/* Side Navigation Bar */}
      {/*<NavBar />*/}

      {/* Hero unit */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          flexGrow: 1, 
          p: 0, 
          //width: { sm: `calc(100% + ${drawerWidth}px)`}
        }}
      >

      <AppBar 
      sx={{
        position: 'fixed',
        zIndex: theme.zIndex.drawer + 1,
      }}
      >
        <Toolbar className={classes.toolbar}>
          <StickyNote2Icon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            News Reader
          </Typography>
        </Toolbar>
      </AppBar>

        <Toolbar />

       
      <Container className={classes.intro} maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          className={classes.font}
          gutterBottom
        >
          News Reader
        </Typography>
        <Typography variant="h5" align="center" className={classes.subFont} paragraph>
          News Reader combines Symbl.ai and ML to create and store compact 
          summaries from news audio clips.
          The following are examples using clips from C-Span.
        </Typography>
      </Container>
      


      <Container sx={{ py: 6 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
            {renderCards(cardList, handleClickOpen)}
        </Grid>
      </Container>
    
      </Box>

    {/* Footer */}
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
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
    />
    </div>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © NewsReader Hackathon Team '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}