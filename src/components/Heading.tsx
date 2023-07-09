import GithubImage from '../images/Github.svg'

export const Heading = () => {
  return (
    <div className="w-full fixed top-0 left-0 h-12 bg-violet-300 flex items-center px-8 md:px-10 xl:px-12 justify-between">
      <h1 class="text-xl font-bold text-violet-950 tracking-wide">OxiZipWeb</h1>
      <a href="https://github.com/karolstawowski/OxiZipWeb" target="_blank">
        <img src={GithubImage} width={28} alt="github repository" />
      </a>
    </div>
  )
}
