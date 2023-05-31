import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Layout from '~/components/layout/Layout'
import { Divider, List, ListItem, ListItemText } from '@mui/material'

export default function Index(): JSX.Element {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper'
  }
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item sx={{ background: '#1976d2', color: '#fff', fontWeight: 600 }}>KHOA TỔ CHỨC</Item>
          <Item sx={{ color: '3D8AFE' }}>
            <List sx={style} component='nav' aria-label='mailbox folders'>
              <ListItem button>
                <ListItemText primary='Inbox' />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary='Drafts' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='Trash' />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary='Spam' />
              </ListItem>
            </List>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Layout>
  )
}
