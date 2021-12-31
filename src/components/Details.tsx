import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography, Button, Box, List, ListItem, Avatar } from '@mui/material';



const renderTopicClips = (topics : any, classes : any) => {

  const topicArr : any = [];
  for (const [key, value] of Object.entries(topics)){
    topicArr.push(value);
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
              <Typography variant="h6" sx={{margin: '10px'}}>{capitalize(topic.topic)}</Typography>
                <Box sx={{ display: 'flex', margin: '10px', alignItems: 'center'}}> 
                  <Typography sx={detailsVideoNameStyles}>{topic.video_name} @ {toTimestring(topic.start_time)}</Typography>
                  <Button href={topic.timestamped_url} variant="outlined"> Watch</Button>
                </Box>
            </div>
          );
        })
      }
    </div>
  );

  

}

const toTimestring = (timeInt : any) => {
  var sec_num : any = timeInt / 1000; // don't forget the second param
  var hours : any  = Math.floor(sec_num / 3600);
  var minutes : any = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds : any = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var t = hours+':'+minutes+':'+seconds;
  t = t.substr(0, t.lastIndexOf("."));
  return t;
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
          <Typography sx={{marginRight: '10px'}}><strong>{capitalize(item.title)}</strong></Typography>
          <Typography>{item.value}</Typography>
        </ListItem>
        );
      })}
    </List>
  );

}

function Details(props : any) {
  const { onClose, selectedValue, open, data, classes } = props;

  console.log(data);

  if (Object.keys(data).length === 0) return null;
  const personData = data;
  const fullName = personData.name;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} scroll={'body'}>
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:'flex-start', margin: '20px'}}>
        <Box className={classes.detailsInfoContainer}> 
          
          <Avatar 
          alt={fullName}
          src={`/images/people/${personData.id}/${personData.headshot}`}
          sx={{ height: 200, width: 200 }}
          variant="rounded"
          />

          <Box className={classes.detailsInfoTextContainer}>
            <Typography variant="h4" className={classes.detailsInfoName}>{personData.name}</Typography>
            {renderInfo(personData.info)}
          </Box>
          
        </Box>
        <Typography variant="h5" sx={{alignSelf: 'center', marginTop: '20px'}}>Recent Discussions</Typography>
        { renderTopicClips(personData.topics, classes) }
      </Box>
    </Dialog>
  );
}

export default Details;