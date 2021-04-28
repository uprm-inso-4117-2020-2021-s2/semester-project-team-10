import {React, useState, useContext} from 'react';
import JournalCalendar from '../components/Calendar';
import {Container, CircularProgress,Paper,Grid,Box,Chip, Card, Divider, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import '../components/Calendar.css'
import JournalEntryPreview from '../components/JournalEntryPreview'
import axios from 'axios';
import { useQuery } from 'react-query';
import {AuthContext} from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import Export from '../components/Export'

function CalendarPage() {
    const [state, setState] = useContext(AuthContext);
    const [events, setEvents] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment().format("DD-MM-YYYY"))

    const getJournalEntries = async () => {
        return await axios.get(`http://localhost:8000/journal-entry-all`, {
            headers: {
                'Authorization': `Bearer ${state.access_token}`
            }
        })
    };

    const { isLoading, error, data } = useQuery('GetJournalEntries', getJournalEntries)

     if (isLoading) return (
        <Container>
            <Box my={'25%'} mx={'50%'}>
                <CircularProgress/>
            </Box>
        </Container>
    )

    if (error) return (
      <Container>
        <Box alignItems="center" justify="center">
          <h1 align= "center" bottom= {'50%'}> Sorry I couldn't find your moods <FontAwesomeIcon icon={faSadCry}/> </h1>
        </Box>
      </Container>
    )
  
    return (
      <Container>
        <Box display='flex' justifyContent='flex-end' m={1}>
          <Box m={1}>
            <Export/>
          </Box>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={6}>
          <div className="CalendarPage">
            <main className="main-calendar">
              <JournalCalendar />
            </main>
          </div>
          </Grid>
          <Grid item xs={6}>
            <JournalEntryPreview id={1} title={'So Happy...'} moods={['happy']}/>
            <JournalEntryPreview id={2} title={'Today was great'} moods={['happy', 'excited']}/>
            <JournalEntryPreview id={3} title={'Not good...'} moods={['sad', 'angry', 'frustrated']}/>
            <JournalEntryPreview id={4} title={'Its all good'} moods={['happy']}/>
          </Grid>
      </Grid>
      </Container>
    );
  }

export default CalendarPage;