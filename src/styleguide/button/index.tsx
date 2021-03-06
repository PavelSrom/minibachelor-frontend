import clsx from 'clsx'
import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

type ThemeProps = {
  color?: 'primary' | 'secondary'
}

const useStyles = makeStyles<Theme, ThemeProps>(theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    color: ({ color }) => (color ? theme.palette[color].main : 'inherit'),
  },
}))

type Props = Omit<ButtonProps, 'color'> & {
  color?: 'primary' | 'secondary'
  loading?: boolean
  component?: React.ElementType
  to?: string
}

export const Button: React.FC<Props> = ({
  color,
  variant = 'contained',
  loading = false,
  className,
  children,
  ...rest
}) => {
  const classes = useStyles({ color })

  return (
    <MuiButton
      color={color}
      variant={variant}
      disabled={loading}
      className={clsx({
        'text-white': variant === 'contained',
        [className!]: !!className,
      })}
      {...rest}
    >
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
      {children}
    </MuiButton>
  )
}
