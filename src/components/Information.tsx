import { TextField } from "@mui/material"
import { ErrorMessage, Field } from "formik"

const Information = ({ errors }: any) => {
    return (
        <>
            <Field
                as={TextField}
                required
                error={errors?.campaign?.information?.name}
                label="Tên chiến dịch"
                type="text"
                name="campaign.information.name"
                fullWidth
                variant="standard"
                margin="dense"
                helperText={<ErrorMessage name="campaign.information.name" />}
            />
            <Field
                as={TextField}
                label="Mô tả"
                name="campaign.information.describe"
                type="text"
                fullWidth
                variant="standard"
                margin="dense"
            />
        </>
    )
}

export default Information