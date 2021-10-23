import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import {Theme, makeStyles} from '@mui/styles';
import Details from './Details';
import axios from 'axios';

import NavBar from './NavBar';



const theme = createTheme();

const renderCards = (cardData :any, handleClickOpen : any) => {

  return (
    <React.Fragment>
      {cardData.map((item : any)=>(
        <Grid item key={item.title} xs={12} sm={12} md={12}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'row' }}
        >
          <Box sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography>
                {item.topics.join(", ")}
              </Typography>
              <Typography>
                {item.url}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClickOpen}>Details</Button>
            </CardActions>
          </Box>
          <CardMedia
            className="card-img"
            component="img"
            sx={{width:'180px', height: '240px'}}
            image={item.imageUrl}
            alt="random"
          />
        </Card>
      </Grid>
      ))}
    </React.Fragment>
  )
}

const ParseDataToCardList = (result: any) => {
  console.log(result);
  const cardList : Array<Object> = [
    {
      'imageUrl' : 'https://source.unsplash.com/random',
      'title' : 'House Rules Committee Meeting on Debt Limit Suspension and Other Legislation',
      'topics' : ["debt ceiling", "senate amendment", "rules committee report"],
      'url': 'https://www.c-span.org/video/?515287-1/house-rules-committee-meeting-debt-limit-suspension-legislation'
    },
    {
      'imageUrl' : 'https://source.unsplash.com/random',
      'title' : 'House Rules Committee Meeting on Debt Limit Suspension and Other Legislation',
      'topics' : ["debt ceiling", "senate amendment", "rules committee report"],
      'url': 'https://www.c-span.org/video/?515287-1/house-rules-committee-meeting-debt-limit-suspension-legislation'
    },
    {
      'imageUrl' : 'https://source.unsplash.com/random',
      'title' : 'House Rules Committee Meeting on Debt Limit Suspension and Other Legislation',
      'topics' : ["debt ceiling", "senate amendment", "rules committee report"],
      'url': 'https://www.c-span.org/video/?515287-1/house-rules-committee-meeting-debt-limit-suspension-legislation'
    },
    {
      'imageUrl' : 'https://source.unsplash.com/random',
      'title' : 'House Rules Committee Meeting on Debt Limit Suspension and Other Legislation',
      'topics' : ["debt ceiling", "senate amendment", "rules committee report"],
      'url': 'https://www.c-span.org/video/?515287-1/house-rules-committee-meeting-debt-limit-suspension-legislation'
    },
  ];

  /*
  result.data.forEach(function (item: any) {
    const el = {
      'imageUrl' : 'https://source.unsplash.com/random', 
      'title': item.name,
      'description' : 'This is a media card. You can use this section to describe the content.',
    };
    cardList.push(el);
  });
  */

  return cardList;
}

/*
const useStyles = makeStyles((theme: Theme)=>({ 
  container : { 
      backgroundColor: theme.palette.background.paper, 
      padding : theme.spacing(8,0,6)
      }
  }
));
*/

export default function Home() {

  //const classes = useStyles(); 

  const [open, setOpen] = useState<Boolean>(false);
  const [cardList, setCardList] = useState<Array<Object>>([]);


  //Note: Immediately Invoked Function Expression
  useEffect(() => {
      async function fetchAllArticles() {
        const result = await axios(
          'http://localhost:5000/news-reader/all', //Change to correct server request
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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value : any) => {
    setOpen(false);
  };

  return (
    <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar 
      sx={{
        position: 'fixed',
        zIndex: theme.zIndex.drawer + 1,
      }}
      >
        <Toolbar>
          <StickyNote2Icon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            News Reader
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Navigation Bar */}
      <NavBar />


        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            flexGrow: 1,
            p: 3
          }}
        >
          <Toolbar />
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              News Reader
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              News Reader combines Symbl.ai and ML to create and store compact 
              summaries from news audio clips.
              The following are examples using clips from C-Span.
            </Typography>
          </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
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
    <Details
        open={open}
        onClose={handleClose}
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