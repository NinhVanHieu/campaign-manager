import { useState } from 'react';
import {
    Button,
    TextField,
    Card,
    Checkbox,
    IconButton,
    FormControlLabel,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table
} from '@mui/material';
import { Field, ErrorMessage, FieldArray } from 'formik';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ADS, SubCampaigns, Values } from '../types/data';

interface Props {
    values: Values,
    errors: any
}

const SubCampaign = ({ values, errors }: Props) => {
    const [active, setActive] = useState<number>(0)

    const [totalCheck, setTotalCheck] = useState<number[]>([])

    return (
        <FieldArray name="campaign.subCampaigns">
            {({ remove, push }) => (
                <>
                    <div className='overflow-x-auto max-w-full h-[120px] mb-6'>
                        <div className="flex gap-4">
                            <IconButton aria-label="add"
                                className="w-10 h-10 cursor-pointer mt-1 "
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
                                }}
                                style={{ backgroundColor: "#ededed" }}
                            >
                                <AddIcon style={{ color: "#ff0000" }} />
                            </IconButton>

                            {values.campaign.subCampaigns.map((itemSub: SubCampaigns, indexCard: number) => {
                                const totalAdv = itemSub.ads.reduce(
                                    (accumulator: number, currentValue: ADS) => accumulator + currentValue.quantity,
                                    0,
                                );

                                return (
                                    <Card style={{ width: "210px", height: "120px" }} className={indexCard == active ? "border-2 border-[#2196f3]  flex flex-col items-center pt-6 cursor-pointer" : "border-2 flex flex-col items-center pt-6 cursor-pointer"} onClick={() => setActive(indexCard)} >
                                        <div className='flex gap-2'>
                                            <p>{itemSub.name}</p>
                                            <CheckCircleIcon fontSize='small'
                                                style={{ color: "#2c641f", backgroundColor: "#fff", width: "16px" }}
                                            />
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

                                    {indexSub === active && (
                                        <div className='flex flex-col gap-6'>
                                            <div className='flex gap-10 '>
                                                <Field
                                                    as={TextField}
                                                    error={errors?.campaign?.subCampaigns && errors?.campaign?.subCampaigns[indexSub]?.name}
                                                    label="Tên chiến dịch con"
                                                    type="text"
                                                    name={`campaign.subCampaigns[${indexSub}].name`}
                                                    fullWidth
                                                    variant="standard"
                                                    margin="dense"
                                                    helperText={<ErrorMessage name={`campaign.subCampaigns[${indexSub}].name`} />}
                                                />
                                                <Field
                                                    type="checkbox"
                                                    name={`campaign.subCampaigns[${indexSub}].status`}
                                                    as={FormControlLabel}
                                                    control={<Checkbox name={`campaign.subCampaigns[${indexSub}].status`} />}
                                                    checked={values.campaign.subCampaigns[indexSub].status}
                                                    label="Đang hoạt động"
                                                    className='w-[300px]'
                                                />

                                            </div>
                                            <p className='font-medium text-[20px]'>DANH SÁCH QUẢNG CÁO</p>

                                            {/* array children */}

                                            <FieldArray name={`campaign.subCampaigns[${indexSub}].ads`}>
                                                {({ remove, push }) => {

                                                    const handleCheckboxTotal = (e: any) => {
                                                        let total = []

                                                        for (let index = 0; index < itemSubCampaign.ads.length; index++) {
                                                            total.push(index)
                                                        }
                                                        if (e.target.checked) {
                                                            setTotalCheck(total)
                                                        } else {
                                                            setTotalCheck([])
                                                        }
                                                    }

                                                    return (
                                                        <>
                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell align="left" style={{ width: "60px" }}>
                                                                                <Checkbox name={`ads_checkbox`} onClick={(e) => handleCheckboxTotal(e)}
                                                                                    checked={totalCheck.length === itemSubCampaign.ads.length ? true : false}
                                                                                />
                                                                            </TableCell>
                                                                            {totalCheck.length == itemSubCampaign.ads.length ? (<>

                                                                                <TableCell align="left">
                                                                                    <IconButton aria-label="delete"
                                                                                        onClick={() => {
                                                                                            const convertData = totalCheck.sort((a, b) => b - a)
                                                                                            convertData.forEach(element => {
                                                                                                remove(element)
                                                                                            });
                                                                                            setTotalCheck([])
                                                                                        }}
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </IconButton>

                                                                                </TableCell>
                                                                                <TableCell align="left"></TableCell>
                                                                            </>) : (<>
                                                                                <TableCell align="left">Tên quảng cáo*</TableCell>
                                                                                <TableCell align="left">Số lượng*</TableCell>
                                                                            </>)}

                                                                            <TableCell align="left" style={{ textAlign: "center" }}>
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
                                                                            const handleCheckbox = (e: any, indexAds: number) => {
                                                                                if (e.target.checked) {
                                                                                    setTotalCheck([...totalCheck, indexAds])
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    if (totalCheck.findIndex((item) => item === indexAds) !== -1) {
                                                                                        setTotalCheck([...totalCheck.filter((item) => item !== indexAds)])
                                                                                    }
                                                                                }

                                                                            }
                                                                            return (
                                                                                <TableRow
                                                                                    key={itemAds.name + indexAds}
                                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                >
                                                                                    <TableCell align="left" style={{ width: "60px" }}>
                                                                                        <Checkbox name={`campaign.subCampaigns[${indexSub}].ads[${indexAds}].checkbox`} onClick={(e) => handleCheckbox(e, indexAds)}
                                                                                            checked={totalCheck.includes(indexAds)}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell align="left">
                                                                                        <Field
                                                                                            as={TextField}
                                                                                            required
                                                                                            type="text"
                                                                                            name={`campaign.subCampaigns[${indexSub}].ads[${indexAds}].name`}
                                                                                            fullWidth
                                                                                            variant="standard"
                                                                                            margin="dense"
                                                                                            error={errors?.campaign?.subCampaigns && errors?.campaign?.subCampaigns[indexSub] && errors?.campaign?.subCampaigns[indexSub]?.ads && errors?.campaign?.subCampaigns[indexSub]?.ads[indexAds]?.name}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell align="left">
                                                                                        <Field
                                                                                            as={TextField}
                                                                                            required
                                                                                            error={errors?.campaign?.subCampaigns && errors?.campaign?.subCampaigns[indexSub] && errors?.campaign?.subCampaigns[indexSub]?.ads && errors?.campaign?.subCampaigns[indexSub]?.ads[indexAds]?.quantity}
                                                                                            type="number"
                                                                                            name={`campaign.subCampaigns[${indexSub}].ads.[${indexAds}].quantity`}
                                                                                            fullWidth
                                                                                            variant="standard"
                                                                                            margin="dense"
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell style={{ textAlign: "end" }} >
                                                                                        <IconButton aria-label="delete"
                                                                                            className="w-6 h-6 cursor-pointer"
                                                                                            style={{ pointerEvents: totalCheck.length == itemSubCampaign.ads.length ? "none" : "auto", marginTop: "30px" }}
                                                                                            onClick={() => {
                                                                                                remove(indexAds)
                                                                                            }}
                                                                                        >
                                                                                            <DeleteIcon />
                                                                                        </IconButton>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        })
                                                                        }
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer >
                                                        </>

                                                    )
                                                }


                                                }
                                            </FieldArray>

                                        </div>
                                    )
                                    }
                                </div>
                            )
                        }
                        )}
                    </div>
                </>
            )
            }
        </FieldArray >
    )
}

export default SubCampaign