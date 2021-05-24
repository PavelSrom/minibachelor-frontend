import { Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export const QuestionRowSkeleton: React.FC = () => (
  <Paper className="px-2 py-4 grid grid-cols-12">
    <div className="col-span-6 px-2 flex items-center">
      <Skeleton variant="rect" width={'70%'} height={24} />
    </div>
    <div className="col-span-3 px-2 flex">
      <Skeleton variant="circle" width={32} height={32} />
      <Skeleton variant="text" className="ml-2 w-20" />
    </div>
    <div className="col-span-2 px-2">
      <Skeleton variant="text" className="w-24 h-8" />
    </div>
    <div className="col-span-1 px-2 flex justify-end items-center">
      <Skeleton variant="circle" width={24} height={24} />
    </div>
  </Paper>
)
