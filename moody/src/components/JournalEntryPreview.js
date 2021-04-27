import {Container, CircularProgress,Paper,Grid,Box,Chip, Card, Divider, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'

export default function JournalEntryPreview(props) {
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
                    <Box my="auto" m={2} display='flex' justifyContent="flex-end">
                        {moods.map(mood => <Box mx={.2}><Chip label={mood} color="secondary"/></Box>)}
                    </Box>
                </Box>
            </Card> 
        </Box>
    )
} 