export const FileOff = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-off"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 3l18 18"></path>
      <path d="M7 3h7l5 5v7m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14"></path>
    </svg>
  )
}
