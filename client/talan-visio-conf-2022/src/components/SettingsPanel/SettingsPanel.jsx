import React from 'react'
import { FormControl,Input,Stack,Box ,FormLabel, TagLabelProps,Text,Accordion,AccordionItem,AccordionButton,AccordionPanel} from '@chakra-ui/react'
// import FileBase64 from 'file-base64'
import ChangePasswordPanel from './ChangePasswordPanel'
export default function SettingsPanel() {
  const settingitems=[{titre:"Change password",}]
  return (
    <>
    <Accordion bg='white'>
      {settingitems.map((item,index) => { 
        return (<AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                {item.titre}
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <ChangePasswordPanel />
          </AccordionPanel>
        </AccordionItem>)
       })}
    </Accordion>
    </>
    
  )
}
