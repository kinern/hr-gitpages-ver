import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography, Button, Box, List, ListItem, Avatar } from '@mui/material';



const renderTopicClips = (topics : any, classes : any) => {

  const topicArr : any = [];
  for (const [key, value] of Object.entries(topics)){
    topicArr.push({TopicName: key, clips: value});
  }

  // topicArr structure => [{TopicName: "taxes", clips [{VideoName: "name", TimestampURL: "http://..."}] }, {...}]

  const detailsVideoNameStyles = {
    marginRight: '20px',
    '@media (max-width: 600px)' :{
      fontSize: '0.8em !important', 
    }
  };
  
  return (
    <div>
      {  
        topicArr.map((topic : any)=>{
          return (
            <div>
              <Typography variant="h6" sx={{margin: '10px'}}>{capitalize(topic.TopicName)}</Typography>
              {topic.clips.map((clip : any)=>{
                return (
                  <Box sx={{ display: 'flex', margin: '10px', alignItems: 'center'}}> 
                    <Typography sx={detailsVideoNameStyles}>{clip.VideoName}</Typography>
                    <Button href={clip.TimestampURL} variant="outlined"> Watch </Button>
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

const capitalize = (s : string) =>
{
    return s && s[0].toUpperCase() + s.slice(1);
}

const renderInfo = (infoObj : any) =>{
  const infoArr : any = [];
  for (const [key, value] of Object.entries(infoObj)){
    infoArr.push({title: key, value: value});
  }
  return (
    <List sx={{margin: '0px'}}>
      {infoArr.map((item: any)=>{
        return(
        <ListItem key={item.title} sx={{display: 'flex', flexDirection: 'row', margin: '0px', padding: '0px'}}>
          <Typography sx={{marginRight: '10px'}}><strong>{item.title}</strong></Typography>
          <Typography>{item.value}</Typography>
        </ListItem>
        );
      })}
    </List>
  );

}

function Details(props : any) {
  const { onClose, selectedValue, open, data, classes } = props;

  if (!data.hasOwnProperty('data')) return null;
  const personData = data.data.Items[0];
  const fullName = personData.FullName;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} scroll={'body'}>
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:'flex-start', margin: '20px'}}>
        <Box className={classes.detailsInfoContainer}> 
          
          <Avatar 
          alt={fullName}
          src={personData.Headshot}
          sx={{ width: 200, height: 200 }}
          variant="rounded"
          />

          <Box className={classes.detailsInfoTextContainer}>
            <Typography variant="h4" className={classes.detailsInfoName}>{personData.FullName}</Typography>
            {renderInfo(personData.Info)}
          </Box>
        </Box>
        <Typography variant="h5" sx={{alignSelf: 'center', marginTop: '20px'}}>Recent Discussions</Typography>
        {renderTopicClips(personData.Topics, classes)}
      </Box>
    </Dialog>
  );
}

export default Details;