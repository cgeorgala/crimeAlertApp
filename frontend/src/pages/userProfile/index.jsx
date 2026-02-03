import { useForm } from "react-hook-form"
import { FormInput } from "../../components/formInput"
import { Box, Button, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/auth"
import {
  EDIT_USER_FORM_FIELDS,
  EDIT_USER_FIELD_NAMES,
  EDIT_USER_TEXT,
} from "./constants"
import { useModifyUserInfoMutation } from "../../store/api"

export const UserProfilePage = () => {
  const userData = useSelector(selectUser)
  const [modifyUser ] = useModifyUserInfoMutation()

  const { control, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      [EDIT_USER_FIELD_NAMES.NAME]: userData[[EDIT_USER_FIELD_NAMES.NAME]],
      [EDIT_USER_FIELD_NAMES.SURNAME]:
        userData[[EDIT_USER_FIELD_NAMES.SURNAME]],
      [EDIT_USER_FIELD_NAMES.ADDRESS]:
        userData[[EDIT_USER_FIELD_NAMES.ADDRESS]],
      [EDIT_USER_FIELD_NAMES.ZIPCODE]:
        userData[[EDIT_USER_FIELD_NAMES.ZIPCODE]],
      [EDIT_USER_FIELD_NAMES.AREA]:userData[[EDIT_USER_FIELD_NAMES.AREA]],
      [EDIT_USER_FIELD_NAMES.EMAIL]: userData[[EDIT_USER_FIELD_NAMES.EMAIL]],
    },
  })

  const onSubmit = data => {
    modifyUser(data)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {EDIT_USER_FORM_FIELDS.map(formField => (
            <Grid size={{ md: 4 }} key={formField.name}>
              <FormInput
                control={control}
                label={formField.label}
                name={formField.name}
                rules={
                  formField.name === EDIT_USER_FORM_FIELDS.EMAIL
                  ?{
                    required: 'Email Υποχρεωτικό',
                    pattern:{
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Μη έγκυρη μορφή email',
                    },
                  }
                  :formField.name === EDIT_USER_FORM_FIELDS.ZIPCODE
                  ?{
                    required: 'Τ.Κ. Υποχρεωτικός',
                    pattern:{
                      value: /^[0-9]{5}$/,
                      message: 'Ο Τ.Κ. πρέπει να αποτελείται από 5 ψηφία',
                    },
                  }
                  :{
                    required: `Πεδίο ${formField.label} Υποχρεωτικό`
                  }}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          {EDIT_USER_TEXT.SUBMIT_BUTTON_LABEL}
        </Button>
      </form>
    </Box>
  )
}
