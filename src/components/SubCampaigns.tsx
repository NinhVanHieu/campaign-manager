import { useState } from 'react';
import { Button, TextField, Card, Checkbox } from '@mui/material';
import { Field, ErrorMessage, FieldArray, useFormikContext } from 'formik';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ADS, SubCampaigns, Values } from '../types/data';

interface Props {
    values: Values
}

const SubCampaign = ({ values }: Props) => {
    const [active, setActive] = useState<number>(0)
    const { handleChange } = useFormikContext();

    return (
        <FieldArray name="campaign.subCampaigns">
            {({ remove, push }) => (
                <>
                    <div className='overflow-x-auto max-w-full h-[120px] mb-6'>
                        <div className="flex gap-4">
                            <AddCircleIcon
                                className="w-10 h-10 cursor-pointer mt-10 bg-white "
                                onClick={() => {
                                    const nameSub = values.campaign.subCampaigns.length + 1
                                    push({
                                        name: `Chiến dịch con ${nameSub}`,
                                        status: true,
                                        ads: [{
                                            name: 'Quảng cáo 1',
                                            quantity: 0
                                        }]
                                    })
                                    setActive(values.campaign.subCampaigns.length)
                                }
                                }
                            />
                            {values.campaign.subCampaigns.map((itemSub: SubCampaigns, indexCard: number) => {
                                const totalAdv = itemSub.ads.reduce(
                                    (accumulator: number, currentValue: ADS) => accumulator + currentValue.quantity,
                                    0,
                                );

                                return (
                                    <Card style={{ width: "210px", height: "120px" }} className={indexCard == active ? "border-2 border-[#2196f3]  flex flex-col items-center pt-6 cursor-pointer" : "border-2 flex flex-col items-center pt-6 cursor-pointer"} onClick={() => setActive(indexCard)} >
                                        <div className='flex gap-2'>
                                            <p>{itemSub.name}</p>
                                            <CheckCircleIcon className="w-4 h-4 " fontSize='small' />
                                        </div>
                                        <p>{totalAdv}</p>
                                    </Card>
                                )
                            }
                            )}

                        </div>
                    </div>
                    <div>
                        {values.campaign.subCampaigns.map((itemSubCampaign: SubCampaigns, indexSub: number) => {

                            return (
                                <div key={indexSub + itemSubCampaign.name}>

                                    {/* {indexSub === active && ( */}
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex gap-10 '>
                                            <Field
                                                as={TextField}
                                                // onChange={handleChange}
                                                required
                                                label="Tên chiến dịch con"
                                                type="text"
                                                name={`campaign.subCampaigns.${indexSub}.name`}
                                                fullWidth
                                                variant="standard"
                                                margin="dense"
                                                helperText={<ErrorMessage name={`campaign.subCampaigns.${indexSub}.name`} />}
                                                defaultValue={itemSubCampaign.name}
                                            // error={props.errors.email && props.touched.email}
                                            />
                                            <Field
                                                as={Checkbox}
                                                label="Đang hoạt động"
                                                // type="checkox"
                                                name={`campaign.subCampaigns.${indexSub}.status`}
                                                defaultChecked
                                            />
                                            {/* <FormControlLabel control={<Checkbox name={`campaign.subCampaigns.${indexSub}.status`} defaultChecked />} label="Đang hoạt động" /> */}
                                        </div>
                                        <p className='font-medium text-[20px]'>DANH SÁCH QUẢNG CÁO</p>
                                        <DeleteIcon
                                            className="w-6 h-6 cursor-pointer"
                                            onClick={() => {
                                                remove(indexSub)
                                                setActive(active - 1)
                                            }}
                                        />
                                        {/* array children */}

                                        <FieldArray name={`campaign.subCampaigns[${indexSub}].ads`}>
                                            {({ remove, push }) => (
                                                <>
                                                    <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="left" style={{ width: "60px" }}> <Checkbox name={`ads_checkbox`} /></TableCell>
                                                                    <TableCell align="left">Tên quảng cáo*</TableCell>
                                                                    <TableCell align="left">Số lượng*</TableCell>
                                                                    <TableCell align="left">
                                                                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                                                                            const numberAds = values.campaign.subCampaigns[indexSub].ads.length + 1
                                                                            push({
                                                                                name: `Quảng cáo ${numberAds}`,
                                                                                quantity: 0
                                                                            })
                                                                        }

                                                                        }>
                                                                            Thêm
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {itemSubCampaign.ads.map((itemAds, indexAds) => {
                                                                    return (
                                                                        <TableRow
                                                                            key={itemAds.name + indexAds}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell align="left" style={{ width: "60px" }}> <Checkbox name={`ads.${indexAds}`} /></TableCell>
                                                                            <TableCell align="left">
                                                                                <Field
                                                                                    as={TextField}
                                                                                    required
                                                                                    type="text"
                                                                                    name={`campaign.subCampaigns[${indexSub}].ads.${indexAds}.name`}
                                                                                    fullWidth
                                                                                    variant="standard"
                                                                                    margin="dense"
                                                                                    helperText={<ErrorMessage name={`campaign.subCampaigns[${indexSub}].ads.${indexAds}.name`} />}
                                                                                    defaultValue={itemAds.name}
                                                                                // error={props.errors.email && props.touched.email}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell align="left">
                                                                                <Field
                                                                                    as={TextField}
                                                                                    required
                                                                                    type="number"
                                                                                    name={`campaign.subCampaigns[${indexSub}].ads.${indexAds}.quantity`}
                                                                                    fullWidth
                                                                                    variant="standard"
                                                                                    margin="dense"
                                                                                    helperText={<ErrorMessage name={`campaign.subCampaigns[${indexSub}].ads.${indexAds}.quantity`} />}
                                                                                    defaultValue={itemAds.quantity}
                                                                                // error={props.errors.email && props.touched.email}
                                                                                />
                                                                            </TableCell>
                                                                            <DeleteIcon
                                                                                className="w-6 h-6 cursor-pointer my-10"
                                                                                onClick={() => {
                                                                                    remove(indexAds)
                                                                                }}
                                                                            />
                                                                        </TableRow>
                                                                    )
                                                                })
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </>
                                            )}
                                        </FieldArray>

                                    </div>
                                    {/* )} */}
                                </div>
                            )
                        }
                        )}
                    </div>
                </>
            )}
        </FieldArray>
    )
}

export default SubCampaign