import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Typography, Link, Box } from '@mui/material';


const renderTopicClips = (topicClips : any) => {
  console.log(topicClips);
  return (
    <div>
      {  
        topicClips.map((topic : any)=>{
          console.log("here");
          console.log(topic);
          return (
            <div>
              <Typography variant="h6">{topic.TopicName}</Typography>
              {topic.clips.map((clip : any)=>{
                return (
                  <Box sx={{ display: 'flex', margin: '10px' }}> 
                    <Typography>{clip.VideoName}</Typography>
                    <Typography>{clip.StartTime} - {clip.EndTime}</Typography>
                    <Link href={clip.VideoURL}> Watch </Link>
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
      <Box sx={{ display: 'flex', margin: '10px' }}> 
        <img src='/images/unsplash-senate-building.jpg' height="200px" width="200px" />
        <Box> 
          <Typography variant="h4">{fullName}</Typography>
        </Box>
      </Box>
      <Typography variant="h6">Recent Discussions</Typography>
      {renderTopicClips(topicArray)}
    </Dialog>
  );
}

/*
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
*/

export default Details;