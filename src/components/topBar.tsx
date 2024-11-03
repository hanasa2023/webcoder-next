import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CodeIcon from '@mui/icons-material/Code'
import ShareIcon from '@mui/icons-material/Share'

export const TopBar = () => {
  return (
    <div className="flex items-center w-full h-12 shadow bg-gray-800">
      <div className="flex items-center justify-center w-12 h-full">
        <CodeIcon color="primary" />
      </div>
      <Button startIcon={<SaveIcon />}>保存</Button>
      <Button startIcon={<ShareIcon />}>分享</Button>
    </div>
  )
}
