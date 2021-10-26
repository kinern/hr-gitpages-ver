import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography, Button, Box } from '@mui/material';


const renderTopicClips = (topicClips : any) => {
  return (
    <div>
      {  
        topicClips.map((topic : any)=>{
          return (
            <div>
              <Typography variant="h6" sx={{margin: '10px'}}>{topic.TopicName}</Typography>
              {topic.clips.map((clip : any)=>{
                return (
                  <Box sx={{ display: 'flex', margin: '10px', alignItems: 'center'}}> 
                    <Typography>{clip.VideoName} {clip.StartTime} - {clip.EndTime} </Typography>
                    <Button href={clip.VideoURL}> Watch </Button>
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

const getTopicArrFromData = (personData: any) => {
  const topicObj : any = {};
  personData.forEach((item: any)=>{
    if (!topicObj.hasOwnProperty(item.TopicName)){
      topicObj[item.TopicName] = {TopicName: item.TopicName, clips: []};
    } 
    topicObj[item.TopicName].clips.push(item);
  });
  let topicArray = Object.keys(topicObj).map((k) => topicObj[k])
  return topicArray;
}


function Details(props : any) {
  const { onClose, selectedValue, open, data } = props;
  const topicArray = (data.hasOwnProperty('data'))? getTopicArrFromData(data.data) : [];

  //TODO : get fullname from person record
  const fullName = (data.hasOwnProperty('data'))? topicArray[0].clips[0].PersonFullName : "";

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} scroll={'body'}>
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:'flex-start', margin: '20px'}}>
        <Box sx={{ display: 'flex', margin: '10px', alignItems:'flex-end'}}> 
          <img src='/images/unsplash-senate-building.jpg' height="200px" width="200px" />
          <Typography variant="h4" sx={{margin: '0 10px 0 10px'}}>{fullName}</Typography>
        </Box>
        <Typography variant="h6" sx={{alignSelf: 'center'}}>Recent Discussions</Typography>
        {renderTopicClips(topicArray)}
      </Box>
    </Dialog>
  );
}

export default Details;