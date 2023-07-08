import { FileUploader } from './components/FileUploader'
import { Heading } from './components/Heading'

export const App = () => (
  <div className="min-h-screen w-full bg-slate-200 min-w-[370px]">
    <Heading />
    <div className="pt-12 flex justify-center">
      <FileUploader />
    </div>
  </div>
)
