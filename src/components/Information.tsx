import { TextField } from "@mui/material"
import { ErrorMessage, Field } from "formik"

const Information = () => {
    return (
        <>
            <Field
                as={TextField}
                required
                error
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
                type="text"
                name="campaign.information.describe"
                fullWidth
                variant="standard"
                margin="dense"
                helperText={<ErrorMessage name="campaign.information.describe" />}
            // error={props.errors.email && props.touched.email}
            />
        </>
    )
}

export default Information