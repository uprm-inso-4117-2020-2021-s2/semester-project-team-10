import {React, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import {AuthContext} from '../components/AuthContext';
import {Container, CircularProgress,Paper,Grid,Box,Chip, Card, Divider, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)      
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: theme.spacing(.5),
  },
  moodArea: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "100%",
  },
}));

function JournalEntryPreview(props) {
    const {id, date, moods} = props;

    return (
        <Box p={1} component={Link} to={`/journalEntry/${id}`}>
            <Card>
                <Box display="flex" flexDirection="row" p={1}>
                    <Box p={1}>
                        <Typography variant="h4" gutterBottom>
                                {date}
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem/>
                    <Box my="auto" m={2} display='flex'>
                        {moods.map(mood => <Box mx={.2}><Chip label={mood} color="secondary"/></Box>)}
                    </Box>
                </Box>
            </Card> 
        </Box>
    )
}

export default function JournalEntryInfo() {
    const {id} = useParams();
    const [state, setState] = useContext(AuthContext);
    const classes = useStyles();

    const getJournalEntry = async () => {
        return await axios.get(`http://localhost:8000/journalEntry/${id}`, {
            headers: {
                'Authorization': `Bearer ${state.access_token}`
            }
        })
    };

    const { isLoading, error, data } = useQuery('GetJournalEntryInfo', getJournalEntry)

    const dummyJournalEntry = {
        date: '12-04-2021',
        moods: ['happy', 'sad', 'angry', 'flustered'],
        content: 'Testing journal entry.....',
        id: 1,
        user_id: 1,
    }

    if (isLoading) return (
        <Container>
            <Box my={'25%'} mx={'50%'}>
                <CircularProgress/>
            </Box>
        </Container>
    )

    return (
        <Container>
            <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.paper}>
                        <Typography variant="h2" gutterBottom>
                            April 5th 2021
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} justify="center">
                    <Box className={classes.moodArea} >
                        {dummyJournalEntry.moods.map(mood => <Chip label={mood} className={classes.chip} color="secondary"/>)}
                    </Box>
                </Grid>
            </Grid> 
            <Divider variant="middle"/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box className={classes.paper}>
                        <Typography variant="body1" gutterBottom>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        </Typography> 
                    </Box>
                </Grid>
            </Grid>
            </Card>
        </Container>
    )
}
