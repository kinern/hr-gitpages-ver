import React from 'react';
import {Container, Box, Typography} from '@mui/material';

const Intro = (props : any) => {
    const { classes } = props;

    return (
        <Container className={classes.intro} maxWidth="lg">
        <Box sx={{maxWidth: '600px'}} >
            <Typography variant="h3" className={classes.introTitle} gutterBottom>
            See clips from public speakers,
            </Typography>
            <Typography variant="h3" className={classes.introTitle} gutterBottom>
            with <strong>topics you care about.</strong>
            </Typography>
            <div style={{marginTop: '45px'}}>
            <Typography variant="h6" className={classes.introSubtitle} paragraph>
            HearingRoom combines Symbl.ai and Machine Learning to create a catalogue of speaking points from videos of public figures.
            </Typography>
            <Typography variant="h6" className={classes.introSubtitle} paragraph>
            Each person has a list of topics and links to time-stamped videos that go directly to where they spoke.
            </Typography>
            </div>
        </Box>
      </Container>
    );

};

export default Intro;