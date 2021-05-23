import { useParams } from 'react-router-dom'

export const UserDetail: React.FC = () => {
  const params = useParams<{ id: string }>()

  return (
    <div>
      <p>UserDetail {params.id}</p>
    </div>
  )
}
