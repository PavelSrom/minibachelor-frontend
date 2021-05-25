import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

export const OnlyDesktop: React.FC = () => (
  <Dialog open disableEscapeKeyDown>
    <DialogTitle>Small device detected</DialogTitle>
    <DialogContent>
      Please use your laptop or desktop for optimal experience
    </DialogContent>
  </Dialog>
)
