import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography, Button, Box } from '@mui/material';


const renderTopicClips = (topics : any) => {

  const topicArr : any = [];
  for (const [key, value] of Object.entries(topics)){
    topicArr.push({TopicName: key, clips: value});
  }

  // topicArr structure => [{TopicName: "taxes", clips [{VideoName: "name", TimestampURL: "http://..."}] }, {...}]

  return (
    <div>
      {  
        topicArr.map((topic : any)=>{
          return (
            <div>
              <Typography variant="h6" sx={{margin: '10px'}}>{topic.TopicName}</Typography>
              {topic.clips.map((clip : any)=>{
                return (
                  <Box sx={{ display: 'flex', margin: '10px', alignItems: 'center'}}> 
                    <Typography>{clip.VideoName} </Typography>
                    <Button href={clip.TimestampURL}> Watch </Button>
                  </Box>
                );
              })}
            </div>
          );
        })
      }
    </div>
  );
}

function Details(props : any) {
  const { onClose, selectedValue, open, data } = props;

  if (!data.hasOwnProperty('data')) return null;
  const personData = data.data.Items[0];
  const fullName = personData.FullName;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} scroll={'body'}>
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:'flex-start', margin: '20px'}}>
        <Box sx={{ display: 'flex', margin: '10px', alignItems:'flex-end'}}> 
          <img src={personData.Headshot} height="200px" width="200px" />
          <Typography variant="h4" sx={{margin: '0 10px 0 10px'}}>{personData.FullName}</Typography>
          <Typography>{/*personData.Info*/}</Typography>
        </Box>
        <Typography variant="h6" sx={{alignSelf: 'center'}}>Recent Discussions</Typography>
        {renderTopicClips(personData.Topics)}
      </Box>
    </Dialog>
  );
}

export default Details;