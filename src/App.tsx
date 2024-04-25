import { useState } from 'react';
import * as yup from 'yup';
import { Stack, Typography, Tab, Tabs, Button, TextField, Card, FormControlLabel, Checkbox, FormControl, FormHelperText, CardContent } from '@mui/material';
import { Formik, Form } from 'formik';

import Information from './components/Information';
import SubCampaign from './components/SubCampaigns';
import { TabPanelProps, Values } from './types/data';

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Stack>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  console.count()
  const [value, setValue] = useState<number>(0)


  const validationSchema = yup.object({
    campaign: yup.object({
      information: yup.object({
        name: yup
          .string()
          .required('Dữ liệu không hợp lệ')
      }),
      subCampaigns: yup.array().of(
        yup.object().shape({
          name: yup.string().required("Dữ liệu không hợp lệ"),
          ads: yup.array().of(
            yup.object().shape({
              name: yup.string().required("Dữ liệu không hợp lệ"),
              quantity: yup.number().required("Dữ liệu không hợp lệ")
            }),
          )
        }),
      )
    })
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const initialValue = {
    campaign: {
      information: {
        name: '',
        describe: ''
      },
      subCampaigns: [{
        name: 'Chiến dịch con 1',
        status: true,
        ads: [{
          name: 'Quảng cáo 1',
          quantity: 0
        }]
      }]
    }
  }

  const handleSubmit = (values: Values, props: any) => {
    console.log(`( values )===============>`, values);
    // alert(JSON.stringify(values, null, 2));
  }

  return (
    <div className='mx-10 mt-10'>
      <Formik
        initialValues={initialValue}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => {
          console.log(`( errors )===============>`, errors);
          return (
            <div>
              <Form>
                <div className='text-end '>
                  <Button color="primary" variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
                <Stack sx={{ width: '100%', typography: 'body1' }}>
                  <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Thông tin" {...a11yProps(0)} />
                      <Tab label="Chiến dịch con" {...a11yProps(1)} />
                    </Tabs>
                  </Stack>
                  <CustomTabPanel value={value} index={0}>
                    <Information />
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={1}>
                    <SubCampaign values={values} />
                  </CustomTabPanel>
                </Stack>
              </Form>
            </div>
          );
        }}
      </Formik >

      {/* // </form> */}
    </div >
  );
}