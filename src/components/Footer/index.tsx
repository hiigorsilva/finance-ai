export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="flex justify-center items-center gap-8 py-6 border-t border-solid">
      <p className="flex items-center gap-1 text-sm text-zinc-400">
        <span>Finance AI - {currentYear} ©</span>
        <span>Todos os direitos reservados</span>
      </p>
    </footer>
  )
}
