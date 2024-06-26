import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';

type TaskStatusButtonsProps = {
  aiId: string;
};

export default function TaskStatusButtons({ aiId }: TaskStatusButtonsProps) {
  const [status, setStatus] = useState('NOT_STARTED');

  useEffect(() => {
    const storedStatus = localStorage.getItem(`state_${aiId}`);
    if (storedStatus) {
      setStatus(storedStatus);
    }
  }, [aiId]);

  const updateTaskStatusAndSave = async (state: string, taskStatus: string) => {
    try {
      const url = `https://wiretime-api-drimossgwq-uc.a.run.app/current-ai/update-state/${aiId}?aiState=${state}&Status=${taskStatus}`;
      await axios.patch(url);
      setStatus(state);
      localStorage.setItem(`state_${aiId}`, state);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleStart = () => updateTaskStatusAndSave('Running', 'In Progress');
  const handlePause = () => updateTaskStatusAndSave('PAUSED', 'Waiting');
  const handleResume = () => updateTaskStatusAndSave('Running', 'In Progress');
  const handleDone = () => updateTaskStatusAndSave('END', 'END');

  switch (status) {
    case 'NOT_STARTED':
      return (
        <Box sx={{display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleStart}
            startIcon={<PlayArrowIcon />}
            sx={{ backgroundColor: '#33BDB9' }}
          >
            Start
          </Button>
        </Box>
      );

    case 'Running':
      return (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={handlePause}
            startIcon={<PauseIcon />}
          >
            Pause
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleDone}
            startIcon={<DoneIcon />}
          >
            Done
          </Button>
        </Box>
      );

    case 'PAUSED':
      return (
        <Box sx={{ display: 'flex',gap:2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResume}
            startIcon={<StopCircleIcon />}
          >
            Resume
          </Button>
        </Box>
      );

    case 'END':
      return <span style={{ color: 'green' }}>Task is Done</span>;

    default:
      return null;
  }
}

