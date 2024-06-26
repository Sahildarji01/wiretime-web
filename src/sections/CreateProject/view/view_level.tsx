import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

interface ProjectData {
  levelId: string;
  clientId: string;
  name: string;
  description: string;
  note: string;
  status: string;
  state: string;
  depth: number;
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

interface ShowLevelViewProps {
  levelId: string;
}

const ShowLevelView: React.FC<ShowLevelViewProps> = ({ levelId }) => {
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ProjectData[]>(`https://wiretime-api-drimossgwq-uc.a.run.app/project/get-by-levelId/${id}`);
      const { data } = response;
      setProjectData(prevData => {
        const updateData = (items: ProjectData[]): ProjectData[] =>
          items.map(item => {
            if (item.levelId === id) {
              return { ...item, children: response.data };
            }
            if (item.children) {
              return { ...item, children: updateData(item.children) };
            }
            return item;
          });
        return id === levelId ? data : updateData(prevData);
      });
      setIsEmpty(data.length === 0);
      console.log('project data', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [levelId]);

  useEffect(() => {
    if (levelId) {
      fetchData(levelId);
    }
  }, [levelId, fetchData]);

  const handleAddClick = (clickedLevelId: string) => {
    router.push(`${paths.dashboard.project.create}?LevelId=${clickedLevelId}`);
    console.log(`Selected levelId: ${clickedLevelId}`);
  };

  const handleExpandClick = (clickedLevelId: string) => {
    setExpandedLevels(prevExpandedLevels =>
      prevExpandedLevels.includes(clickedLevelId)
        ? prevExpandedLevels.filter(id => id !== clickedLevelId)
        : [...prevExpandedLevels, clickedLevelId]
    );

    if (!expandedLevels.includes(clickedLevelId)) {
      fetchData(clickedLevelId);
    }
  };

  const getCardColor = (depth: number): string => {
    switch (depth) {
      case 1:
        return '#E0FBE2';
      case 2:
        return '#F1EAFF';
      case 3:
        return '#F8E8EE'; 
      case 4:
        return '#E3F4F4'; 
      case 5:
        return '#FFF6F6'; 
      case 6:
        return '#EFFFFD'; 
      case 7:
        return '#FFEEEE'; 
      case 8:
        return '#FAF8F1'; 
      default:
        return '#ECF9FF'; 
    }
  };

  const getBorderColor = (depth: number): string => {
    switch (depth) {
      case 1:
        return '#B3C9B4';
      case 2:
        return '#C0BBCC';
      case 3:
        return '#C6B9BE'; 
      case 4:
        return '#B5C3C3'; 
      case 5:
        return '#CCC4C4'; 
      case 6:
        return '#BFBFCC'; 
      case 7:
        return '#CCBEBE'; 
      case 8:
        return '#C8C6C0'; 
      default:
        return '#BCC7CC'; 
    }
  };
  
  const renderList = (data: ProjectData[], level = 0) => (
    <List>
      {data.map(project => (
        <React.Fragment key={project.levelId}>
          <Card
            sx={{
              mb: 3,
              ml: level * 3,
              backgroundColor: getCardColor(project.depth),
              border: '3px solid',
              borderColor: getBorderColor(project.depth),
            }}
          >
            <ListItem>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label="expand"
                    onClick={() => handleExpandClick(project.levelId)}
                    sx={{ color: 'black' }}
                  >
                    {expandedLevels.includes(project.levelId) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  <Typography component="span" variant="h6" color="black">
                    {project.actionItemLabel}: {project.name}
                  </Typography>
                </Box>
                <IconButton
                  aria-label="add"
                  onClick={() => handleAddClick(project.levelId)}
                  sx={{ color: 'black' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </ListItem>
          </Card>
          {expandedLevels.includes(project.levelId) && project.children ? (
            renderList(project.children, level + 1)
          ) : null}
        </React.Fragment>
      ))}
      {!isLoading && data.length === 0 && isEmpty && (
        <Typography sx={{ ml: level * 2 }} component="span" variant="h6" color="text.primary">
          No Data Available
        </Typography>
      )}
    </List>
  );

  return (
    <Box sx={{ p: 2 }}>
      {renderList(projectData)}
    </Box>
  );
};

export default ShowLevelView;
