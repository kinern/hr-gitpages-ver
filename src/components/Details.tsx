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

function Details(props : any) {
  const { onClose, selectedValue, open, data } = props;
  var topicClips = data.topicClips; //Needs to be formatted

  const handleClose = () => {
    onClose(selectedValue);
  };


  //TestData

  topicClips = [
    {TopicName: 'Taxes', clips: [
      {
        VideoName: 'Meeting About Taxes',
        VideoURL: 'http://www.google.com',
        StartTime: '00:00:00',
        EndTime: '00:01:00'
      },
      {
        VideoName: 'Second Meeting About Taxes',
        VideoURL: 'http://www.google.com',
        StartTime: '00:00:00',
        EndTime: '00:01:00'
      }
    ]}, 
    {TopicName: 'Healthcare', clips: [
      {
        VideoName: 'Meeting About Healthcare',
        VideoURL: 'http://www.google.com',
        StartTime: '00:00:00',
        EndTime: '00:01:00'
      },
      {
        VideoName: 'Second Meeting About Healthcare',
        VideoURL: 'http://www.google.com',
        StartTime: '00:00:00',
        EndTime: '00:01:00'
      }
    ]}
  ];


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
      {renderTopicClips(topicClips)}
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