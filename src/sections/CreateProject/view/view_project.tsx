import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSettingsContext } from 'src/components/settings';

import ShowLevelView from './view_level';

interface ProjectData {
  levelId: string;
  clientId: string;
  name: string;
  description: string;
  note: string;
  status: string;
  state: string;
  depth: string;
  rootActionItemId: string;
  parentActionItemId: string;
  actionItemLabel: string;
  estimatedTimeTaken: string;
  estimatedStartDate: string;
  estimatedStartTime: string;
  estimatedEndDate: string;
  estimatedEndTime: string;
  ownedBy: string;
  executedBy: string;
  managedBy: string;
  createdBy: string;
  children?: ProjectData[];
}

export default function ShowProjectView() {
  const settings = useSettingsContext();
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const email = sessionStorage.getItem('userEmail');
      if (email) {
        try {
          const response = await axios.get(`https://wiretime-api-drimossgwq-uc.a.run.app/project/get-by-createdby/${email}`);
          setProjectData(response.data);
          console.log('project data', response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);

  const handleAddClick = (levelId: string ) => {
    router.push(`${paths.dashboard.project.create}?LevelId=${levelId}`);
    console.log(`Selected levelId: ${levelId}`);
  };

  const handleExpandClick = (levelId: string) => {
    setExpandedLevels(prevExpandedLevels =>
      prevExpandedLevels.includes(levelId)
        ? prevExpandedLevels.filter(id => id !== levelId)
        : [...prevExpandedLevels, levelId]
    );
  };

  const renderList = (data: ProjectData[], level = 0) => (
    <List>
      {data.map(project => (
        <React.Fragment key={project.levelId}>
          <Card sx={{ border: '1px solid #1976d2', mb: 2, ml: level > 0 ? 2 : 0, bgcolor: '#e3f2fd' }}>
            <ListItem sx={{ borderBottom: '1px solid #bbb' }}>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label="expand"
                    onClick={() => handleExpandClick(project.levelId)}
                    sx={{ color: 'black' }} // Dark black color for expand button
                  >
                    {expandedLevels.includes(project.levelId) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" variant="h6" color="text.primary" sx={{ mr: 1 }}>
                      {project.actionItemLabel}:
                    </Typography>
                    <Typography component="span" variant="h6" color="text.primary">
                      {project.name}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  aria-label="add"
                  sx={{ color: 'black' }} // Dark black color for add button
                  onClick={() => handleAddClick(project.levelId)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </ListItem>
          </Card>
          {expandedLevels.includes(project.levelId) && (
            <Box sx={{ ml: 2 }}>
              <ShowLevelView levelId={project.levelId} />
            </Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h3" align="center" color="text.primary" gutterBottom>
          Project List
        </Typography>
      </Box>
      {renderList(projectData)}
    </Container>
  );
}
