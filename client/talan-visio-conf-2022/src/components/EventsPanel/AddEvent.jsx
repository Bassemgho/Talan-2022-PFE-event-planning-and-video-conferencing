import React, { useState } from 'react'
import { FormControl, FormLabel, Box, Stack, Flex, Avatar, AvatarGroup, Icon, Text, Input, Button, Textarea ,Alert} from '@chakra-ui/react'
import AddIcon from '@mui/icons-material/Add';
import { AlertIcon } from '@chakra-ui/react';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import 'react-datepicker/src/stylesheets/datepicker.scss'
import DatePicker from 'react-datepicker'
import 'react-dater/dist/index.css'
import AddParticipant from './AddParticipant'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { StyledEngineProvider } from '@mui/material/styles';
import { add_event } from '../../services/admin.js';

export default function AddEvent({refreshEvents}) {
  // const mods = props.mods
  const [startDate1, setStartDate1] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [mods, setmods] = useState([])
  const [titre, setTitre] = useState('')
  const [desc, setdesc] = useState('')
  const [load, setLoad] = useState(false)
  const [alerterror, setAlertError] = useState(true)
  const [alertsuccess, setAlertSuccess] = useState(true)
  const [participants, setparticipants] = useState([])
  const token = localStorage.getItem('token')
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'titre':
        setTitre(e.target.value)
        break;
      case 'desc':
        setdesc(e.target.value)
        break;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      const data = { titre, participants, mods, dateDebut:startDate1, dateFin:startDate2, desc }
      const res = await add_event(token, data)
      switch (res.data.success) {
        case true:
          setAlertError(true)
          setAlertSuccess(false)
          break;
        case false:
          setAlertError(false)
          setAlertSuccess(true)

      }
      setLoad(false)
      refreshEvents()
    } catch (error) {
      setLoad(false)
      console.log(error.message)
    }
  }

  return (
    <Box
      borderRadius="5px"
      padding={5}
      bg="white"
      overflowY="scroll"
      overflowX="scroll"
      bgSize="200px"
      bgRepeat="repeat"
      alignContent='start'
    >


      <FormControl>
        <Stack alignItems="start" spacing={5}>

          <Text>Create a new Event</Text>
          <FormLabel htmlFor="title">Add title</FormLabel>

          <Input
            id="titre"
            border="none"
            size="sm"
            placeholder="add Title"
            width="50%"
            type="text"
            bg='white'
            onChange={handleChange}
          />
          <Flex>
            <Box>
              <Flex>
                <Icon
                  marginTop="8px"
                  marginRight="8px"
                  mar
                  as={AddModeratorIcon}
                  onChange={handleChange}

                />
                <AvatarGroup spacing={2} size="sm" max={2}>
                  {mods.map((val, ind) => {
                    return <Avatar
                      key={ind}
                      name={val}
                      src={val.src}
                    />
                  })}
                </AvatarGroup>
                <AddParticipant usrs={mods} setusrs={setmods} />
              </Flex>

            </Box>

          </Flex>
          <Flex>
            <Box>
              <Flex>
                <Icon
                  marginTop="8px"
                  marginRight="8px"
                  as={GroupsIcon}

                />
                <AvatarGroup spacing={2} size="sm" max={2}>
                  {participants.map((val, ind) => {
                    return <Avatar
                      key={ind}
                      name={val}
                      src={val.src}
                    />
                  })}
                </AvatarGroup>
                <AddParticipant usrs={participants} setusrs={setparticipants} />

              </Flex>

            </Box>

          </Flex>
          <Box verticalAlign='start' borderWidth={1} border='none' >
            <Flex>
              <Icon
                marginTop="8px"
                marginRight="8px"
                as={CalendarTodayIcon}

              />
              <FormLabel htmlFor="datedebut">Start Date</FormLabel>

              <DatePicker id='datedebut' selected={startDate1} onChange={(date) => setStartDate1(date)} />
              <Icon
                marginTop="8px"
                marginRight="8px"
                as={CalendarTodayIcon}

              />
              <FormLabel htmlFor="datefin">End Date</FormLabel>

              <DatePicker id='datefin' selected={startDate2} onChange={(date) => setStartDate2(date)} />
              {/* <StyledEngineProvider injectFirst>
                <LocalizationProvider  dateAdapter={AdapterDateFns}>
                  <StaticTimePicker the
                    displayStaticWrapperAs="mobile"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </StyledEngineProvider> */}
            </Flex>

          </Box>
          <Box verticalAlign='start' borderWidth={1} border='none' >
            <Flex>
              <Icon
                marginTop="8px"
                marginRight="8px"
                as={DescriptionIcon}

              />
              <Textarea id='desc' onChange={handleChange} placeholder='Here is a sample placeholder' />

            </Flex>

          </Box>

          <Button isLoading={load} onClick={handleSubmit} width={20} border="none" borderRadius={30} colorScheme="teal" size="sm">
            Add
          </Button>
        </Stack>
      </FormControl>
      <Alert hidden={alerterror} status='error'>
        <AlertIcon />
        There was an error processing your request
      </Alert>

      <Alert margin={2} hidden={alertsuccess} status='success'>
        <AlertIcon />
        Event Created successfulyy
      </Alert>
    </Box>

  )
}
