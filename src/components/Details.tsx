import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Typography, Link, Box } from '@mui/material';


const renderTopicClips = (topicClips : any) => {
  return (
    <div>
      {  
        topicClips.map((topic : any)=>{
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
  const topicArray : Array<any> = [];
  personData.forEach((item: any)=>{
    if (topicArray[item.TopicName] == null){
      topicArray[item.TopicName] = {TopicName: item.TopicName, clips: []};
    } 
    topicArray[item.TopicName].clips.push(item);
  });
  return topicArray;
}


function Details(props : any) {
  const { onClose, selectedValue, open, data } = props;
  const topicArray = (data.hasOwnProperty('data'))? getTopicArrFromData(data.data) : [];

  const handleClose = () => {
    onClose(selectedValue);
  };

  console.log(topicArray);

  return (
    <Dialog onClose={handleClose} open={open} scroll={'body'}>
      <Box sx={{ display: 'flex', margin: '10px' }}> 
        <img src='/images/unsplash-senate-building.jpg' height="200px" width="200px" />
        <Box> 
          <Typography variant="h4">John Smith</Typography>
          <Typography>Basic Information on John Smith</Typography>
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