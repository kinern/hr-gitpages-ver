import React, {useState} from 'react';
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
import Details from './Details';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © NewsReader Hackathon Team '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const cardData = [
  {
    'imageUrl' : 'https://source.unsplash.com/random',
    'title' : 'Heading',
    'description' : 'This is a media card. You can use this section to describe the content.',
  },
  {
    'imageUrl' : 'https://source.unsplash.com/random',
    'title' : 'Heading',
    'description' : 'This is a media card. You can use this section to describe the content.',
  },
  {
    'imageUrl' : 'https://source.unsplash.com/random',
    'title' : 'Heading',
    'description' : 'This is a media card. You can use this section to describe the content.',
  },
  {
    'imageUrl' : 'https://source.unsplash.com/random',
    'title' : 'Heading',
    'description' : 'This is a media card. You can use this section to describe the content.',
  },
];

const renderCards = (handleClickOpen : any) => {
  return (
    <React.Fragment>
      {cardData.map((item)=>(
                      <Grid item key={item.title} xs={12} sm={12} md={12}>
                      <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardMedia
                          component="img"
                          height="120"
                          image={item.imageUrl}
                          alt="random"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <Typography>
                            {item.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={handleClickOpen}>Details</Button>
                        </CardActions>
                      </Card>
                    </Grid>
      ))}
    </React.Fragment>
  )
}


export default function Home() {

  const [open, setOpen] = useState<Boolean>(false);

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
      <AppBar position="relative">
        <Toolbar>
          <StickyNote2Icon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            News Reader
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
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
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              {renderCards(handleClickOpen)}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
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