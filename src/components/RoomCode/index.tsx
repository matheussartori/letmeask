import copyImg from '../../assets/images/copy.svg'

import { Container } from './styles'

type RoomCodeProps = {
  code: string
}

export function RoomCode({ code }: RoomCodeProps): JSX.Element {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }

  return (
    <Container onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Room #{code}</span>
    </Container>
  )
}
