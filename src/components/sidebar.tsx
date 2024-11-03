'use client'
import {
  alpha,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  styled,
  Typography,
} from '@mui/material'
import React from 'react'
import FolderIcon from '@mui/icons-material/Folder'
import ExtensionIcon from '@mui/icons-material/Extension'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  RichTreeView,
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2DragAndDropOverlay,
  TreeItem2Icon,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Provider,
  TreeItem2Root,
  treeItemClasses,
  TreeViewBaseItem,
  useTreeItem2,
  UseTreeItem2Parameters,
} from '@mui/x-tree-view'
import { TransitionProps } from '@mui/material/transitions'
import clsx from 'clsx'
import ArticleIcon from '@mui/icons-material/Article'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import FolderRounded from '@mui/icons-material/FolderRounded'
import ImageIcon from '@mui/icons-material/Image'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import { animated, useSpring } from '@react-spring/web'

type FileType =
  | 'image'
  | 'pdf'
  | 'doc'
  | 'video'
  | 'folder'
  | 'pinned'
  | 'trash'

type ExtendedTreeItemProps = {
  fileType?: FileType
  id: string
  label: string
}

const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      {
        id: '1.1',
        label: 'Company',
        children: [
          { id: '1.1.1', label: 'Invoice', fileType: 'pdf' },
          { id: '1.1.2', label: 'Meeting notes', fileType: 'doc' },
          { id: '1.1.3', label: 'Tasks list', fileType: 'doc' },
          { id: '1.1.4', label: 'Equipment', fileType: 'pdf' },
          { id: '1.1.5', label: 'Video conference', fileType: 'video' },
        ],
      },
      { id: '1.2', label: 'Personal', fileType: 'folder' },
      { id: '1.3', label: 'Group photo', fileType: 'image' },
    ],
  },
  {
    id: '2',
    label: 'Bookmarked',
    fileType: 'pinned',
    children: [
      { id: '2.1', label: 'Learning materials', fileType: 'folder' },
      { id: '2.2', label: 'News', fileType: 'folder' },
      { id: '2.3', label: 'Forums', fileType: 'folder' },
      { id: '2.4', label: 'Travel documents', fileType: 'pdf' },
    ],
  },
  { id: '3', label: 'History', fileType: 'folder' },
  { id: '4', label: 'Trash', fileType: 'trash' },
]

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: '70%',
        bgcolor: 'warning.main',
        display: 'inline-block',
        verticalAlign: 'middle',
        zIndex: 1,
        mx: 1,
      }}
    />
  )
}
declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.grey[400],
  position: 'relative',
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
})) as unknown as typeof TreeItem2Root

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: 'row-reverse',
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`&.Mui-expanded `]: {
    '&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon':
      {
        color: theme.palette.primary.dark,
        ...theme.applyStyles('light', {
          color: theme.palette.primary.main,
        }),
      },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '16px',
      top: '44px',
      height: 'calc(100% - 48px)',
      width: '1.5px',
      backgroundColor: theme.palette.grey[700],
      ...theme.applyStyles('light', {
        backgroundColor: theme.palette.grey[300],
      }),
    },
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: 'white',
    ...theme.applyStyles('light', {
      color: theme.palette.primary.main,
    }),
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    ...theme.applyStyles('light', {
      backgroundColor: theme.palette.primary.main,
    }),
  },
}))

const AnimatedCollapse = animated(Collapse)

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  })

  return <AnimatedCollapse style={style} {...props} />
}

const StyledTreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontFamily: 'General Sans',
  fontWeight: 500,
}) as unknown as typeof Typography

interface CustomLabelProps {
  children: React.ReactNode
  icon?: React.ElementType
  expandable?: boolean
}

function CustomLabel({
  icon: Icon,
  expandable,
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {Icon && (
        <Box
          className="labelIcon"
          color="inherit"
          component={Icon}
          sx={{ mr: 1, fontSize: '1.2rem' }}
        />
      )}

      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItem2Label>
  )
}

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable)
  }

  return Boolean(reactChildren)
}

const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case 'image':
      return ImageIcon
    case 'pdf':
      return PictureAsPdfIcon
    case 'doc':
      return ArticleIcon
    case 'video':
      return VideoCameraBackIcon
    case 'folder':
      return FolderRounded
    case 'pinned':
      return FolderOpenIcon
    case 'trash':
      return DeleteIcon
    default:
      return ArticleIcon
  }
}

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref })

  const item = publicAPI.getItem(itemId)
  const expandable = isExpandable(children)
  let icon

  if (expandable) {
    icon = FolderRounded
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType)
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              'Mui-expanded': status.expanded,
              'Mui-selected': status.selected,
              'Mui-focused': status.focused,
              'Mui-disabled': status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              icon,
              expandable: expandable && status.expanded,
            })}
          />
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  )
})

export const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleListItemClick = (event: React.SyntheticEvent, index: number) => {
    setSelectedIndex(index)
  }

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <RichTreeView
            defaultExpandedItems={['1', '1.1']}
            defaultSelectedItems="1.1"
            items={ITEMS}
            slots={{ item: CustomTreeItem }}
            sx={{
              height: 'fit-content',
              flexGrow: 1,
              maxWidth: 400,
              overflowY: 'auto',
            }}
          />
        )
      case 1:
        return <div>Extension</div>
      case 2:
        return <div>Settings</div>
      default:
        return <></>
    }
  }

  return (
    <>
      <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700">
        <List dense aria-label="sidebar" className="w-14">
          <ListItemButton
            aria-label="file"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon className="py-2">
              <FolderIcon color="secondary" />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            aria-label="extension"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon className="py-2">
              <ExtensionIcon color="secondary" />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            aria-label="settings"
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon className="py-2">
              <SettingsIcon color="secondary" />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </div>
      <div className="flex max-w-xs w-64 bg-gray-800 h-full">
        {renderContent()}
      </div>
    </>
  )
}
