import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

export const TopBar = () => {
  return (
    <div className="flex w-full h-12 shadow">
      <Button startIcon={<SaveIcon />}>Save</Button>
      <Button>Test</Button>
    </div>
  )
}
